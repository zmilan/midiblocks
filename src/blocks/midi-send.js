import * as Blockly from 'blockly/core'

/**
 * Send note {note} to device {device} on channel {channel}
 */
Blockly.JavaScript['midi_send_note'] = function(block) {
  let text_note = block.getFieldValue('note')
  let text_device  = block.getFieldValue('device')
  let text_channel = block.getFieldValue('channel')

  let code = `playNote('${text_note}', '${text_channel}', '${text_device}');\n`

  return code
}

/**
 * 👇👇👇 DO NOT EDIT BLOCK DEFINITIONS BELOW MANUALLY 👇👇👇
 * - To make changes, import ./backups/midi-events.js into: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html
 * - Make edits there, then click Block Exporter
 * - Select ONLY "Block Definitions" in JavaScript format
 * - Copy paste code below
 */

Blockly.Blocks['midi_send_note'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Play note")
        .appendField(new Blockly.FieldTextInput("C4"), "note")
        .appendField("on device")
        .appendField(new Blockly.FieldTextInput("all"), "device")
        .appendField("on channel")
        .appendField(new Blockly.FieldTextInput("all"), "channel");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};