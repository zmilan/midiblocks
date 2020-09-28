/**
 * Simple tests
 */
hasNumber = /\d/
 
/**
 * Stores events being listened to
 * {eventName: [...callbacks]}
 */
_events = {}

/**
 * console.log helper to properly send data to main app w/o obfuscation
 */
console = {
  log: function (arguments) {
    log(JSON.stringify(arguments))
  }
}

/**
 * target.addEventListener subsitution
 * @param {String} eventName The eventName to store this callback under
 * @param {Array} args The list of arguments
 * @param {Function} callback The function to call when this event is triggered
 */
addEventListener = function (eventName, args, callback) {
  if (!_events[eventName]) {
    _events[eventName] = []
  }

  _events[eventName].push({
    args: args,
    callback: callback
  })
}

/**
 * Trigger an event
 * @param {String} eventName 
 * @param {*} payload
 */
triggerEvent = function (eventName, payload) {
  _events[eventName] && _events[eventName].forEach(function (event) {
    event.callback({
      args: event.args,
      payload: JSON.parse(payload)
    })
  })
}

/**
 * Plays a note
 */
playNote = function (payload) {
  _playNote(JSON.stringify(payload))
}

/**
 * Compre helper for working with "is", "is not", etc
 */
compare = function (a, compare, b) {
  switch (compare) {
    case 'is':
      return a == b
    case 'is not':
      return a != b
  }
}

/**
 * Checks if a string belongs to the "is any" family ("all", "any", etc)
 */
isAny = function (str) {
  var list = ['any', 'all']
  var isValid = false

  list.forEach(function (item) {
    if (str === item) isValid = true
  });

  return isValid
}

/**
 * Checks if a given note matches a webmidi.name
 * - If no octave present, then matches the key in any octave
 */
isNote = function (a, compare, b) {
  switch (compare) {
    case 'is':
      if (hasNumber.test()) {
        return a == b.name.concat(b.octave)
      } else {
        return a == b.name
      }

    case 'is not':
      if (hasNumber.test()) {
        return a != b.name.concat(b.octave)
      } else {
        return a != b.name
      }
  }
}