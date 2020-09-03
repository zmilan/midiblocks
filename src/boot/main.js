import Vue from 'vue'
import axios from 'axios'
import pkg from '../../package.json'

Vue.prototype.$axios = axios
Vue.prototype.$v = pkg.version