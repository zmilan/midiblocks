import * as Blockly from 'blockly/core'

/**
 * When MIDI {Event}
 */
Blockly.JavaScript['when_midi_event'] = function(block) {
  const dropdown_event = block.getFieldValue('event')
  
let code = `addEventListener('${dropdown_event}', function (event) {
  console.log(event)
});\n`

  return code
};

/**
 * Send note {note} to device {device} on channel {channel}
 */
Blockly.JavaScript['midi_send_note'] = function(block) {
  let text_note = block.getFieldValue('note')
  let text_device  = block.getFieldValue('device')
  let text_channel = block.getFieldValue('channel')

  let code = `playNote('note ${text_note} ${text_channel} ${text_device}')`

  return code
}

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
        .appendField("When 🎹");
    this.appendDummyInput()
        .appendField(new Blockly.FieldDropdown([["Note On","noteon"], ["Note Off","noteoff"], ["Control Change","controlchange"]]), "event");
    this.setInputsInline(true);
    this.setNextStatement(true, null);
    this.setColour(60);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};

Blockly.Blocks['midi_send_note'] = {
  init: function() {
    this.appendDummyInput()
        .appendField("Play note")
        .appendField(new Blockly.FieldTextInput("C"), "note")
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