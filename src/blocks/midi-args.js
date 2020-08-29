import * as Blockly from 'blockly/core'

/**
 * Compare note
 */
Blockly.JavaScript['midi_arg_compare_note'] = function(block) {
  var dropdown_condition0 = block.getFieldValue('condition0');
  var dropdown_condition1 = block.getFieldValue('condition1');
  var text_note = block.getFieldValue('note');
  var value_args = Blockly.JavaScript.valueToCode(block, 'args', Blockly.JavaScript.ORDER_ATOMIC);

var code = `{
  conditional0: '${dropdown_condition0}',
  conditional1: '${dropdown_condition1}',
  note: '${text_note}'
}`

  if (value_args) {
    code += `, ${value_args}`
  }

  // TODO: Change ORDER_NONE to the correct strength.
  // @see https://developers.google.com/blockly/guides/create-custom-blocks/operator-precedence
  return [code, Blockly.JavaScript.ORDER_ATOMIC];
};

/**
 * 👇👇👇 DO NOT EDIT BLOCK DEFINITIONS BELOW MANUALLY 👇👇👇
 * - To make changes, import ./backups/midi-events.js into: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html
 * - Make edits there, then click Block Exporter
 * - Select ONLY "Block Definitions" in JavaScript format
 * - Copy paste code below
 */
Blockly.Blocks['midi_arg_compare_note'] = {
  init: function() {
    this.appendValueInput("args")
        .setCheck("midi_arg")
        .appendField(new Blockly.FieldDropdown([["and","and"], ["or","or"]]), "condition0")
        .appendField("note")
        .appendField(new Blockly.FieldDropdown([["is","is"], ["is not","is not"]]), "condition1")
        .appendField(new Blockly.FieldTextInput("any"), "note");
    this.setOutput(true, null);
    this.setColour(45);
 this.setTooltip("Compares the MIDI note");
 this.setHelpUrl("https://midiblocks.com/block/midi_arg_compare_note");
  }
};