import Vue from 'vue'
import Mousetrap from 'mousetrap'

/**
 * The following was adapted from /node_modules/mousetrap/plugins/global-bind.js
 * because it's not a module
 */
const _globalCallbacks = {}
const _originalStopCallback = Mousetrap.prototype.stopCallback

Mousetrap.prototype.stopCallback = function(e, element, combo, sequence) {
  const self = this

  if (self.paused) {
    return true
  }

  if (_globalCallbacks[combo] || _globalCallbacks[sequence]) {
    return false
  }

  return _originalStopCallback.call(self, e, element, combo)
}

Mousetrap.prototype.bindGlobal = function(keys, callback, action) {
  const self = this
  self.bind(keys, callback, action)

  if (keys instanceof Array) {
    for (var i = 0; i < keys.length; i++) {
      _globalCallbacks[keys[i]] = true
    }
    return
  }

  _globalCallbacks[keys] = true
}

Mousetrap.init()

Vue.prototype.$mousetrap = Mousetrap