<div align="center">
  <h1><a href="https://midiblocks.com"><img height=80 src="https://midiblocks.com/wp-content/uploads/2020/09/midiblocks-colorized-light.png"></a></h1>
  <h2>A visual MIDI mapping and scripting platform</h2>
  <br>
  <p><a href="https://github.com/google/blockly"><img src="https://tinyurl.com/built-on-blockly"></a></p>
  <h3>🚧 This repo is still in development and not 100% ready 🚧</h3>
</div>

<br>

![](https://midiblocks.com/wp-content/uploads/2020/09/latest-screenshot-scaled.jpg)

## TL:DR;
```bash
git clone https://github.com/midiblocks/midiblocks
cd midiblocks
yarn install
yarn start
# Open browser tab to: http://localhost:8080/
```



# Contents
> - [About](#about)
>   - [Motivation](#motivation)
>   - [Features](#features)
>   - [Milestones](#milestones)
> - [Setup](#setup)
>   - [Prereqs](#prereqs)
>   - [Installing](#installing)
>   - [Browser support](#browser-support)
>   - [Limitations](#limitations)
> - [Dev](#dev)
>   - [Command line scripts](#command-line-scripts)
>   - [Dev Notes](#dev-notes)
> - [API](#api)
>   - [Querystrings](#querystrings)
> - [License](#license)



# About

**Midiblocks is an attempt to simplify MIDI mapping and MIDI scripting to such a degree that it is usable by anyone, even those without coding experience.**

Midiblocks are small programs that are assembled visually using blocks ([powered by Google's Blockly](https://developers.google.com/blockly)). These blocks are triggered based on events like [Browser Events](https://developer.mozilla.org/en-US/docs/Web/Events), [MIDI Events](https://webmidijs.org/docs/v2.5.1/classes/Input.html#events), [Webhooks](https://zapier.com/blog/what-are-webhooks/), and more. For example, here are three stages of a simple midiblock being composed with 3 blocks that together plays an Em chord on an MPK Mini when E4 is played on an APC:

![](https://i.imgur.com/0a0U1HK.png)

You can also create custom blocks using JavaScript that others can use with our [monaco based](https://microsoft.github.io/monaco-editor/) IDE (more info coming soon):

![](https://i.imgur.com/iR58fER.jpg)

Ultimately, the goal is to expose browser based creativity and machine learning libraries like [magenta.js](https://magenta.tensorflow.org/), [ml5.js](https://ml5js.org/), [p5.js](https://p5js.org/), [handsfree.js](https://github.com/handsfreejs/handsfree), and many others to MIDI devices (and beyond) under a single visual language that can be used by anyone on anything.

> 🚧 More info coming soon

## Motivation

> 🚧 More info coming soon

## Features

> 🚧 More info coming soon

## Milestones
- Create a MIDI mapper and scripter that can be used by anyone, even those without prior coding experience
- A "GitHub/NPM for MIDI" that lets you quickly create, import, fork, and share MIDI mappings and scripts
- Create integrations with creativity libraries like [magenta.js](https://magenta.tensorflow.org/), [ml5.js](https://ml5js.org/), [p5.js](https://p5js.org/), and [handsfree.js](https://github.com/handsfreejs/handsfree)



-------------------------------------------------------------------------------



# Setup
## Prereqs
- [Git](https://git-scm.com/downloads)
- [NodeJS LTS (eg 10.x.x or 12.x.x)](https://nodejs.org/en/)
- [Yarn Package Manager](https://yarnpkg.com/), install by running the following from the command line after installing NodeJS: `npm install -g yarn`

## Installing
- Open terminal and clone this repository with: `git clone https://github.com/midiblocks/midiblocks`
- Change into directory with: `cd midiblocks`
- Run `yarn` from the project root to install dependencies
- Run `yarn start` from the project's root to start the app at [localhost:8080](http://localhost:8080)


## Browser Support
This project works in all browsers that natively support the [Web MIDI API](https://webaudio.github.io/web-midi-api/). Currently, the following browsers have built-in support:

- Chrome (macOS, GNU/Linux, Android & Windows)
- Opera (macOS, GNU/Linux, Windows)
- Android WebView component (KitKat and above)
- Edge (Windows)

For more info, including on how to support Firefox, Internet Explorer, and Safari see the [WebMidi docs](https://github.com/djipco/webmidi#browser-support)

> Starting with version 77, [Chrome deprecates Web MIDI usage on insecure origins](https://www.chromestatus.com/feature/5138066234671104). This means that, going forward, the page will need to be hosted on a secure origin (e.g. https://, localhost: or file:///) and the user will need to explicitely authorize usage (no matter if sysex is used or not).



## Limitations

- **Generated code must be in ES5.** We use [JS Interpreter](https://github.com/NeilFraser/JS-Interpreter) to run code in a sandboxed environment which only supports ES5, but we will be providing ES6 support soon!



-------------------------------------------------------------------------------



# Dev


## Command line scripts
```bash
# Start the app in development mode (hot module reloading, error reporting, etc.)
yarn start

# Build the app for production
yarn run build
```

## Dev Notes
- On startup, we check `!!window.app.boot` and either use it to populate the first render if it exists or load from server if it doesn't



-------------------------------------------------------------------------------



# API

## Querystrings

Add the following to your URL to apply the commented effect:

```bash
# Override the api baseurl (useful for testing between enviroments)
?apiDomain=https://example.com
```



-------------------------------------------------------------------------------



# License: [MIT](https://opensource.org/licenses/MIT)

Copyright 2020 midiblocks

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.