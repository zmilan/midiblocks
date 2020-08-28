/**
 * IMPORTANT NOTE
 * This project MUST be ES5 compliant as that is what the JS Interpreter uses
 */
$m = function () {}

/**
 * Events in the form {eventName: [listOfCallbacks]}
 */
$m.events = {}

/**
 * Runs an event by name and with payload
 * @param {String} eventName 
 * @param {*} payload
 */
$m.trigger = function (eventName, payload) {
  $m.events[eventName].forEach(function (event) {
    event(payload)
  })
}

/**
 * Runs a method when the
 * @param eventName {String} The name of the MIDI event
 * 
 * @see https://webmidijs.org/docs/v2.5.1/classes/Input.html#events
 */
$m.on = function (eventName, cb) {
  if (!$m.events[eventName]) {
    $m.events[eventName] = []
  }
  $m.events[eventName].push(cb)
}