<template lang="pug">
q-page.full-height
  Workspace(ref='workspace' :options='options' :toolbox='toolbox' :blocks='[]' @change='workspaceEventHandler')
    q-item.q-mb-lg(@click='saveBlock' clickable)
      q-item-section(avatar)
        q-icon(color='secondary' name='fas fa-save')
      q-item-section.gt-sm
        q-badge(v-if='isUnsaved' color='negative' floating) Unsaved changes
        q-item-label.text-secondary Save Midiblock
    q-item(@click='dialog.confirmNew = true' clickable)
      q-item-section(avatar)
        q-icon(color='positive' name='fas fa-file')
      q-item-section.gt-sm
        q-item-label.text-positive New Midiblock
    q-item.q-mb-lg(@click='dialog.loadBlock = true' clickable)
      q-item-section(avatar)
        q-icon(color='positive' name='fas fa-folder-open')
      q-item-section.gt-sm
        q-item-label.text-positive Load Midiblock
    q-item(@click='dialog.deleteConfirm = true' clickable)
      q-item-section(avatar)
        q-icon(color='negative' name='fas fa-trash')
      q-item-section.gt-sm
        q-item-label.text-negative Delete Midiblock

  //- Dialogs
  DialogConfirm(v-model='dialog.confirmNew'
    @accept='createNewBlock'
    icon='fas fa-file'
    title='Create new Midiblock?')
      p Are you sure you'd like to create a new Midiblock? Any unsaved changes will be lost.

  DialogConfirm(v-model='dialog.deleteConfirm'
    @accept='deleteBlock'
    bg='negative'
    icon='fas fa-trash'
    title='Delete midiblock?')
      p Are you sure you want to delete this midiblock? This cannot be undone!
      
  DialogLoadBlock(v-model='dialog.loadBlock')
</template>

<script>
import {throttle, cloneDeep, set} from 'lodash'
import Workspace from '../components/Workspace'
import DialogConfirm from '../components/DialogConfirm'
import DialogLoadBlock from '../components/DialogLoadBlock'
import store from 'store'
import webmidi from 'webmidi'
import Blockly from 'blockly'
import toolbox from '../assets/toolboxes/studio'
import { v4 as uuidv4 } from 'uuid'

/**
 * @todo document
 */
