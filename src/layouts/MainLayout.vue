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

      // Setup listeners
      this.$root.$on('$m.triggerEvent', this.triggerEvent)
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
      const events = [/*'midimessage',*/ 'activesensing', 'channelaftertouch', 'channelmode', 'clock', 'continue', 'controlchange', 'keyaftertouch', 'noteoff', 'noteon', 'nrpn', 'pitchbend', 'programchange', 'reset', 'songposition', 'songselect', 'start', 'stop', 'sysex', 'timecode', 'tuningrequest', 'unknownsystemmessage']

      events.forEach(eventName => {
        input.addListener(eventName, 'all', e => {
          this.$root.$emit('$m.triggerEvent', eventName, e)
        })
      })

      // Toggle the light indicator
      input.addListener('midimessage', 'all', e => {
        this.$store.commit('set', [`devices.inputs['${e.target.id}'].led`, true])
        setTimeout(() => {
          this.$store.commit('set', [`devices.inputs['${e.target.id}'].led`, false])
        }, 10)
      })
    },

    /**
     * Runs the code (if isPlaying)
     */
    triggerEvent (eventName, ev) {
      // Run the code
      if (this.workspace.code) {
        const data = Object.assign({}, ev)
        delete data.target
        
        this.workspace.interpreter.appendCode(`$m.trigger('${eventName}', '${JSON.stringify(data)}')`)
        this.workspace.interpreter.run()
      }

      // Update device message
      let eventSpecificData
      switch (eventName) {
        case 'noteon':
        case 'noteoff':
          eventSpecificData = 'note'
          break;

        case 'controlchange':
          eventSpecificData = 'controller'
          break;
      }
      
      const codeTag = this.isHoriz ? 'code' : 'pre';
      this.$store.commit('set', [
        `devices.inputs['${ev.target.id}'].lastMessage`,
        `<div>
          <strong>${eventName}</strong>:
          <${codeTag}>${JSON.stringify(ev[eventSpecificData], null, !this.isHoriz * 2)}</${codeTag}>
        </div>
        <div>
          <strong>data</strong>:
          <${codeTag}>${JSON.stringify(ev.data, null, !this.isHoriz * 2)}</${codeTag}>
        </div>`])
    }
  }
}
</script>
