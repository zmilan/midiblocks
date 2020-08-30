<template lang="pug">
.q-p-x-lg.q-pa-md
  //- Display errors prominantly
  p(v-if='errors.webmidi.enable')
    strong.text-negative Error starting webmidi:&nbsp;
    span {{errors.webmidi.enable}}
  div(v-else)
    p(v-if='!Object.keys(devices.inputs).length && !Object.keys(devices.outputs).length')
      strong.text-negative No MIDI Devices found

  .row.q-col-gutter-md
    //- Input
    .col-12(v-if='Object.keys(devices.inputs).length' :class='{"col-sm-6": isHoriz}')
      q-list(bordered padding)
        q-item-label(header) MIDI Inputs

        q-item(v-for='input in devices.inputs' clickable v-ripple :key='input.id')
          q-item-section(avatar top)
            q-avatar(icon='fab fa-usb' color='blockly-send-midi' text-color='white')

          q-item-section
            q-item-label(lines=1) {{input.name}}
            q-item-label(caption)
              span.device-last-message(v-html='input.lastMessage')

          q-item-section(side)
            q-badge.device-led(:color='input.led ? "green on" : "grey off"') &nbsp;
    //- Outputs
    .col-12(v-if='Object.keys(devices.inputs).length' :class='{"col-sm-6": isHoriz}')
      q-list(bordered padding)
        q-item-label(header) MIDI Outputs

        q-item(v-for='input in devices.inputs' clickable v-ripple :key='input.id')
          q-item-section(avatar top)
            q-avatar(icon='fab fa-usb' color='blockly-send-midi' text-color='white')

          q-item-section
            q-item-label(lines=1) {{input.name}}
            q-item-label(caption)
              span.device-last-message &nbsp;

          q-item-section(side)
            q-badge(color='grey') &nbsp;
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'PageIndex',

  props: ['isHoriz', 'errors'],

  computed: mapState([
    'devices',
    'workspace'
  ]),

  data () {
    return {
      version: this.$version
    }
  }
}
</script>