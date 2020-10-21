<template lang="pug">
.flex.min-height-inherit(v-touch:start='onTouch' v-touch:end='onTouch')
  .min-height-inherit.position-relative.workspace-toolbox(
    ref='quasarToolbox'
    :class='{blocklyToolboxDelete: !!blockBeingDragged}'
    v-if='!inline' style='flex: 0 0 auto'
    @mouseleave='isMouseInQuasarToolbox = false'
    @mouseenter='isMouseInQuasarToolbox = true')

    //- Quasar Toolbox
    .q-pa-sm.flex.column
      q-list(dense)
        template(v-for='category in toolbox')
          q-separator(v-if='category.tag === "sep"')
          q-item(v-else clickable :style='"color:" + category.colour' @click='toggleToolboxFlyout(category, $event)' :active='isFlyoutOpen && isFlyoutOpen === category.name')
            q-item-section(avatar)
              q-icon(:style='"color:" + category.colour' :name='category.icon')
            q-item-section.gt-sm
              q-item-label(:style='"color:" + category.colour') {{category.name}}
      slot(name='extraControls')
      q-list(dense style='flex: 0 0 auto')
        slot

  .min-height-inherit.position-relative(@click='closeToolboxFLyout')
    .blockly(style='min-height: inherit' :class='{"blockly-inline": inline}')
      //- Blockly
      .blockly-wrap(ref='blockly')
      //- Hidden Blockly Toolbox
      xml(ref='toolbox' style='display: none')
        template(v-for='category in toolbox')
          component(:is='category.tag' :name='category.name' :colour='category.colour' :custom='category.custom')
            template(v-for='block in category.children')
              component(:is='block.tag' :type='block.type' :colour='block.colour')
                template(v-for='blockProp in block.children')
                  component(:is='blockProp.tag' :id='blockProp.id' :op='blockProp.op' :at='blockProp.at' :items='blockProp.items' :statement='blockProp.statement' :mode='blockProp.mode' :at1='blockProp.at1' :at2='blockProp.at2' :divisor_input='blockProp.divisor_input' :name='blockProp.name' :colour='blockProp.colour') {{blockProp.value}}
                    template(v-for='blockShadow in blockProp.children')
                      component(:is='blockShadow.tag' :type='blockShadow.type' :name='blockShadow.name') {{blockShadow.value}}
                        template(v-for='blockShadowProp in blockShadow.children')
                          component(:is='blockShadowProp.tag' :name='blockShadowProp.name') {{blockShadowProp.value}}
</template>

<script>
import Blockly from 'blockly'
import {mapState} from 'vuex'
import STRING_WebmidiInterpreter from '!!raw-loader!!../assets/js/webmidi-interpreter.js'
import webmidi from 'webmidi'
import {defaults} from 'lodash'
import Interpreter from 'js-interpreter'
import midiblocksTheme from '../assets/toolboxes/theme'
import * as Babel from '@babel/standalone'

/**
 * @emits onChange
 */
