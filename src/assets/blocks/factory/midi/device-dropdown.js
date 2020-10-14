import Blockly from 'blockly'

/**
 * A MIDI device dropdown selector
 * - Displays "MIDI is disabled"
 * - Displays "No MIDI devices connected"
 * @todo helpURl
 */
Blockly.Blocks['field_midi_device_dropdown'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('🎹 MIDI device selector')
      .appendField(new Blockly.FieldTextInput('DEVICE'), 'FIELDNAME')

    this.setPreviousStatement(true, 'Field')
    this.setNextStatement(true, 'Field')
    this.setColour('2EC4B6')
    this.setTooltip('Dropdown menu with a list of available devices')
    this.setHelpUrl('https://www.youtube.com/watch?v=s2_xaEvcVI0#t=386')
  }
}