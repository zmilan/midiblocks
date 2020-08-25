<template lang="pug">
q-page
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
  p#code
    button(v-on:click='showCode()') Show JavaScript
    pre(v-html='code').
</template>

<script>
import Blockly from '../components/Blockly'
import '../blocks/blocks'
import '../blocks/prompt'

import BlocklyJS from 'blockly/javascript'

export default {
  name: 'PageIndex',
  components: {
    Blockly
  },

  data () {
    return {
      code: '',
      options: {
        media: 'media/',
        grid: {
          spacing: 25,
          length: 3,
          colour: '#ccc',
          snap: true
        }
      }
    }
  },

  methods: {
    showCode () {
      this.code = BlocklyJS.workspaceToCode(this.$refs.foo.workspace)
    }
  }
}
</script>