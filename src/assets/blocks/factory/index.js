/**
 * @license
 * Copyright 2012 Google LLC
 * SPDX-License-Identifier: Apache-2.0
 */
import Blockly from 'blockly'
import './base'
import './color'

var FIELD_MESSAGE = 'fields %1 %2';
var FIELD_ARGS = [
  {
    "type": "field_dropdown",
    "name": "ALIGN",
    "options": [['left', 'LEFT'], ['right', 'RIGHT'], ['centre', 'CENTRE']],
  },
  {
    "type": "input_statement",
    "name": "FIELDS",
    "check": "Field"
  }
];

var TYPE_MESSAGE = 'type %1';
var TYPE_ARGS = [
  {
    "type": "input_value",
    "name": "TYPE",
    "check": "Type",
    "align": "RIGHT"
  }
];

Blockly.Blocks['input_value'] = {
  // Value input.
  init: function() {
    this.jsonInit({
      "message0": "value input %1 %2",
      "args0": [
        {
          "type": "field_input",
          "name": "INPUTNAME",
          "text": "NAME"
        },
        {
          "type": "input_dummy"
        }
      ],
      "message1": FIELD_MESSAGE,
      "args1": FIELD_ARGS,
      "message2": TYPE_MESSAGE,
      "args2": TYPE_ARGS,
      "previousStatement": "Input",
      "nextStatement": "Input",
      "colour": '5D37F0',
      "tooltip": "A value socket for horizontal connections.",
      "helpUrl": "https://www.youtube.com/watch?v=s2_xaEvcVI0#t=71"
    });
  },
  onchange: function() {
    inputNameCheck(this);
  }
};

Blockly.Blocks['input_statement'] = {
  // Statement input.
  init: function() {
    this.jsonInit({
      "message0": "statement input %1 %2",
      "args0": [
        {
          "type": "field_input",
          "name": "INPUTNAME",
          "text": "NAME"
        },
        {
          "type": "input_dummy"
        },
      ],
      "message1": FIELD_MESSAGE,
      "args1": FIELD_ARGS,
      "message2": TYPE_MESSAGE,
      "args2": TYPE_ARGS,
      "previousStatement": "Input",
      "nextStatement": "Input",
      "colour": '5D37F0',
      "tooltip": "A statement socket for enclosed vertical stacks.",
      "helpUrl": "https://www.youtube.com/watch?v=s2_xaEvcVI0#t=246"
    });
  },
  onchange: function() {
    inputNameCheck(this);
  }
};

Blockly.Blocks['input_dummy'] = {
  // Dummy input.
  init: function() {
    this.jsonInit({
      "message0": "dummy input",
      "message1": FIELD_MESSAGE,
      "args1": FIELD_ARGS,
      "previousStatement": "Input",
      "nextStatement": "Input",
      "colour": '5D37F0',
      "tooltip": "For adding fields on a separate row with no " +
                 "connections. Alignment options (left, right, centre) " +
                 "apply only to multi-line fields.",
      "helpUrl": "https://www.youtube.com/watch?v=s2_xaEvcVI0#t=293"
    });
  }
};

Blockly.Blocks['field_static'] = {
  // Text value.
  init: function() {
    this.setColour('2EC4B6');
    this.appendDummyInput()
        .appendField('text')
        .appendField(new Blockly.FieldTextInput(''), 'TEXT');
    this.setPreviousStatement(true, 'Field');
    this.setNextStatement(true, 'Field');
    this.setTooltip('Static text that serves as a label.');
    this.setHelpUrl('https://www.youtube.com/watch?v=s2_xaEvcVI0#t=88');
  }
};

Blockly.Blocks['field_input'] = {
  // Text input.
  init: function() {
    this.setColour('2EC4B6');
    this.appendDummyInput()
        .appendField('text input')
        .appendField(new Blockly.FieldTextInput('default'), 'TEXT')
        .appendField(',')
        .appendField(new Blockly.FieldTextInput('NAME'), 'FIELDNAME');
    this.setPreviousStatement(true, 'Field');
    this.setNextStatement(true, 'Field');
    this.setTooltip('An input field for the user to enter text.');
    this.setHelpUrl('https://www.youtube.com/watch?v=s2_xaEvcVI0#t=319');
  },
  onchange: function() {
    fieldNameCheck(this);
  }
};

