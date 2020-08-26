<template lang="pug">
.q-p-x-lg
  //- Display errors prominantly
  p(v-if='err.webmidi.enable')
    strong.text-negative Error starting webmidi:&nbsp;
    span {{err.webmidi.enable}}
  div(v-else)
    p(v-if='!Object.keys(devices.inputs).length && !Object.keys(devices.outputs).length')
      strong.text-negative No MIDI Devices found

  .row.q-col-gutter-md
    //- Input
    .col-12.col-sm-6(v-if='Object.keys(devices.inputs).length')
      q-list(bordered padding)
        q-item-label(header) MIDI Inputs

        q-item(v-for='input in devices.inputs' clickable v-ripple :key='input.id')
          q-item-section(avatar top)
            q-avatar(icon='fas fa-sliders-h' color='primary' text-color='white')

          q-item-section
            q-item-label(lines=1) {{input.name}}
            q-item-label(caption)
              strong Last message:
              span &nbsp;

          q-item-section(side)
            q-badge(color='grey') &nbsp;
    
    //- Outputs
    .col-12.col-sm-6(v-if='Object.keys(devices.inputs).length')
      q-list(bordered padding)
        q-item-label(header) MIDI Outputs

        q-item(v-for='input in devices.inputs' clickable v-ripple :key='input.id')
          q-item-section(avatar top)
            q-avatar(icon='fas fa-sliders-h' color='primary' text-color='white')

          q-item-section
            q-item-label(lines=1) {{input.name}}
            q-item-label(caption)
              strong Last message:
              span &nbsp;            

          q-item-section(side)
            q-badge(color='grey') &nbsp;
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'PageIndex',

  computed: mapState([
    'devices'
  ]),

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
      const inputs = {}
      const outputs = {}
      
      this.err.webmidi.enable = err

      // Map array to object using device.id
      this.$webmidi.inputs.forEach(input => {
        inputs[input.id] = input
      })
      this.$webmidi.outputs.forEach(output => {
        outputs[output.id] = output
      })
      
      this.$store.commit('set', ['devices', {
        inputs,
        outputs
      }])
    })
  }
}
</script>