/**
 * IMPORTANT NOTE
 * This project MUST be ES5 compliant as that is what the JS Interpreter uses
 */

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
  _playNote(JSON.stringify(payload));
}