Blockly.Blocks['field_number'] = {
  // Numeric input.
  init: function() {
    this.setColour('2EC4B6');
    this.appendDummyInput()
        .appendField('numeric input')
        .appendField(new Blockly.FieldNumber(0), 'VALUE')
        .appendField(',')
        .appendField(new Blockly.FieldTextInput('NAME'), 'FIELDNAME');
    this.appendDummyInput()
        .appendField('min')
        .appendField(new Blockly.FieldNumber(-Infinity), 'MIN')
        .appendField('max')
        .appendField(new Blockly.FieldNumber(Infinity), 'MAX')
        .appendField('precision')
        .appendField(new Blockly.FieldNumber(0, 0), 'PRECISION');
    this.setPreviousStatement(true, 'Field');
    this.setNextStatement(true, 'Field');
    this.setTooltip('An input field for the user to enter a number.');
    this.setHelpUrl('https://www.youtube.com/watch?v=s2_xaEvcVI0#t=319');
  },
  onchange: function() {
    fieldNameCheck(this);
  }
};

Blockly.Blocks['field_angle'] = {
  // Angle input.
  init: function() {
    this.setColour('2EC4B6');
    this.appendDummyInput()
        .appendField('angle input')
        .appendField(new Blockly.FieldAngle('90'), 'ANGLE')
        .appendField(',')
        .appendField(new Blockly.FieldTextInput('NAME'), 'FIELDNAME');
    this.setPreviousStatement(true, 'Field');
    this.setNextStatement(true, 'Field');
    this.setTooltip('An input field for the user to enter an angle.');
    this.setHelpUrl('https://www.youtube.com/watch?v=s2_xaEvcVI0#t=372');
  },
  onchange: function() {
    fieldNameCheck(this);
  }
};

