import Blockly from 'blockly'

/**
 * A color box with a quasar color picker
 */
Blockly.Blocks['style_color'] = {
  /**
   * Sets the block's color
   */
  init: function() {
    this.setColour('#fad000')
    this.appendDummyInput()
        .appendField('color:')
        .appendField(new Blockly.FieldTextInput('#fad000', this.setColor), 'COLOR')
    this.setOutput(true, 'Color')

    // @todo Update these
    this.setTooltip('Paint the block with this color.')
    this.setHelpUrl('https://www.youtube.com/watch?v=s2_xaEvcVI0#t=55')

    // Listeners
    setTimeout(() => {
      // @TODO also handle focus/tabstop
      this.getField('COLOR').getClickTarget_().addEventListener('click', () => {
        document.dispatchEvent(new CustomEvent('blockly.showColorPicker', {detail: {
          block: this,
          color: this.getColour()
        }}))
      })
    })
  },

  // Update the current block's colour to match
  setColor: function(color) {
    if (color) {
      this.sourceBlock_.setColour(color)
    }
  },

  mutationToDom: function(workspace) {
    const container = Blockly.utils.xml.createElement('mutation')
    container.setAttribute('colour', this.getColour())
    return container
  },

  domToMutation: function(container) {
    this.setColour(container.getAttribute('colour'))
  }
}