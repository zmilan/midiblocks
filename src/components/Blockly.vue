<template>
  <div style="min-height: inherit">
    <div class="blockly-wrap" ref="blockly"></div>
    <xml ref="toolbox" style="display: none">
      <slot></slot>
    </xml>
  </div>
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

  mounted () {
    let options = this.$props.options || {}

    if (!options.toolbox) {
      options.toolbox = this.$refs.toolbox
    }

    this.workspace = Blockly.inject(this.$refs.blockly, options)
  }
}
</script>