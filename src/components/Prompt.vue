<template lang="pug">
//- Blockly Prompt
q-dialog(v-model='prompt.visible')
  q-card
    q-card-section
      h3 {{prompt.message}}
      q-input(ref='promptValue' v-model='prompt.value' v-on:keyup.enter='submitPrompt')
    q-card-actions(align='right')
      q-btn(color='white' flat @click='prompt.visible = false') Cancel
      q-space
      q-btn(color='secondary' @click='submitPrompt') Done
</template>

<script>
import Blockly from 'blockly'

export default {
  name: 'Prompt',
  
  data () {
    return {
      prompt: {
        visible: false,
        message: '',
        value: null,
        callback: null
      }
    }
  },
  
  mounted () {
    Blockly.prompt = this.onBlocklyPrompt
  },

  methods: {
    /**
     * Show and focus prompt
     */
    onBlocklyPrompt (message, defaultValue, callback) {
      this.prompt.visible = true
      this.prompt.message = message
      this.prompt.value = defaultValue
      this.prompt.callback = callback

      this.$nextTick(() => {
        this.$refs.promptValue.focus()
      })
    },

    /**
     * Close the modal
     * @emits blockly.prompt.submit {String: The submitted prompt}
     */
    submitPrompt () {
      if (this.prompt.callback) {
        this.prompt.callback(this.prompt.value)
        this.$root.$emit('blockly.prompt.submit', this.prompt.value)
      }
      this.prompt.visible = false
    }
  }
}
</script>