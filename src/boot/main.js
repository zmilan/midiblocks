import Vue from 'vue'
import axios from 'axios'
import MarkdownIt from 'markdown-it'
import pkg from '../../package.json'
import {colors} from 'quasar'
import 'geteventlisteners'
import Vue2TouchEvents from 'vue2-touch-events'

// Prototypes
Vue.prototype.$axios = axios
Vue.prototype.$v = pkg.version
Vue.prototype.$markdown = new MarkdownIt()
Vue.prototype.$log = console.log

// Ignored elements for Blockly
Vue.config.ignoredElements = ['field','block','category','xml','mutation','value','sep']

// Plugins
Vue.use(Vue2TouchEvents)

// Theme
colors.setBrand('menu-item-not-selected', '#a599e9')