<template lang="pug">
.flex.min-height-inherit
  .min-height-inherit.position-relative.workspace-toolbox(v-if='!inline' style='flex: 0 0 auto')
    //- Quasar Toolbox
    q-list.q-pa-sm
      template(v-for='category in toolbox')
        q-separator(v-if='category.tag === "sep"')
        q-item(v-else clickable :style='"color:" + category.colour' @click='showToolboxFlyout(category)')
          q-item-section(avatar)
            q-icon(:style='"color:" + category.colour' :name='category.icon')
          q-item-section.gt-sm
            q-item-label(:style='"color:" + category.colour') {{category.name}}
  .min-height-inherit.position-relative(@click='closeToolboxFLyout')
    .blockly(style='min-height: inherit' :class='{"blockly-inline": inline}')
      //- Blockly
      .blockly-wrap(ref='blockly')
      //- Toolbox
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
      blockly: null,
      interpreter: null,
      isFlyoutOpen: false
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
      }
    })

    // Create workspace and add bindings
    this.blockly = Blockly.inject(this.$refs.blockly, options)
    this.blockly.addChangeListener(this.onChange)

    // Add blocks
    this.addBlocks()
  },

  methods: {
    /**
     * Called when something happens from within Blockly
     * @see https://developers.google.com/blockly/guides/configure/web/events
     */
    onChange (ev) {
      this.$emit('change', ev)
    },

    /**
     * Open the flyout based on the clicked item
     */
    showToolboxFlyout (category) {
      let nodes = []

      // Show flyout
      if (category.custom) {
        this.blockly.getFlyout().show(category.custom)        
      } else {
        category.children.forEach(block => {
          nodes.push(document.querySelector(`block[type="${block.type}"]`))
        })
        this.blockly.getFlyout().show(nodes)
      }

      this.isFlyoutOpen = true
    },

    /**
     * Closes the toolbox
     */
    closeToolboxFLyout () {
      if (this.isFlyoutOpen) {
        this.blockly.getFlyout().hide()
        this.isFlyoutOpen = false
      }
    },

    /**
     * Execute code
     */
    run () {
      const code = Blockly.JavaScript.workspaceToCode(this.blockly)
      this.interpreter = new Interpreter(STRING_WebmidiInterpreter + '\n' + code, this.setupInterpreter)
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
        Blockly.Blocks[block.title] = {
          init: function () {
            this.jsonInit(JSON.parse(block.block_definition))
          }
        }
        Blockly.JavaScript[block.title] = () => ''

        // Inject into workspace
        const theBlock = this.blockly.newBlock(block.title)
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

  @media (max-width: 1023px)
    .q-item__section--avatar
      padding-right: 0
      min-width: 0
</style>