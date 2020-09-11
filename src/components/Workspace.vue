<template lang="pug">
.blockly(style='min-height: inherit')
  .blockly-wrap(ref='blockly')
  xml(ref='toolbox' style='display: none')
    slot
</template>

<script>
import Blockly from 'blockly'
import {mapState} from 'vuex'
import STRING_WebmidiInterpreter from '!!raw-loader!!../assets/js/webmidi-interpreter.js'
import webmidi from 'webmidi'
import {defaults} from 'lodash'

/**
 * @emits onChange
 */
export default {
  name: 'Blockly',
  props: ['options', 'blocks'],

  watch: {
    'workspace.code' (newVal) {
      this.$store.commit('set', ['workspace.interpreter', new window.Interpreter(STRING_WebmidiInterpreter + '\n' + this.workspace.code, this.setupInterpreter)])
      this.workspace.interpreter.run()
    }
  },

  computed: {
    ...mapState(['workspace', 'devices'])
  },

  data () {
    return {
      blockly: null,
      interpreter: null
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