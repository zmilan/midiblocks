<template lang="pug">
div(style='min-height: inherit')
  .blockly-wrap(ref='blockly')
  xml(ref='toolbox' style='display: none')
    slot
</template>

<script>
import Blockly from 'blockly'
import {mapState} from 'vuex'
import STRING_WebmidiInterpreter from '!!raw-loader!!../lib/webmidi-interpreter/index.js'

export default {
  name: 'Blockly',
  props: ['options'],

  watch: {
    'workspace.code' (newVal) {
      this.$store.commit('set', ['workspace.interpreter', new window.Interpreter(STRING_WebmidiInterpreter + ';\n' + this.workspace.code, this.setupInterpreter)])
      this.workspace.interpreter.run()
    }
  },

  computed: {
    ...mapState(['workspace'])
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
    // Map slot to toolbox if not provided
    let options = this.$props.options || {}
    if (!options.toolbox) {
      options.toolbox = this.$refs.toolbox
    }

    // Create workspace and add bindings
    this.blockly = Blockly.inject(this.$refs.blockly, options)
    this.blockly.addChangeListener(this.onChange)
  },

  methods: {
    /**
     * Called when something happens from within Blockly
     * @see https://developers.google.com/blockly/guides/configure/web/events
     */
    onChange (ev) {
      switch (ev.type) {
        case Blockly.Events.BLOCK_CREATE:
        case Blockly.Events.BLOCK_DELETE:
        case Blockly.Events.BLOCK_CHANGE:
        case Blockly.Events.BLOCK_MOVE:
        case Blockly.Events.VAR_CREATE:
        case Blockly.Events.VAR_DELETE:
        case Blockly.Events.VAR_RENAME:
          this.$store.commit('set', ['workspace.code', Blockly.JavaScript.workspaceToCode(this.blockly)])
        break;
      }
    },

    /**
     * Sets up the interpreter
     */
    setupInterpreter (acorn, globalObject) {
      /**
       * Console.log
       */
      acorn.setProperty(globalObject, 'log', acorn.createNativeFunction(function (dataStr) {
        console.log('📦', ...JSON.parse(dataStr))
      }))
    }
  }
}
</script>