Blockly.Blocks['field_dropdown'] = {
  // Dropdown menu.
  init: function() {
    this.appendDummyInput()
        .appendField('dropdown')
        .appendField(new Blockly.FieldTextInput('NAME'), 'FIELDNAME');
    this.optionCount_ = 3;
    this.updateShape_();
    this.setPreviousStatement(true, 'Field');
    this.setNextStatement(true, 'Field');
    this.setMutator(new Blockly.Mutator(['field_dropdown_option']));
    this.setColour('2EC4B6');
    this.setTooltip('Dropdown menu with a list of options.');
    this.setHelpUrl('https://www.youtube.com/watch?v=s2_xaEvcVI0#t=386');
  },
  mutationToDom: function(workspace) {
    // Create XML to represent menu options.
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('options', this.optionCount_);
    return container;
  },
  domToMutation: function(container) {
    // Parse XML to restore the menu options.
    this.optionCount_ = parseInt(container.getAttribute('options'), 10);
    this.updateShape_();
  },
  decompose: function(workspace) {
    // Populate the mutator's dialog with this block's components.
    var containerBlock = workspace.newBlock('field_dropdown_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.optionCount_; i++) {
      var optionBlock = workspace.newBlock('field_dropdown_option');
      optionBlock.initSvg();
      connection.connect(optionBlock.previousConnection);
      connection = optionBlock.nextConnection;
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    // Reconfigure this block based on the mutator dialog's components.
    var optionBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var data = [];
    while (optionBlock) {
      data.push([optionBlock.userData_, optionBlock.cpuData_]);
      optionBlock = optionBlock.nextConnection &&
          optionBlock.nextConnection.targetBlock();
    }
    this.optionCount_ = data.length;
    this.updateShape_();
    // Restore any data.
    for (var i = 0; i < this.optionCount_; i++) {
      this.setFieldValue(data[i][0] || 'option', 'USER' + i);
      this.setFieldValue(data[i][1] || 'OPTIONNAME', 'CPU' + i);
    }
  },
  saveConnections: function(containerBlock) {
    // Store names and values for each option.
    var optionBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (optionBlock) {
      optionBlock.userData_ = this.getFieldValue('USER' + i);
      optionBlock.cpuData_ = this.getFieldValue('CPU' + i);
      i++;
      optionBlock = optionBlock.nextConnection &&
          optionBlock.nextConnection.targetBlock();
    }
  },
  updateShape_: function() {
    // Modify this block to have the correct number of options.
    // Add new options.
    for (var i = 0; i < this.optionCount_; i++) {
      if (!this.getInput('OPTION' + i)) {
        this.appendDummyInput('OPTION' + i)
            .appendField(new Blockly.FieldTextInput('option'), 'USER' + i)
            .appendField(',')
            .appendField(new Blockly.FieldTextInput('OPTIONNAME'), 'CPU' + i);
      }
    }
    // Remove deleted options.
    while (this.getInput('OPTION' + i)) {
      this.removeInput('OPTION' + i);
      i++;
    }
  },
  onchange: function() {
    if (this.workspace && this.optionCount_ < 1) {
      this.setWarningText('Drop down menu must\nhave at least one option.');
    } else {
      fieldNameCheck(this);
    }
  }
};

Blockly.Blocks['field_dropdown_container'] = {
  // Container.
  init: function() {
    this.setColour('2EC4B6');
    this.appendDummyInput()
        .appendField('add options');
    this.appendStatementInput('STACK');
    this.setTooltip('Add, remove, or reorder options\n' +
                    'to reconfigure this dropdown menu.');
    this.setHelpUrl('https://www.youtube.com/watch?v=s2_xaEvcVI0#t=386');
    this.contextMenu = false;
  }
};

Blockly.Blocks['field_dropdown_option'] = {
  // Add option.
  init: function() {
    this.setColour('2EC4B6');
    this.appendDummyInput()
        .appendField('option');
    this.setPreviousStatement(true);
    this.setNextStatement(true);
    this.setTooltip('Add a new option to the dropdown menu.');
    this.setHelpUrl('https://www.youtube.com/watch?v=s2_xaEvcVI0#t=386');
    this.contextMenu = false;
  }
};

Blockly.Blocks['field_checkbox'] = {
  // Checkbox.
  init: function() {
    this.setColour('2EC4B6');
    this.appendDummyInput()
        .appendField('checkbox')
        .appendField(new Blockly.FieldCheckbox('TRUE'), 'CHECKED')
        .appendField(',')
        .appendField(new Blockly.FieldTextInput('NAME'), 'FIELDNAME');
    this.setPreviousStatement(true, 'Field');
    this.setNextStatement(true, 'Field');
    this.setTooltip('Checkbox field.');
    this.setHelpUrl('https://www.youtube.com/watch?v=s2_xaEvcVI0#t=485');
  },
  onchange: function() {
    fieldNameCheck(this);
  }
};

Blockly.Blocks['field_colour'] = {
  // Colour input.
  init: function() {
    this.setColour('2EC4B6');
    this.appendDummyInput()
        .appendField('colour')
        // .appendField(new Blockly.FieldColour('#00ff00'), 'COLOUR')
        .appendField(',')
        .appendField(new Blockly.FieldTextInput('NAME'), 'FIELDNAME');
    this.setPreviousStatement(true, 'Field');
    this.setNextStatement(true, 'Field');
    this.setTooltip('Colour input field.');
    this.setHelpUrl('https://www.youtube.com/watch?v=s2_xaEvcVI0#t=495');
  },
  onchange: function() {
    fieldNameCheck(this);
  }
};

Blockly.Blocks['field_variable'] = {
  // Dropdown for variables.
  init: function() {
    this.setColour('2EC4B6');
    this.appendDummyInput()
        .appendField('variable')
        .appendField(new Blockly.FieldTextInput('item'), 'TEXT')
        .appendField(',')
        .appendField(new Blockly.FieldTextInput('NAME'), 'FIELDNAME');
    this.setPreviousStatement(true, 'Field');
    this.setNextStatement(true, 'Field');
    this.setTooltip('Dropdown menu for variable names.');
    this.setHelpUrl('https://www.youtube.com/watch?v=s2_xaEvcVI0#t=510');
  },
  onchange: function() {
    fieldNameCheck(this);
  }
};

Blockly.Blocks['field_image'] = {
  // Image.
  init: function() {
    this.setColour('2EC4B6');
    var src = 'https://www.gstatic.com/codesite/ph/images/star_on.gif';
    this.appendDummyInput()
        .appendField('image')
        .appendField(new Blockly.FieldTextInput(src), 'SRC');
    this.appendDummyInput()
        .appendField('width')
        .appendField(new Blockly.FieldNumber('15', 0, NaN, 1), 'WIDTH')
        .appendField('height')
        .appendField(new Blockly.FieldNumber('15', 0, NaN, 1), 'HEIGHT')
        .appendField('alt text')
        .appendField(new Blockly.FieldTextInput('*'), 'ALT');
    this.setPreviousStatement(true, 'Field');
    this.setNextStatement(true, 'Field');
    this.setTooltip('Static image (JPEG, PNG, GIF, SVG, BMP).\n' +
                    'Retains aspect ratio regardless of height and width.\n' +
                    'Alt text is for when collapsed.');
    this.setHelpUrl('https://www.youtube.com/watch?v=s2_xaEvcVI0#t=567');
  }
};

Blockly.Blocks['type_group'] = {
  // Group of types.
  init: function() {
    this.typeCount_ = 2;
    this.updateShape_();
    this.setOutput(true, 'Type');
    this.setMutator(new Blockly.Mutator(['type_group_item']));
    this.setColour('ff628c');
    this.setTooltip('Allows more than one type to be accepted.');
    this.setHelpUrl('https://www.youtube.com/watch?v=s2_xaEvcVI0#t=677');
  },
  mutationToDom: function(workspace) {
    // Create XML to represent a group of types.
    var container = Blockly.utils.xml.createElement('mutation');
    container.setAttribute('types', this.typeCount_);
    return container;
  },
  domToMutation: function(container) {
    // Parse XML to restore the group of types.
    this.typeCount_ = parseInt(container.getAttribute('types'), 10);
    this.updateShape_();
    for (var i = 0; i < this.typeCount_; i++) {
      this.removeInput('TYPE' + i);
    }
    for (var i = 0; i < this.typeCount_; i++) {
      var input = this.appendValueInput('TYPE' + i)
                      .setCheck('Type');
      if (i == 0) {
        input.appendField('any of');
      }
    }
  },
  decompose: function(workspace) {
    // Populate the mutator's dialog with this block's components.
    var containerBlock = workspace.newBlock('type_group_container');
    containerBlock.initSvg();
    var connection = containerBlock.getInput('STACK').connection;
    for (var i = 0; i < this.typeCount_; i++) {
      var typeBlock = workspace.newBlock('type_group_item');
      typeBlock.initSvg();
      connection.connect(typeBlock.previousConnection);
      connection = typeBlock.nextConnection;
    }
    return containerBlock;
  },
  compose: function(containerBlock) {
    // Reconfigure this block based on the mutator dialog's components.
    var typeBlock = containerBlock.getInputTargetBlock('STACK');
    // Count number of inputs.
    var connections = [];
    while (typeBlock) {
      connections.push(typeBlock.valueConnection_);
      typeBlock = typeBlock.nextConnection &&
          typeBlock.nextConnection.targetBlock();
    }
    // Disconnect any children that don't belong.
    for (var i = 0; i < this.typeCount_; i++) {
      var connection = this.getInput('TYPE' + i).connection.targetConnection;
      if (connection && connections.indexOf(connection) == -1) {
        connection.disconnect();
      }
    }
    this.typeCount_ = connections.length;
    this.updateShape_();
    // Reconnect any child blocks.
    for (var i = 0; i < this.typeCount_; i++) {
      Blockly.Mutator.reconnect(connections[i], this, 'TYPE' + i);
    }
  },
  saveConnections: function(containerBlock) {
    // Store a pointer to any connected child blocks.
    var typeBlock = containerBlock.getInputTargetBlock('STACK');
    var i = 0;
    while (typeBlock) {
      var input = this.getInput('TYPE' + i);
      typeBlock.valueConnection_ = input && input.connection.targetConnection;
      i++;
      typeBlock = typeBlock.nextConnection &&
          typeBlock.nextConnection.targetBlock();
    }
  },
  updateShape_: function() {
    // Modify this block to have the correct number of inputs.
    // Add new inputs.
    for (var i = 0; i < this.typeCount_; i++) {
      if (!this.getInput('TYPE' + i)) {
        var input = this.appendValueInput('TYPE' + i);
        if (i == 0) {
          input.appendField('any of');
        }
      }
    }
    // Remove deleted inputs.
    while (this.getInput('TYPE' + i)) {
      this.removeInput('TYPE' + i);
      i++;
    }
  }
};

Blockly.Blocks['type_group_container'] = {
  // Container.
  init: function() {
    this.jsonInit({
      "message0": "add types %1 %2",
      "args0": [
        {"type": "input_dummy"},
        {"type": "input_statement", "name": "STACK"}
      ],
      "colour": 'ff628c',
      "tooltip": "Add, or remove allowed type.",
      "helpUrl": "https://www.youtube.com/watch?v=s2_xaEvcVI0#t=677"
    });
  }
};

Blockly.Blocks['type_group_item'] = {
  // Add type.
  init: function() {
    this.jsonInit({
      "message0": "type",
      "previousStatement": null,
      "nextStatement": null,
      "colour": 'ff628c',
      "tooltip": "Add a new allowed type.",
      "helpUrl": "https://www.youtube.com/watch?v=s2_xaEvcVI0#t=677"
    });
  }
};

Blockly.Blocks['type_null'] = {
  // Null type.
  valueType: null,
  init: function() {
    this.jsonInit({
      "message0": "any",
      "output": "Type",
      "colour": 'ff628c',
      "tooltip": "Any type is allowed.",
      "helpUrl": "https://www.youtube.com/watch?v=s2_xaEvcVI0#t=602"
    });
  }
};

Blockly.Blocks['type_boolean'] = {
  // Boolean type.
  valueType: 'Boolean',
  init: function() {
    this.jsonInit({
      "message0": "Boolean",
      "output": "Type",
      "colour": 'ff628c',
      "tooltip": "Booleans (true/false) are allowed.",
      "helpUrl": "https://www.youtube.com/watch?v=s2_xaEvcVI0#t=602"
    });
  }
};

Blockly.Blocks['type_number'] = {
  // Number type.
  valueType: 'Number',
  init: function() {
    this.jsonInit({
      "message0": "Number",
      "output": "Type",
      "colour": 'ff628c',
      "tooltip": "Numbers (int/float) are allowed.",
      "helpUrl": "https://www.youtube.com/watch?v=s2_xaEvcVI0#t=602"
    });
  }
};

Blockly.Blocks['type_string'] = {
  // String type.
  valueType: 'String',
  init: function() {
    this.jsonInit({
      "message0": "String",
      "output": "Type",
      "colour": 'ff628c',
      "tooltip": "Strings (text) are allowed.",
      "helpUrl": "https://www.youtube.com/watch?v=s2_xaEvcVI0#t=602"
    });
  }
};

Blockly.Blocks['type_list'] = {
  // List type.
  valueType: 'Array',
  init: function() {
    this.jsonInit({
      "message0": "Array",
      "output": "Type",
      "colour": 'ff628c',
      "tooltip": "Arrays (lists) are allowed.",
      "helpUrl": "https://www.youtube.com/watch?v=s2_xaEvcVI0#t=602"
    });
  }
};

Blockly.Blocks['type_other'] = {
  // Other type.
  init: function() {
    this.jsonInit({
      "message0": "other %1",
      "args0": [{"type": "field_input", "name": "TYPE", "text": ""}],
      "output": "Type",
      "colour": 'ff628c',
      "tooltip": "Custom type to allow.",
      "helpUrl": "https://www.youtube.com/watch?v=s2_xaEvcVI0#t=702"
    });
  }
};

/**
 * Check to see if more than one field has this name.
 * Highly inefficient (On^2), but n is small.
 * @param {!Blockly.Block} referenceBlock Block to check.
 */
function fieldNameCheck(referenceBlock) {
  if (!referenceBlock.workspace) {
    // Block has been deleted.
    return;
  }
  var name = referenceBlock.getFieldValue('FIELDNAME').toLowerCase();
  var count = 0;
  var blocks = referenceBlock.workspace.getAllBlocks(false);
  for (var i = 0, block; block = blocks[i]; i++) {
    var otherName = block.getFieldValue('FIELDNAME');
    if (!block.disabled && !block.getInheritedDisabled() &&
        otherName && otherName.toLowerCase() == name) {
      count++;
    }
  }
  var msg = (count > 1) ?
      'There are ' + count + ' field blocks\n with this name.' : null;
  referenceBlock.setWarningText(msg);
}

/**
 * Check to see if more than one input has this name.
 * Highly inefficient (On^2), but n is small.
 * @param {!Blockly.Block} referenceBlock Block to check.
 */
function inputNameCheck(referenceBlock) {
  if (!referenceBlock.workspace) {
    // Block has been deleted.
    return;
  }
  var name = referenceBlock.getFieldValue('INPUTNAME').toLowerCase();
  var count = 0;
  var blocks = referenceBlock.workspace.getAllBlocks(false);
  for (var i = 0, block; block = blocks[i]; i++) {
    var otherName = block.getFieldValue('INPUTNAME');
    if (!block.disabled && !block.getInheritedDisabled() &&
        otherName && otherName.toLowerCase() == name) {
      count++;
    }
  }
  var msg = (count > 1) ?
      'There are ' + count + ' input blocks\n with this name.' : null;
  referenceBlock.setWarningText(msg);
}
