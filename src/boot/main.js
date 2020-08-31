import Vue from 'vue'
import pkg from '../../package.json'

// Ignored elements for Blockly
Vue.config.ignoredElements = ['field','block','category','xml','mutation','value','sep']

/**
 * Center a line of ASCII given some length
 */
const centerText = function (text, lineLength) {
  const padLength = (lineLength + text.length) / 2
  let str = text.padEnd(padLength, ' ')
    .padStart(lineLength, ' ')
  
  return str
}

/**
 * Console message
 * @ss https://ascii.co.uk/art/puzzle
 */
console.log(`,-------.                    .----.
|     __/                  __/    |
|    (_${centerText('🎹 Midiblocks', 18)}(_       |
|    _/${centerText(pkg.version, 19)}_/      |
|   (                    (        |
\`----\`                    \`-------'`)

Vue.prototype.$version = pkg.version