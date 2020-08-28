/**
 * IMPORTANT NOTE
 * This project MUST be ES5 compliant as that is what the JS Interpreter uses
 */
$m = function () {}

/**
 * Runs a method when the
 * @param eventName {String} The name of the MIDI event
 * 
 * @see https://webmidijs.org/docs/v2.5.1/classes/Input.html#events
 */
$m.on = function (eventName, cb) {
  cb()
};