import Vue from 'vue'
import axios from 'axios'
import MarkdownIt from 'markdown-it'
import pkg from '../../package.json'
import {colors} from 'quasar'
import 'geteventlisteners'

// Prototypes
Vue.prototype.$axios = axios
Vue.prototype.$v = pkg.version
Vue.prototype.$markdown = new MarkdownIt()
Vue.prototype.$log = console.log

// Ignored elements for Blockly
Vue.config.ignoredElements = ['field','block','category','xml','mutation','value','sep']

// Theme
colors.setBrand('menu-item-not-selected', '#a599e9')