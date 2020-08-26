import Vue from 'vue'
import pkg from '../../package.json'
import WebMidi from 'webmidi'

// Ignored elements for Blockly
Vue.config.ignoredElements = ['field','block','category','xml','mutation','value','sep']

Vue.prototype.$version = pkg.version
Vue.prototype.$webmidi = WebMidi