<div align="center">
  <h1><a href="https://github.com/midiblocks/midiblocks"><img height=120 src="https://i.imgur.com/R4nxK4o.jpg"></a></h1>
  <h2>A visual, all-in-one MIDI mapping, scripting, and live coding platform for driving highly collaborative MIDI experiences.</h2>
  <br>
  <h3>🚧 This repo is still in development (target date 📅 10/26/20) 🚧</h3>
  <br>
  <p><a href="https://github.com/google/blockly"><img src="https://tinyurl.com/built-on-blockly"></a></p>
</div>

<br>

![](https://i.imgur.com/VnvGtig.jpg)

## TL:DR;
```bash
git clone https://github.com/midiblocks/midiblocks
cd midiblocks
npm install
npm start
# Point your browser to http://localhost:8080
```



# Contents
- [About](#about)
  - [The Studio](#the-studio)
  - [The Factory](#the-factory)
  - [The Library](#the-library)
- [Motivation](#motivation)
<!-- @todo Move these into corresponding about section -->
- [Keyboard shortcuts](#keyboard-shortcuts)
- [Setup](#setup)
  - [Prereqs](#prereqs)
  - [Installing](#installing)
  - [Browser support](#browser-support)
- [Dev](#dev)
  - [Command line scripts](#command-line-scripts)
  - [window.app](#windowapp)
  - [localStorage](#localstorage)
- [License](#license)


# About

**Midiblocks is a visual, all-in-one MIDI mapping, scripting, and live coding platform for driving highly collaborative MIDI experiences.**

Some things Midiblocks can (eventually) help you do:
- Quickly map MIDI to JavaScript variables, functions, and events on any web site or web service
- Use MIDI to drive custom apps with libraries like [magenta.js](https://magenta.tensorflow.org/), [ml5.js](https://ml5js.org/), [p5.js](https://p5js.org/), [handsfree.js](https://github.com/midiblocks/handsfree), and others
- Send MIDI to your native [Digital Audio Workstations (DAWs)](https://en.wikipedia.org/wiki/Digital_audio_workstation#List_of_notable_commercial_DAWs) and apps
- Work on mobile with no internet required
- Work on projects collaboratively

> 🚧 More info coming soon

## The Studio

![](https://i.imgur.com/VnvGtig.jpg)

> 🚧 More info coming soon

## The Factory

![](https://i.imgur.com/NOOzES6.jpg)

> 🚧 More info coming soon

## The Library

![](https://i.imgur.com/7LL7s5h.jpg)

> 🚧 More info coming soon



---




# Motivation

> 🚧 More info coming soon




---




# Keyboard Shortcuts

<table>
  <thead>
    <tr>
      <th>Location</th>
      <th>Shortcut</th>
      <th>Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>Anywhere</td>
      <td><kbd>s</kbd></td>
      <td>Navigate to the Studio</td>
    </tr>
    <tr>
      <td>Anywhere</td>
      <td><kbd>f</kbd></td>
      <td>Navigate to the Factory</td>
    </tr>
    <tr>
      <td>Factory</td>
      <td><kbd>ctrl + s</kbd></td>
      <td>Save the current block</td>
    </tr>
  </tbody>
</table>



-------------------------------------------------------------------------------



# Setup
## Prereqs
- [Git](https://git-scm.com/downloads)
- [NodeJS LTS (eg 12.x.x)](https://nodejs.org/en/)

## Installing
- Open terminal and clone this repository with: `git clone https://github.com/midiblocks/midiblocks`
- Change into directory with: `cd midiblocks`
- Run `npm install` from the project root to install dependencies (> 250Mb)
- Run `npm start` from the project's root to start the app at [localhost:8080](http://localhost:8080)

## Browser Support
This project works in all browsers that natively support the [Web MIDI API](https://webaudio.github.io/web-midi-api/). Currently, the following browsers have built-in support:

- Chrome (macOS, GNU/Linux, Android & Windows)
- Opera (macOS, GNU/Linux, Windows)
- Android WebView component (KitKat and above)
- Edge (Windows)

For more info, including on how to support Firefox, Internet Explorer, and Safari see the [WebMidi docs](https://github.com/djipco/webmidi#browser-support)

> Starting with version 77, [Chrome deprecates Web MIDI usage on insecure origins](https://www.chromestatus.com/feature/5138066234671104). This means that, going forward, the page will need to be hosted on a secure origin (e.g. https://, localhost: or file:///) and the user will need to authorize usage (no matter if sysex is used or not). [Firebase](https://firebase.google.com/products/hosting), [Netflify](https://www.netlify.com/), Github, and others provide free hosting.



-------------------------------------------------------------------------------



# Dev


## Command line scripts
```bash
# DEVELOPMENT 
# -----------
# Start the app in development mode with localStorage
npm start

# PRODUCTION
# ----------
# Build the app for production with localStorage
npm run build

# DEPLOY
# ----------
# Push the app to firebase. Must have:
# - Firebase Tools: npm i -g firebase-tools
# - Initialized with: firebase init
npm run deploy
```

## `window.app`
The following is available through your browser's dev console:

```js
window.app = {
  $,        // Main Vue instance
  $studio,  // The Studio component (only present when on that route)
  $factory  // The Factory component (only present when on that route)
}
```

> 🚧 More info coming soon

## localStorage
The following is available inside `localStorage`:

```js
{
  blocks: [],           // All loaded Factory Blocks
  midiblocks: [],       // All loaded Studio Midiblocks
  currentFactory: {},   // The Factory's last state (autosave)
  currentStudio: {},    // The Studio's last state (autosave)
  splitter: 50
}
```

> 🚧 More info coming soon



-------------------------------------------------------------------------------





# License: [MIT](https://opensource.org/licenses/MIT)

Copyright 2020 midiblocks

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.