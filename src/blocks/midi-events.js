import * as Blockly from 'blockly/core'

/**
 * When MIDI {Event}
 */
Blockly.JavaScript['midi_on_event'] = function(block) {
  const dropdown_event = block.getFieldValue('event');
  const text_device = block.getFieldValue('device');
  const value_args = Blockly.JavaScript.valueToCode(block, 'args', Blockly.JavaScript.ORDER_ATOMIC);
  const statements_statements = Blockly.JavaScript.statementToCode(block, 'statements');

let code = `addEventListener('${dropdown_event}', [${value_args}], function (event) {
  var data = event.payload;
  var args = event.args;
  
${statements_statements}
});\n`

  return code
}

/**
 * 👇👇👇 DO NOT EDIT BLOCK DEFINITIONS BELOW MANUALLY 👇👇👇
 * - To make changes, import ./backups/midi-events.js into: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html
 * - Make edits there, then click Block Exporter
 * - Select ONLY "Block Definitions" in JavaScript format
 * - Copy paste code below
 */
Blockly.Blocks['midi_on_event'] = {
  init: function() {
    this.appendValueInput("args")
        .setCheck("midi_arg")
        .appendField("On MIDI")
        .appendField(new Blockly.FieldDropdown([["Note On","noteon"], ["Note Off","noteoff"], ["Control Change","controlchange"]]), "event")
        .appendField("from device")
        .appendField(new Blockly.FieldTextInput("any"), "device");
    this.appendStatementInput("statements")
        .setCheck(null);
    this.setInputsInline(false);
    this.setColour(60);
 this.setTooltip("Runs the midiblock when the selected MIDI event is triggered from the specified device. Attach MIDI Args to the right to fine-tune the event");
 this.setHelpUrl("https://midiblocks.com/block/midi_on_event");
  }
};