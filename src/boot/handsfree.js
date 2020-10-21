import Vue from 'vue'
import Handsfree from 'handsfree'

const handsfree = new Handsfree({
  assetsPath: document.location.origin + '/assets/',
  weboji: true
})

Vue.prototype.$handsfree = handsfree