export default {
  name: 'MainLayout',

  components: {Workspace, DialogConfirm, DialogLoadBlock},

  computed: {
    /**
     * Returns the data used for saving this view
     * @returns {Object} save data
     */
    saveData () {
      return {
        ...this.block,
        workspace: Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.$refs.workspace.blockly))
      }
    }
  },

  /**
   * Initialize WebMidi
   */
  mounted () {
    set(window, 'app.$studio', this)

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
    const currentStudio = store.get('currentStudio', {})

    return {
      // Whether the autosave has been saved to a midiblock or not
      isUnsaved: store.get('isStudioUnsaved'),
      
      hasLoaded: false,
      
      errors: {
        webmidi: {
          enable: false
        }
      },

      block: {
        uuid: currentStudio.uuid || uuidv4()
      },

      // Models for dialogs
      dialog: {
        confirmNew: false,
        deleteConfirm: false,
        loadBlock: false
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
     * Save states
     */
    autosave () {
      store.set('currentStudio', this.saveData)
      store.set('isStudioUnsaved', true)
      this.isUnsaved = true
    },

    /**
     * Save the midiblock
     */
    saveBlock () {
      const midiblocks = store.get('midiblocks', {})
      midiblocks[this.block.uuid] = this.saveData
      store.set('midiblocks', midiblocks)
      store.set('isStudioUnsaved', false)
      this.isUnsaved = false

      this.$q.notify({
        type: 'positive',
        message: 'Midiblock saved',
        timeout: 2000
      })
    },

    /**
     * Creates a new midiblock
     */
    createNewBlock () {
      store.remove('currentStudio')
      this.$store.commit('tally', 'reloads')
    },
    
    /**
     * Deletes the midiblock
     */
    deleteBlock () {
      let midiblocks = store.get('midiblocks')
      delete midiblocks[this.block.uuid]
      store.set('midiblocks', midiblocks)

      this.$q.notify({
        type: 'positive',
        message: 'Midiblock deleted',
        timeout: 2000
      })
      this.createNewBlock()
    },
    
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
      const categories = cloneDeep(toolbox)
      const customBlocks = store.get('blocks', {})

      // Map categories to indexes
      const coreBlockCats = categories.map(block => {
        return block.category || ''
      })

      // Add custom block to appropriate category
      Object.keys(customBlocks).forEach(id => {
        const customBlock = customBlocks[id]
        const catIndex = coreBlockCats.indexOf(customBlock.category)

        if (categories[catIndex]) {
          categories[catIndex].children.push({
            tag: 'block',
            type: customBlock.json.type
          })

          // Create block...
          Blockly.Blocks[customBlock.json.type] = {
            init: function() {
              this.jsonInit(customBlock.json)
            }
          }
          // ...and generator
          Blockly.JavaScript[customBlock.json.type] = function (block) {
            let code = []

            customBlock.variables.forEach(variable => {
              // Fields
              if (variable.type === 'field') {
                switch (variable.field) {
                  case 'variable':
                    code.push(`var $${variable.name} = ${JSON.stringify(Blockly.JavaScript.variableDB_.getName(block.getFieldValue(variable.name), Blockly.Variables.NAME_TYPE))}`)
                  break
                  case 'angle':
                    code.push(`var $${variable.name} = ${block.getFieldValue(variable.name)}`)
                  break
                  case 'colour':
                    code.push(`var $${variable.name} = ${JSON.stringify(block.getFieldValue(variable.name))}`)
                  break
                  case 'checkbox':
                    code.push(`var $${variable.name} = ${block.getFieldValue(variable.name) === 'TRUE' ? 'true' : 'false'}`)
                  break
                  case 'dropdown':
                    code.push(`var $${variable.name} = ${JSON.stringify(block.getFieldValue(variable.name))}`)
                  break
                  case 'number':
                    code.push(`var $${variable.name} = ${block.getFieldValue(variable.name)}`)
                  break
                  case 'text':
                    code.push(`var $${variable.name} = ${JSON.stringify(block.getFieldValue(variable.name))}`)
                  break
                }
              // Inputs
              } else {
                switch (variable.input) {
                  case 'value':
                    code.push(`var $${variable.name} = ${JSON.stringify(Blockly.JavaScript.valueToCode(block, variable.name, Blockly.JavaScript.ORDER_ATOMIC))}`)
                  break
                  case 'statements':
                    const statement = Blockly.JavaScript.statementToCode(block, variable.name)
                    code.push(`var $${variable.name} = function () {\n${statement}\n}`)
                  break
                }
              }
            })
            
            code = code.join(';\n')
            code += ';\n' + (customBlock.code || '')

            // Return code
            if (block.outputConnection) {
              return [code, Blockly.JavaScript.ORDER_NONE]
            } else {
              return code
            }
          }
        }
      })

      return categories
    },

    /**
     * Binds individiual inputs
     */
    bindInput (id) {
      const input = webmidi.getInputById(id)
      const events = [/*'midimessage',*/ 'activesensing', 'channelaftertouch', 'channelmode', 'clock', 'continue', 'controlchange', 'keyaftertouch', 'noteoff', 'noteon', 'nrpn', 'pitchbend', 'programchange', 'reset', 'songposition', 'songselect', 'start', 'stop', 'sysex', 'timecode', 'tuningrequest', 'unknownsystemmessage']

      events.forEach(eventName => {
        input.addListener(eventName, 'all', ev => {
          this.triggerEvent(eventName, ev)
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
      let data = Object.assign({}, ev)
      data.target = Object.assign({}, data.target)
      delete data.target._midiInput
      delete data.target._userHandlers
      delete data.target.lastMessage
      data = JSON.stringify(data)
      
      this.$refs.workspace.interpreter.appendCode(`triggerEvent('${eventName}', '${data}')`)
      this.$refs.workspace.interpreter.run()

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
