/**
* Check to see if more than one field has this name.
* Highly inefficient (On^2), but n is small.
* @param {!Blockly.Block} referenceBlock Block to check.
*/
export default function (referenceBlock) {
  // Block has been deleted.
  if (!referenceBlock.workspace) {
    return
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