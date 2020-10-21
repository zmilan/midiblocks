import Vue from 'vue'
import Handsfree from 'handsfree'
import faceClick from './handsfree/faceClick'

// Instantiate
const handsfree = new Handsfree({
  assetsPath: document.location.origin + '/assets/',
  weboji: true
})

// Inject plugins
handsfree.use('faceClick', faceClick)

Vue.prototype.$handsfree = handsfree
