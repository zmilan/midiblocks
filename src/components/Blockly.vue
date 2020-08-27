<template lang="pug">
div(style='min-height: inherit')
  .blockly-wrap(ref='blockly')
  xml(ref='toolbox' style='display: none')
    slot
</template>

<script>
import Blockly from 'blockly'

export default {
  name: 'Blockly',
  props: ['options'],

  data () {
    return {
      worspace: null
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
    this.workspace = Blockly.inject(this.$refs.blockly, options)
    this.workspace.addChangeListener(this.onChange)
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
          this.$store.commit('set', ['workspace.code', Blockly.JavaScript.workspaceToCode(this.workspace)])
        break;
      }
    }
  }
}
</script>