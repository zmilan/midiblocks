<template lang="pug">
.q-p-x-lg.q-pa-md
  //- Display errors prominantly
  p(v-if='err.webmidi.enable')
    strong.text-negative Error starting webmidi:&nbsp;
    span {{err.webmidi.enable}}
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
            q-avatar(icon='fas fa-sliders-h' color='primary' text-color='white')

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
            q-avatar(icon='fas fa-sliders-h' color='primary' text-color='white')

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

  props: ['isHoriz'],

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
      // @note Any new properties must be set below or Vue won't refresh/update
      this.$webmidi.inputs.forEach(input => {
        inputs[input.id] = input
        input.led = false
        input.lastMessage = ''
        this.bindInput(input.id)
      })
      this.$webmidi.outputs.forEach(output => {
        outputs[output.id] = output
      })
      
      this.$store.commit('set', ['devices', {
        inputs,
        outputs
      }])
    })
  },

  methods: {
    /**
     * Binds individiual inputs
     */
    bindInput (id) {
      const input = this.$webmidi.getInputById(id)

      // Toggle the light indicator
      input.addListener('midimessage', 'all', e => {
        this.$store.commit('set', [`devices.inputs['${e.target.id}'].led`, true])
        setTimeout(() => {
          this.$store.commit('set', [`devices.inputs['${e.target.id}'].led`, false])
        }, 10)
      })

      // Map events
      input.addListener('activesensing', 'all', e => {
        console.log('🎹 Received "activesensing" message', e)
      })
      input.addListener('channelaftertouch', 'all', e => {
        console.log('🎹 Received "channelaftertouch" message', e)
      })
      input.addListener('channelmode', 'all', e => {
        console.log('🎹 Received "channelmode" message', e)
      })
      input.addListener('clock', 'all', e => {
        console.log('🎹 Received "clock" message', e)
      })
      input.addListener('continue', 'all', e => {
        console.log('🎹 Received "continue" message', e)
      })
      input.addListener('controlchange', 'all', e => {
        const codeTag = this.isHoriz ? 'code' : 'pre';
        console.log('🎹 Received "controlchange" message', e)
        
        this.$store.commit('set', [
          `devices.inputs['${e.target.id}'].lastMessage`,
          `<div>
            <strong>controlchange</strong>:
            <${codeTag}>${JSON.stringify(e.controller, null, !this.isHoriz * 2)}</${codeTag}>
          </div>
          <div>
            <strong>data</strong>:
            <${codeTag}>${JSON.stringify(e.data, null, !this.isHoriz * 2)}</${codeTag}>
          </div>`])
      })
      input.addListener('keyaftertouch', 'all', e => {
        console.log('🎹 Received "keyaftertouch" message', e)
      })
      input.addListener('noteoff', 'all', e => {
        const codeTag = this.isHoriz ? 'code' : 'pre';
        console.log('🎹 Received "noteoff" message', e)
        this.$store.commit('set', [
          `devices.inputs['${e.target.id}'].lastMessage`,
          `<div>
            <strong>noteoff</strong>:
            <${codeTag}>${JSON.stringify(e.note, null, !this.isHoriz * 2)}</${codeTag}>
          </div>
          <div>
            <strong>data</strong>:
            <${codeTag}>${JSON.stringify(e.data, null, !this.isHoriz * 2)}</${codeTag}>
          </div>`])
      })
      input.addListener('noteon', 'all', e => {
        const codeTag = this.isHoriz ? 'code' : 'pre';
        console.log('🎹 Received "noteon" message', e)
        this.$store.commit('set', [
          `devices.inputs['${e.target.id}'].lastMessage`,
          `<div>
            <strong>noteon</strong>:
            <${codeTag}>${JSON.stringify(e.note, null, !this.isHoriz * 2)}</${codeTag}>
          </div>
          <div>
            <strong>data</strong>:
            <${codeTag}>${JSON.stringify(e.data, null, !this.isHoriz * 2)}</${codeTag}>
          </div>`])
      })
      input.addListener('nrpn', 'all', e => {
        console.log('🎹 Received "nrpn" message', e)
      })
      input.addListener('pitchbend', 'all', e => {
        console.log('🎹 Received "pitchbend" message', e)
      })
      input.addListener('programchange', 'all', e => {
        console.log('🎹 Received "programchange" message', e)
      })
      input.addListener('reset', 'all', e => {
        console.log('🎹 Received "reset" message', e)
      })
      input.addListener('songposition', 'all', e => {
        console.log('🎹 Received "songposition" message', e)
      })
      input.addListener('songselect', 'all', e => {
        console.log('🎹 Received "songselect" message', e)
      })
      input.addListener('start', 'all', e => {
        console.log('🎹 Received "start" message', e)
      })
      input.addListener('stop', 'all', e => {
        console.log('🎹 Received "stop" message', e)
      })
      input.addListener('sysex', 'all', e => {
        console.log('🎹 Received "sysex" message', e)
      })
      input.addListener('timecode', 'all', e => {
        console.log('🎹 Received "timecode" message', e)
      })
      input.addListener('tuningrequest', 'all', e => {
        console.log('🎹 Received "tuningrequest" message', e)
      })
      input.addListener('unknownsystemmessage', 'all', e => {
        console.log('🎹 Received "unknownsystemmessage" message', e)
      })
    }
  }
}
</script>