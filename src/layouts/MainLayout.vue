<template lang="pug">
q-layout.full-height(view='lHh Lpr lFf')
  q-page-container.full-height
    q-page.full-height
      //- Appbar
      q-bar#appbar
        q-space
        q-btn(dense flat icon='fas fa-play' :color='isRunning ? "green" : "grey-8"' @click='isRunning = !isRunning')
        q-space
        q-btn(dense flat :icon='"fas fa-columns " + (!isHoriz && "fa-rotate-270")' @click='toggleHoriz')

      q-splitter.full-height.q-pt-appbar(v-model='splitter' :horizontal='isHoriz' unit='px' reverse)
        //- Console
        template(v-slot:after)
          q-tabs(dense narrow-indicator align='left')
            q-route-tab(to='/' label='Overview')
            q-route-tab(to='/code' label='Code')
          q-separator
          router-view.q-pa-md(:isHoriz='isHoriz')
        
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
import Blockly from '../components/Blockly'
import BlocklyJS from 'blockly/javascript'
import store from 'store'
import '../blocks/midi-events'
import '../blocks/prompt'

const minHeight = 200

export default {
  name: 'MainLayout',

  components: {
    Blockly
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
      // Whether we are horizontal (code above console) or not (code aside console)
      isHoriz,

      // Whether the app is running or not
      isRunning: true,
      
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
    }
  }
}
</script>
