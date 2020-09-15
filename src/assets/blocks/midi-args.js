import * as Blockly from 'blockly/core'

/**
 * Compare note
 */
Blockly.JavaScript['midi_arg_compare_note'] = function(block) {
  var dropdown_condition = block.getFieldValue('condition');
  var text_note = block.getFieldValue('note');
  var value_args = Blockly.JavaScript.valueToCode(block, 'args', Blockly.JavaScript.ORDER_ATOMIC);

var code = `{
  type: 'midi_arg_compare_note',
  condition: '${dropdown_condition}',
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
        .appendField("when note")
        .appendField(new Blockly.FieldDropdown([["is","is"], ["is not","is not"]]), "condition")
        .appendField(new Blockly.FieldTextInput("any"), "note");
    this.setOutput(true, "midi_arg");
    this.setColour('#FF9D00');
 this.setTooltip("Compares the MIDI note");
 this.setHelpUrl("https://midiblocks.com/block/midi_arg_compare_note");
  }
};