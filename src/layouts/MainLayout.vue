<template lang="pug">
q-layout.full-height(view='lHh Lpr lFf')
  q-page-container.full-height
    q-page.full-height
      //- Appbar
      q-bar#appbar
        q-space
        q-btn(dense flat icon='fas fa-play' :color='workspace.isRunning ? "green" : "grey-8"' @click='workspace.isRunning = !workspace.isRunning')
        q-space
        q-btn(dense flat :icon='"fas fa-columns " + (!isHoriz && "fa-rotate-270")' @click='toggleHoriz')

      q-splitter#main-splitter.full-height.q-pt-appbar(v-model='splitter' :horizontal='isHoriz' unit='px' reverse)
        //- Console
        template(v-slot:after)
          q-tabs(dense narrow-indicator align='left')
            q-route-tab(to='/' label='Overview')
            q-route-tab(to='/code' label='Code')
          q-separator
          router-view(:isHoriz='isHoriz' :errors='errors')
        
        //- Editor
        template(v-slot:before)
          Blockly.blockly(ref='foo' :options='options')
            category(name='Logic' colour='%{BKY_LOGIC_HUE}')
              block(type='controls_if')
              block(type='logic_compare')
              block(type='logic_operation')
              block(type='logic_negate')
              block(type='logic_boolean')
            category(name='Loops' colour='%{BKY_LOOPS_HUE}')
              block(type='controls_repeat_ext')
                value(name='TIMES')
                  block(type='math_number')
                    field(name='NUM') 10
              block(type='controls_whileUntil')
            category(name='Math' colour='%{BKY_MATH_HUE}')
              block(type='math_number')
                field(name='NUM') 123
              block(type='math_arithmetic')
              block(type='math_single')
            category(name='Variables' custom='VARIABLE' colour='%{BKY_VARIABLES_HUE}')
            category(name='🎹 MIDI Events' colour='#a5a55b')
              block(type='when_midi_event')
</template>

<script>
import {mapState} from 'vuex'
import Blockly from '../components/Blockly'
import BlocklyJS from 'blockly/javascript'
import store from 'store'
import '../blocks/midi-events'
import '../blocks/prompt'

const minHeight = 200

export default {
  name: 'MainLayout',

  computed: {
    ...mapState(['workspace'])
  },

  components: {
    Blockly
  },

  /**
   * Initialize WebMidi
   */
  mounted () {
    this.$m.enable((errors) => {
      const inputs = {}
      const outputs = {}
      
      this.errors.webmidi.enable = errors

      // Map array to object using device.id
      // @note Any new properties must be set below or Vue won't refresh/update
      this.$m.inputs.forEach(input => {
        inputs[input.id] = input
        input.led = false
        input.lastMessage = ''
        this.bindInput(input.id)
      })
      this.$m.outputs.forEach(output => {
        outputs[output.id] = output
      })
      
      this.$store.commit('set', ['devices', {
        inputs,
        outputs
      }])
    })
  },

  watch: {
    /**
     * Resize main splitter
     */
    splitter () {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      })
    },
    isHoriz () {
      store.set('isHoriz', this.isHoriz)
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      })
    }
  },
  
  data () {
    const isHoriz = store.get('isHoriz')
    
    return {
      errors: {
        webmidi: {
          enable: false
        }
      },
      
      // Whether we are horizontal (code above console) or not (code aside console)
      isHoriz,

      // Blockly options
      // @see https://developers.google.com/blockly/guides/configure/web/configuration_struct
      options: {
        media: 'media/',
        renderer: 'zelos',
        zoom: {
          controls: true,
          pinch: true,
          wheel: true
        },
        grid: {
          spacing: 25,
          length: 3,
          colour: '#ccc',
          snap: true
        }
      },

      // Spliter width in pixels
      splitter: !isHoriz ? window.innerWidth / 3 : minHeight
    }
  },

  methods: {
    /**
     * Flip the layout from Vertical <-> Horizontal
     */
    toggleHoriz () {
      if (this.isHoriz) {
        this.splitter = window.innerWidth / 3
      } else {
        this.splitter = minHeight
      }

      this.isHoriz = !this.isHoriz
    },
    
    /**
     * Binds individiual inputs
     */
    bindInput (id) {
      const input = this.$m.getInputById(id)

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

      /**
       * controlchange - When a slider, turny-thing, or other controls change their state
       */
      input.addListener('controlchange', 'all', e => {
        const codeTag = this.isHoriz ? 'code' : 'pre';

        if (this.workspace.code) {
          const data = Object.assign({}, e)
          delete data.target
          
          this.workspace.interpreter.appendCode(`$m.trigger('controlchange', '${JSON.stringify(data)}')`)
          this.workspace.interpreter.run()
        }

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


      /**
       * noteoff - When a pad, key, or other pressable thing is released
       */
      input.addListener('noteoff', 'all', e => {
        const codeTag = this.isHoriz ? 'code' : 'pre';

        if (this.workspace.code) {
          const data = Object.assign({}, e)
          delete data.target
          
          this.workspace.interpreter.appendCode(`$m.trigger('noteoff', '${JSON.stringify(data)}')`)
          this.workspace.interpreter.run()
        }

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

      /**
       * noteon - When a pad, key, or other pressable thing is pressed
       */
      input.addListener('noteon', 'all', e => {
        const codeTag = this.isHoriz ? 'code' : 'pre';

        if (this.workspace.code) {
          const data = Object.assign({}, e)
          delete data.target
          
          this.workspace.interpreter.appendCode(`$m.trigger('noteon', '${JSON.stringify(data)}')`)
          this.workspace.interpreter.run()
        }
        
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
