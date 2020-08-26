<template lang="pug">
.q-p-x-lg
  //- Display errors prominantly
  p(v-if='err.webmidi.enable')
    strong.text-negative Error starting webmidi:&nbsp;
    span {{err.webmidi.enable}}
  div(v-else)
    p(v-if='!$webmidi.inputs.length && !$webmidi.outputs.length')
      strong.text-negative No MIDI Devices found

  .row.q-col-gutter-md
    //- Input
    .col-12.col-sm-6(v-if='$webmidi.inputs.length')
      q-list(bordered padding)
        q-item-label(header) MIDI Inputs

        q-item(v-for='input in $webmidi.inputs' clickable v-ripple :key='input.id')
          q-item-section(avatar top)
            q-avatar(icon='fas fa-sliders-h' color='primary' text-color='white')

          q-item-section
            q-item-label(lines=1) {{input.name}}
            q-item-label(caption) {{input.manufacturer}}
    
    //- Outputs
    .col-12.col-sm-6(v-if='$webmidi.inputs.length')
      q-list(bordered padding)
        q-item-label(header) MIDI Outputs

        q-item(v-for='input in $webmidi.inputs' clickable v-ripple :key='input.id')
          q-item-section(avatar top)
            q-avatar(icon='fas fa-sliders-h' color='primary' text-color='white')

          q-item-section
            q-item-label(lines=1) {{input.name}}
            q-item-label(caption) {{input.manufacturer}}
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