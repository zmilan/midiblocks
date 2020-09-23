<template lang="pug">
q-dialog(v-model='colorPicker.isVisible' @hide='cancelColor' @escape-key='cancelColor')
  q-card(style='max-width: 300px;')
    q-card-section.q-px-none.q-pt-none
      q-color(v-model='colorPicker.color' default-view='palette' :palette='colorPicker.palette' @input='onColorPickerChange')
    q-card-actions(align='right')
      q-btn(flat label='Cancel' @click='cancelColor')
      q-btn(color='secondary' label='Update' @click='saveColor')  
</template>

<script>
export default {
  name: 'ColorPicker',

  data: () => ({
    colorPicker: {
      origColor: '',
      color: '',
      isVisible: false,
      palette: ['#ff628c', '#FF9D00', '#fad000', '#2ca300', '#2EC4B6', '#5D37F0'],
      block: null
    }
  }),
  
  mounted () {
    document.addEventListener('blockly.showColorPicker', this.showColorPicker)
  },
  
  destroyed () {
    document.removeEventListener('blockly.showColorPicker', this.showColorPicker)
  },

  methods: {
    /**
     * Saves the color
     */
    saveColor () {
      this.colorPicker.origColor = this.colorPicker.color
      this.colorPicker.isVisible = false
    },

    /**
     * Show the color picker
     */
    showColorPicker (ev) {
      this.colorPicker.isVisible = true
      this.colorPicker.origColor = this.colorPicker.color = ev.detail.color
      this.colorPicker.block = ev.detail.block
    },

    /**
     * Update the color picker
     */
    onColorPickerChange (color) {
      this.colorPicker.block.getField('COLOR').setValue(color)
      this.colorPicker.block.setFieldValue(color, 'COLOR')
    },

    /**
     * Restores the color
     */
    cancelColor () {
      this.colorPicker.block.setFieldValue(this.colorPicker.origColor, 'COLOR')
      this.colorPicker.isVisible = false
    }
  }
}
</script>