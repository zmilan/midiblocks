<template lang="pug">
div.q-p-x-lg
  p Welcome to MIDIBlocks 🎹 {{version}}

  //- Display errors prominantly
  p(v-if='err.webmidi.enable')
    strong.text-negative Error starting webmidi:&nbsp;
    span {{err.webmidi.enable}}

  //- Logs
  pre.log(v-html='log')
</template>

<script>
export default {
  name: 'PageIndex',

  data () {
    return {
      err: {
        webmidi: {
          enable: false
        }
      },
      
      log: '',
      version: this.$version
    }
  },

  /**
   * Initialize WebMidi
   */
  mounted () {
    this.$webmidi.enable((err) => {
      this.err.webmidi.enable = err

      console.log(this.$webmidi.inputs)
      console.log(this.$webmidi.outputs)
    })
  }
}
</script>