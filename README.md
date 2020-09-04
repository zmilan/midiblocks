<div align="center">
  <h1><a href="https://midiblocks.com">midiblocks</a> <a href="https://github.com/google/blockly"><img src="https://tinyurl.com/built-on-blockly"></a></h1>
  <h2>A smart, drag-and-drop, programmable MIDI mapper</h2>
  <br>
  <h3>🚧 coming soon! 🚧</h3>
</div>



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

## WordPress
- Install a vanilla [WordPress](https://wordpress.org/) site (I use [Local by Flywheel](https://localwp.com/) to do this quickly)
- Install [CPT UI](https://wordpress.org/plugins/custom-post-type-ui/) and [Advanced Custom Fields Pro](https://www.advancedcustomfields.com/)
- See [#wordpress-finalization]

## Quasar
- Install [Git](https://git-scm.com/downloads)
- Install [NodeJS LTS (eg 12.x.x)](https://nodejs.org/en/)
- Open command line and install [Yarn Package Manager](https://yarnpkg.com/) with: `npm install -g yarn`
- Install [Quasar CLI](https://quasar.dev/quasar-cli/installation) globally with: `npm install -g @quasar/cli`
- Clone this repository into your `/wp-content/themes/` folder with: `git clone https://github.com/midiblocks/midiblocks-wordpress`
- Install dependencies by running `yarn` from the projects root
- Start the app with: `yarn start`

### Command line scripts
```bash
# Start the app in development mode (hot-code reloading, error reporting, etc.)
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


# WordPress Finalization

The following will also need to be completed on your WordPress site
- Create a menu and add it to the `Main Nav Panel` [menu location](https://midiblocks.local/wp-admin/nav-menus.php)
  - Add [Font Awesome](https://fontawesome.com/icons?d=gallery) classes (`fas fa-home`) and descriptions. You may need to click <kbd>Screen Options</kbd> and enable them to see these options
  - Add at least the following custom links: `/`, `/studio`




---



# License: [MIT](https://opensource.org/licenses/MIT)

Copyright 2020 midiblocks

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.