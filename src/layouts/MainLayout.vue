<template lang="pug">
q-layout.full-height(view='lHh Lpr lFf')
  q-page-container.full-height
    q-page.full-height
      q-bar#appbar
        q-space
        q-btn(v-if='isHoriz' dense flat icon='fas fa-columns' @click='toggleHoriz')
        q-btn(v-else dense flat icon='fas fa-columns fa-rotate-270' @click='toggleHoriz')

      q-splitter.full-height.q-pt-appbar(v-model='splitter' :horizontal='isHoriz' unit='px' reverse)
        //- Console
        template(v-slot:after)
          q-tabs(v-model='routerTab' dense narrow-indicator align='left')
            q-tab(name='welcome' label='Welcome')
          q-separator
          router-view.q-pa-md
        
        //- Editor
        template(v-slot:before)
          blockly.blockly(ref='foo' :options='options')
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
            category(name='Text' colour='%{BKY_TEXTS_HUE}')
              block(type='text')
              block(type='text_length')
              block(type='text_print')
            category(name='Variables' custom='VARIABLE' colour='%{BKY_VARIABLES_HUE}')
            category(name='Stocks' colour='%{BKY_LOOPS_HUE}')
              block(type='stock_buy_simple')
              block(type='stock_buy_prog')
              block(type='stock_fetch_price')
</template>

<script>
import Blockly from '../components/Blockly'
import '../blocks/blocks'
import '../blocks/prompt'

import BlocklyJS from 'blockly/javascript'

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
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      })
    }
  },
  
  data () {
    return {
      // Whether we are horizontal (code above console) or not (code aside console)
      isHoriz: true,
      
      options: {
        media: 'media/',
        grid: {
          spacing: 25,
          length: 3,
          colour: '#ccc',
          snap: true
        }
      },

      routerTab: 'welcome',
      
      // Spliter width in pixels
      splitter: 300
    }
  },

  methods: {
    /**
     * Flip the layout from Vertical <-> Horizontal
     */
    toggleHoriz () {
      if (this.isHoriz) {
        this.splitter = window.innerWidth / 2
      } else {
        this.splitter = 300
      }

      this.isHoriz = !this.isHoriz
    }
  }
}
</script>
