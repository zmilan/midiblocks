<div align="center">
  <h1><a href="https://midiblocks.com">midiblocks</a> <a href="https://github.com/google/blockly"><img src="https://tinyurl.com/built-on-blockly"></a></h1>
  <h2>A smart, drag-and-drop, programmable MIDI platform</h2>
  <br>
  <h3>🚧 This repo is still in development and not 100% ready 🚧</h3>
</div>

<br>

![](https://midiblocks.com/wp-content/uploads/2020/09/latest-screenshot-scaled.jpg)

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



## Limitations

- **Generated code must be in ES5.** We use [JS Interpreter](https://github.com/NeilFraser/JS-Interpreter) to run code in a sandboxed environment which only supports ES5, but we will be providing ES6 support soon!



---



# Setup

- Install [Git](https://git-scm.com/downloads)
- Install [NodeJS LTS (eg 12.x.x)](https://nodejs.org/en/)
- Open command line and install [Yarn Package Manager](https://yarnpkg.com/) with: `npm install -g yarn`
- Install [Quasar CLI](https://quasar.dev/quasar-cli/installation) globally with: `npm install -g @quasar/cli`
- Clone this repository into with: `git clone https://github.com/midiblocks/midiblocks`
- `cd` into the project and run `yarn` to install dependencies
- If you'd like, copy `.default.quasar.env.json` into a new file called `.quasar.env.json` (with a leading .) and change values to match your environment
- Run `yarn start` from the project's root to start the app at [localhost:8080](http://localhost:8080)
- If you're using our [WordPress server-theme](https://github.com/midiblocks/wordpress) locally, set the build directory in `.quasar.env.json` to match your sites `/wp-content/themes/my-theme/` and run `yarn build` to build these files into there

### Command line scripts
```bash
# Start the app in development mode (hot module reloading, error reporting, etc.)
yarn start

# Build the app for production
yarn run build
```

## Dev Notes
- On startup, we check `!!window.app.boot` and either use it to populate the first render if it exists or load from server if it doesn't




---



## API
```bash
# Override the api baseurl (useful for testing between enviroments)
?apiDomain=https://example.com
```




---



# License: [MIT](https://opensource.org/licenses/MIT)

Copyright 2020 midiblocks

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.