export default {
  name: 'Blockly',
  props: ['options', 'toolbox', 'blocks', 'inline'],

  computed: {
    ...mapState(['devices'])
  },

  data () {
    return {
      // Workspace
      blockly: null,
      interpreter: null,
      isFlyoutOpen: false,
      blockBeingDragged: false,

      // Handsfree data
      handsfree: {
        // The BlocklyDragger object
        // @see https://developers.google.com/blockly/reference/js/Blockly.BlockDragger#startBlockDrag
        dragger: null,
        
        // Used for calculating drag deltas
        orig: {
          x: 0,
          y: 0
        }
      },

      // Useful for re-showing a category toolbox (eg, after creating a variable)
      lastClickedCategory: null,
      isMouseInQuasarToolbox: false,
      // Whether the toolbox was touched via pointer event (vs clicked via mouse event)
      wasToolboxTouched: false
    }
  },

  /**
   * Initialize Blockly and setup event listeners
   */
  mounted () {
    let options = this.$props.options || {}
    options = defaults(this.$props.options, {
      renderer: 'zelos',
      sounds: false,
      toolbox: this.$refs.toolbox,
      media: 'media/',
      zoom: {
        controls: true,
        pinch: true,
        wheel: true,
        startScale: 0.8
      },
      grid: {
        spacing: 50,
        length: 50,
        colour: '#9effff',
        snap: true
      },
      theme: midiblocksTheme
    })

    // Create workspace and add bindings
    this.blockly = Blockly.inject(this.$refs.blockly, options)
    this.blockly.addChangeListener(this.onChange)
    this.$root.$on('blockly.prompt.submit', this.onPromptSubmit)

    // Add blocks
    this.addBlocks()

    // Handsfree
    document.addEventListener('handsfree-blockly-click', this.onBlocklyHandsfreeClick)
    document.addEventListener('handsfree-data', this.onHandsfree)
  },

  beforeDestroy () {
    this.$root.$off('blockly.prompt.submit', this.onPromptSubmit)
    document.removeEventListener('handsfree-blockly-click', this.onBlocklyHandsfreeClick)
    document.removeEventListener('handsfree-data', this.onHandsfree)
  },

  methods: {
    /**
     * Called when something happens from within Blockly
     * @see https://developers.google.com/blockly/guides/configure/web/events
     * 
     * - Deletes block if released inside quasar toolbox
     */
    onChange (ev) {
      this.$emit('change', ev)

      // Store the block
      if (ev.element === 'dragStart') {
        this.blockBeingDragged = ev
      } else if (ev.element === 'dragStop') {
        // Delete the block when dragging into toolbox with mouse event...
        if (!this.wasToolboxTouched && this.isMouseInQuasarToolbox) {
          this.blockly.getBlockById(ev.blockId).dispose()
        // ...or with touch/pointer event)
        } else if (this.wasToolboxTouched) {
          const block = this.blockly.getBlockById(ev.blockId)
          const x = block.svgGroup_.children[0].getBoundingClientRect().x 
          const toolbox = this.$refs.quasarToolbox.getBoundingClientRect()

          if (x < toolbox.x + toolbox.width) {
            block.dispose()
          }
        }

        this.blockBeingDragged = false
        this.wasToolboxTouched = false
      }
    },

    /**
     * Sets a flag to help with deleting blocks on mobile
     */
    onTouch (ev) {
      if (ev.type === 'touchstart') {
        this.wasToolboxTouched = true
      }
    },

    /**
     * Handle clicking on elements handsfree
     */
    onBlocklyHandsfreeClick (ev) {
      if (this.handsfree.dragger) return
      
      const $block = this.blockly.getBlockById(ev.detail.$closestBlockly.getAttribute('data-id'))
      this.handsfree.dragger = new Blockly.BlockDragger($block, this.blockly)
      this.handsfree.dragger.startBlockDrag({
        x: 0,
        y: 0
      })
      this.handsfree.orig = {
        x: this.$handsfree.weboji.data.pointer.x,
        y: this.$handsfree.weboji.data.pointer.y
      }
    },

    /**
     * Update drag if dragging
     */
    onHandsfree (data) {
      if (this.handsfree.dragger) {
        this.handsfree.dragger.dragBlock(data, {
          x: this.$handsfree.weboji.data.pointer.x - this.handsfree.orig.x,
          y: this.$handsfree.weboji.data.pointer.y - this.handsfree.orig.y
        })
        console.log('onHandsfree', data)
      }
    },

    /**
     * Open the flyout based on the clicked item
     */
    toggleToolboxFlyout (category, ev) {
      // Hide flyout
      if (this.isFlyoutOpen === category.name) {
        this.blockly.getFlyout().hide()
        this.isFlyoutOpen = null
        this.lastClickedCategory = null
        return
      }

      // Show flyout
      let nodes = []
      if (category.custom) {
        this.blockly.getFlyout().show(category.custom)        
      } else {
        category.children.forEach(block => {
          nodes.push(document.querySelector(`block[type="${block.type}"]`))
        })
        this.blockly.getFlyout().show(nodes)
      }

      this.isFlyoutOpen = category.name
      this.lastClickedCategory = ev.target
    },

    /**
     * Opens the last opened toolbox (good for showing a newly created variable)
     */
    onPromptSubmit (prompt) {
      this.lastClickedCategory && this.lastClickedCategory.click()
    },

    /**
     * Closes the toolbox
     */
    closeToolboxFLyout (ev) {
      // "prevent default" on flyout click so that it doesn't hide but the event still bubbles up
      let clickedInToolbox = ev.path.some($el => {
        return $el.classList && $el.classList.contains('blocklyFlyoutBackground')
      })

      if (this.isFlyoutOpen && !clickedInToolbox) {
        this.blockly.getFlyout().hide()
        this.isFlyoutOpen = false
      }
    },

    /**
     * Execute code
     */
    run () {
      const code = Blockly.JavaScript.workspaceToCode(this.blockly)
      this.interpreter = new Interpreter(
        Babel.transform(STRING_WebmidiInterpreter + '\n' + code, {
          presets: ['env'],
          sourceType: 'script'
        }).code, this.setupInterpreter)
      this.interpreter.run()
    },

    /**
     * Sets up the interpreter
     * @todo Move this into a module
     */
    setupInterpreter (acorn, globalObject) {
      /**
       * Console.log
       */
      acorn.setProperty(globalObject, 'log', acorn.createNativeFunction((dataStr) => {
        console.log('📦 log: ', ...JSON.parse(dataStr))
      }))

      /**
       * Play a midi sound
       */
      acorn.setProperty(globalObject, '_playNote', acorn.createNativeFunction((dataStr) => {
        let data = JSON.parse(dataStr)
        
        if (data.device === 'all') {
          Object.keys(this.devices.outputs).forEach(key => {
            const output = webmidi.getOutputById(key)
            output.playNote(data.note, data.channel)
          })
        }
      }))
    },

    /**
     * Adds blocks to the workspace
     */
    addBlocks () {
      this.blocks.forEach(block => {
        Blockly.Blocks[block.name] = {
          init: function () {
            this.jsonInit(block.json)
          }
        }
        Blockly.JavaScript[block.name] = () => ''

        // Inject into workspace
        const theBlock = this.blockly.newBlock(block.name)
        theBlock.initSvg()
        theBlock.render()

        // Center the block
        this.blockly.centerOnBlock(theBlock.id)
        this.blockly.scroll(this.blockly.scrollX, this.blockly.scrollY)
      })
    }
  }
}
</script>

<style lang="sass">
@import '../css/quasar.variables.sass'

.workspace-toolbox
  background: $dark

  .q-item--active .q-focus-helper
    background: currentColor
    opacity: .25

  @media (max-width: 1023px)
    .q-item__section--avatar
      padding-right: 0
      min-width: 0
</style>