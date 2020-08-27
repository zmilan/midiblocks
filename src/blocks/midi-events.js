import * as Blockly from 'blockly/core'

Blockly.JavaScript['when_midi_event'] = function(block) {
  var dropdown_event = block.getFieldValue('event');
  var code = `$m.on('noteon');\n`;
  return code;
};

/**
 * 👇👇👇 DO NOT EDIT BLOCK DEFINITIONS BELOW MANUALLY 👇👇👇
 * - To make changes, import ./backups/midi-events.js into: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html
 * - Make edits there, then click Block Exporter
 * - Select ONLY "Block Definitions" in JavaScript format
 * - Copy paste code below
 */
Blockly.Blocks['when_midi_event'] = {
  init: function() {
    this.appendDummyInput()
      .appendField('When 🎹')
    this.appendDummyInput()
      .appendField(new Blockly.FieldDropdown([['Note On','noteon'], ['Note Off','noteoff'], ['Control Change','controlchange']]), 'event')
    this.setInputsInline(true)
    this.setNextStatement(true, null)
    this.setColour(60)
    this.setTooltip('')
    this.setHelpUrl('')
  }
}