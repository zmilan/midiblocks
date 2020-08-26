# MIDIBlocks [![Built on Blockly](https://tinyurl.com/built-on-blockly)](https://github.com/google/blockly)

A programmable MIDI mapper for the web

> 🚨 Note this repo is still a work in progress

---

## WIP

This project is a work in progress. Here's what's done so far:

![](https://midiblocks.com/wp-content/uploads/2020/08/midiblocks-wip-2.jpg)

- Includes the Blockly editor
- Detects MIDI devices

See more by flipping through our [daily devlogs](https://midiblocks.com/dailies)

---

## Browser Support
This project works in all browsers that natively support the [Web MIDI API](https://webaudio.github.io/web-midi-api/). Currently, the following browsers have built-in support:

- Chrome (macOS, GNU/Linux, Android & Windows)
- Opera (macOS, GNU/Linux, Windows)
- Android WebView component (KitKat and above)
- Edge (Windows)

For more info, including on how to support Firefox, Internet Explorer, and Safari see the [WebMidi docs](https://github.com/djipco/webmidi#browser-support)

> Starting with version 77, [Chrome deprecates Web MIDI usage on insecure origins](https://www.chromestatus.com/feature/5138066234671104). This means that, going forward, the page will need to be hosted on a secure origin (e.g. https://, localhost: or file:///) and the user will need to explicitely authorize usage (no matter if sysex is used or not).

---

## Prereqs
- Install [Git](https://git-scm.com/downloads)
- Install [NodeJS LTS (eg 12.x.x)](https://nodejs.org/en/)
- Open command line and install Yarn with: `npm install -g yarn`
- Install Quasar CLI globally with: `yarn global add @quasar/cli`
- Download this repository with: `git clone https://github.com/MIDIBlocks/midiblocks`
- Install dependencies by running `yarn` from the projects root
- Start the app with: `quasar dev`

## Command line scripts
```bash
# Start the app in development mode (hot-code reloading, error reporting, etc.)
npm start

# Build the app for production
quasar build
```

## Dev Notes
- [Customize the configuration](https://quasar.dev/quasar-cli/quasar-conf-js)
