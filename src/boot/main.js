import Vue from 'vue'
import axios from 'axios'
import pkg from '../../package.json'

// Prototypes
Vue.prototype.$axios = axios
Vue.prototype.$v = pkg.version

// Ignored elements for Blockly
Vue.config.ignoredElements = ['field','block','category','xml','mutation','value','sep']