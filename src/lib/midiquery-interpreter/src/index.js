/**
 * IMPORTANT NOTE
 * This project MUST be ES5 compliant as that is what the JS Interpreter uses
 */

console = {
  log: function (arguments) {
    log(JSON.stringify(arguments))
  }
}
 
/**
 * Accepts a selector, in the form:  
 */
$m = function (event, callback) {
  var selector = event.split(' ')
  var eventName = selector[0]
  var note = selector[1]
  var data = selector[2]

  // Listen to a generic event
  if (selector.length === 1) {
    $m.on(eventName, callback)
  }

  return $m
}

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
  $m.events[eventName] && $m.events[eventName].forEach(function (event) {
    event.name = eventName
    event(event, JSON.parse(payload))
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