<template lang="pug">
q-page.full-height
  Workspace(ref='workspace' :options='options' :toolbox='toolbox' :blocks='[]' @change='workspaceEventHandler')
</template>

<script>
import {throttle} from 'lodash'
import Workspace from '../components/Workspace'
import store from 'store'
import '../assets/blocks/midi-events'
import '../assets/blocks/midi-args'
import '../assets/blocks/midi-send'
import webmidi from 'webmidi'
import Interpreter from 'js-interpreter'
import Blockly from 'blockly'
import toolbox from '../assets/toolboxes/studio'

export default {
  name: 'MainLayout',

  components: {
    Workspace
  },

  /**
   * Initialize WebMidi
   */
  mounted () {
    webmidi.enable((errors) => {
      const inputs = {}
      const outputs = {}
      
      this.errors.webmidi.enable = errors

      // Map array to object using device.id
      // @note Any new properties must be set below or Vue won't refresh/update
      webmidi.inputs.forEach(input => {
        inputs[input.id] = input
        input.led = false
        input.lastMessage = ''
        this.bindInput(input.id)
      })
      webmidi.outputs.forEach(output => {
        outputs[output.id] = output
      })
      
      this.$store.commit('set', ['devices', {
        inputs,
        outputs
      }])
    })

    // Load workspace
    const currentStudio = store.get('currentStudio', {})
    if (currentStudio.workspace) {
      Blockly.Xml.domToWorkspace(
        Blockly.Xml.textToDom(currentStudio.workspace),
        this.$refs.workspace.blockly
      )
    } else {
      Blockly.Xml.domToWorkspace(
        Blockly.Xml.textToDom('<xml xmlns="https://developers.google.com/blockly/xml"></xml>'),
        this.$refs.workspace.blockly
      )
    }

    // Setup listeners
    this.$root.$on('interpreter.triggerEvent', this.triggerEvent)
    this.$refs.workspace.blockly.addChangeListener(Blockly.Events.disableOrphans)
  },

  watch: {
    /**
     * Resize main splitter
     */
    splitter: throttle(function () {
      store.set('splitter', this.splitter)
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      })
    }, 50, {leading: true, trailing: true})
  },
  
  data () {
    return {
      hasLoaded: false,
      
      errors: {
        webmidi: {
          enable: false
        }
      },
      
      // Blockly options
      // @see https://developers.google.com/blockly/guides/configure/web/configuration_struct
      options: {},
      toolbox: this.getToolbox(),

      // Spliter width in pixels
      splitter: store.get('splitter') || window.innerWidth / 3
    }
  },

  methods: {
    /**
     * Handles Workspace events
     */
    workspaceEventHandler (ev) {
      switch (ev.type) {
        case Blockly.Events.FINISHED_LOADING:
          this.hasLoaded = true
        break
          
        case Blockly.Events.BLOCK_CREATE:
        case Blockly.Events.BLOCK_DELETE:
        case Blockly.Events.BLOCK_CHANGE:
        case Blockly.Events.BLOCK_MOVE:
        case Blockly.Events.VAR_CREATE:
        case Blockly.Events.VAR_DELETE:
        case Blockly.Events.VAR_RENAME:
          this.$refs.workspace.run()
          this.hasLoaded && this.autosave()
        break;
      }
    },

    /**
     * Gets an organized Blockly toolbox JSON, which consists of core blocks and custom blocks
     */
    getToolbox () {
      const coreBlocks = [...toolbox]
      const customBlocks = store.get('blocks', {})

      // Map categories to indexes
      const coreBlockCats = coreBlocks.map(block => {
        return block.category || ''
      })

      // Add custom block to appropriate category
      Object.keys(customBlocks).forEach(id => {
        const block = customBlocks[id]
        const catIndex = coreBlockCats.indexOf(block.category)

        if (coreBlocks[catIndex]) {
          coreBlocks[catIndex].children.push({
            tag: 'block',
            type: block.name
          })

          // Create block
          Blockly.Blocks[block.name] = {
            init: function() {
              this.jsonInit(block.json)
            }
          }
        }
      })

      return coreBlocks
    },

    /**
     * Save states
     */
    autosave () {
      store.set('currentStudio', {
        workspace: Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.$refs.workspace.blockly))
      })
    },

    /**
     * Binds individiual inputs
     */
    bindInput (id) {
      const input = webmidi.getInputById(id)
      const events = [/*'midimessage',*/ 'activesensing', 'channelaftertouch', 'channelmode', 'clock', 'continue', 'controlchange', 'keyaftertouch', 'noteoff', 'noteon', 'nrpn', 'pitchbend', 'programchange', 'reset', 'songposition', 'songselect', 'start', 'stop', 'sysex', 'timecode', 'tuningrequest', 'unknownsystemmessage']

      events.forEach(eventName => {
        input.addListener(eventName, 'all', ev => {
          this.$root.$emit('interpreter.triggerEvent', eventName, ev)
        })
      })

      // Toggle the light indicator
      input.addListener('midimessage', 'all', e => {
        this.$store.commit('set', [`devices.inputs['${e.target.id}'].led`, true])
        setTimeout(() => {
          this.$store.commit('set', [`devices.inputs['${e.target.id}'].led`, false])
        }, 10)
      })
    },

    /**
     * Runs the code (if isPlaying)
     */
    triggerEvent (eventName, ev) {
      // Run the code
      if (this.code) {
        let data = Object.assign({}, ev)
        data.target = Object.assign({}, data.target)
        delete data.target._midiInput
        delete data.target._userHandlers
        delete data.target.lastMessage
        data = JSON.stringify(data)
        
        Interpreter.appendCode(`triggerEvent('${eventName}', '${data}')`)
        Interpreter.run()
      }

      // Update device message
      let midiName
      let midiData
      switch (eventName) {
        case 'noteon':
        case 'noteoff':
          midiName = `[${ev.note.number}, ${ev.note.name}, ${ev.note.octave}]`
          break;

        case 'controlchange':
          midiName = `[${ev.controller.number}, ${ev.controller.name}]`
          break;
      }
      
      this.$store.commit('set', [
        `devices.inputs['${ev.target.id}'].lastMessage`,
        `<div>
          <strong>${eventName}</strong>:
          <span>${midiName}</span>
        </div>
        <div>
          <strong>data</strong>:
          <span>[${ev.data[0]}, ${ev.data[1]}, ${ev.data[2]}]</span>
        </div>`])
    }
  }
}
</script>
