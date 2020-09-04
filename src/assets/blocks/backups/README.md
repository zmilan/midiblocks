# About this folder

Each of these `.xml` files represents a Block Library can be imported (1) into the "Block Factory" tab (5) of the [Blockly Dev Tools](https://blockly-demo.appspot.com/static/demos/blockfactory/index.html), modified, and exported back here.

[![](https://i.imgur.com/p3OIUUy.jpg)](https://blockly-demo.appspot.com/static/demos/blockfactory/index.html)

Once modified, click on <kbd>Download Block Library</kbd> (2) to download it back into this folder. Then grab the JavaScript (3) code from the **Block Definition** panel (4) and paste them into the same-named file in the parent folder (`/src/blocks/`), replacing the code in the areas marked like:

```js
/**
 * 👇👇👇 DO NOT EDIT BLOCK DEFINITIONS BELOW MANUALLY 👇👇👇
 * - To make changes, import ./backups/midi-events.js into: https://blockly-demo.appspot.com/static/demos/blockfactory/index.html
 * - Make edits there, then click Block Exporter
 * - Select ONLY "Block Definitions" in JavaScript format
 * - Copy paste code below
 */
```

Note that each of these Block Definition .xml files contain multiple blocks each, so remember to click on the Block Library (5) button of the Block Factory to learn more.

To learn how to use the Blockly Dev Tools, see:

[![](https://img.youtube.com/vi/s2_xaEvcVI0/0.jpg)](https://www.youtube.com/watch?v=s2_xaEvcVI0)