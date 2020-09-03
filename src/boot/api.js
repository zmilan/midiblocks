/**
 * Configure the API
 * @todo This should be done through env variables
 */
import Vue from 'vue'

if (process.env.DEV) {
  Vue.prototype.$api = {
    domain: 'http://midiblocks.local/'
  }
} else {
  Vue.prototype.$api = {
    domain: 'https://midiblocks.com/'
  }
}

Vue.prototype.$api.base = Vue.prototype.$api.domain + 'wp-json/midiblocks/'