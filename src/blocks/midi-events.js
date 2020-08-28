import * as Blockly from 'blockly/core'

Blockly.JavaScript['when_midi_event'] = function(block) {
  const dropdown_event = block.getFieldValue('event');
  
let code = `$m('*').on('${dropdown_event}', function (event, note) {
  console.log(event.name, note)
});\n`;

  return code;
};

Blockly.JavaScript['midi_send_note'] = function(block) {
  let text_note = block.getFieldValue('note');
  let text_channel = block.getFieldValue('channel');
  let value_meta = Blockly.JavaScript.valueToCode(block, 'meta', Blockly.JavaScript.ORDER_ATOMIC);

let code = `$m('note ${text_note}').play({
  channel: ${text_channel}
})`

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
    this.appendValueInput("meta")
        .setCheck("String")
        .appendField("Play Note")
        .appendField(new Blockly.FieldTextInput("C"), "note")
        .appendField("on channel")
        .appendField(new Blockly.FieldTextInput("all"), "channel");
    this.setPreviousStatement(true, null);
    this.setNextStatement(true, null);
    this.setColour(60);
 this.setTooltip("");
 this.setHelpUrl("");
  }
};