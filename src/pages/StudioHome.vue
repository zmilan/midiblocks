<template lang="pug">
q-page.full-height
  Workspace(ref='workspace' :options='options' :toolbox='toolbox' :blocks='[]' @change='workspaceEventHandler')
    q-item(@click='saveMidiblock' clickable)
      q-item-section(avatar)
        q-icon(color='secondary' name='fas fa-save')
      q-item-section.gt-sm
        q-badge(v-if='isUnsaved' color='negative' floating) Unsaved changes
        q-item-label.text-secondary Save Midiblock
    q-item.q-mb-lg(@click='showSettings' clickable)
      q-item-section(avatar)
        q-icon(name='fas fa-cogs')
      q-item-section.gt-sm
        q-item-label Midiblock Settings
    q-item(@click='dialog.confirmNew = true' clickable)
      q-item-section(avatar)
        q-icon(color='positive' name='fas fa-file')
      q-item-section.gt-sm
        q-item-label.text-positive New Midiblock
    q-item(@click='dialog.loadBlock = true' clickable)
      q-item-section(avatar)
        q-icon(color='positive' name='fas fa-folder-open')
      q-item-section.gt-sm
        q-item-label.text-positive Load Midiblock
    q-item.q-mb-lg(@click='dialog.remixConfirm = true' clickable)
      q-item-section(avatar)
        q-icon(color='positive' name='fas fa-copy')
      q-item-section.gt-sm
        q-item-label.text-positive Remix Midiblock
    q-item(@click='dialog.deleteConfirm = true' clickable)
      q-item-section(avatar)
        q-icon(color='negative' name='fas fa-trash')
      q-item-section.gt-sm
        q-item-label.text-negative Delete Midiblock

  //- Dialogs
  DialogConfirm(v-model='dialog.confirmNew'
    @accept='createNewMidiblock'
    icon='fas fa-file'
    title='Create new Midiblock?')
      p Are you sure you'd like to create a new Midiblock? Any unsaved changes will be lost.

  DialogConfirm(v-model='dialog.remixConfirm'
    @accept='remixMidiblock'
    icon='fas fa-copy'
    title='Remix this midiblock?')
      p Any unsaved changes to the current midiblock will be lost.
      p Are you sure you'd like to create a copy of this midiblock and open it?

  DialogConfirm(v-model='dialog.editSettings'
    @accept='updateSettings'
    bg='primary'
    icon='fas fa-cogs'
    title='Midiblock Settings'
    accept-label='Update')
      q-input.q-mb-md(ref='autofocus' label='Title' color='secondary' v-model='meta._title' filled)
      q-input(label='Description' color='secondary' v-model='meta._description' type='textarea' filled)
      
  DialogLoadMidiblock(v-model='dialog.loadBlock')

  DialogDeleteMidiblock(v-model='dialog.deleteConfirm' :midiblock='block')
</template>

<script>
import {throttle, cloneDeep, set, sortBy} from 'lodash'
import {mapState} from 'vuex'
import Workspace from '../components/Workspace'
import DialogLoadMidiblock from '../components/dialog/LoadMidiblock'
import DialogDeleteMidiblock from '../components/dialog/DeleteMidiblock'
import DialogConfirm from '../components/dialog/Confirm'
import store from 'store'
import webmidi from 'webmidi'
import Blockly from 'blockly'
import toolbox from '../assets/toolboxes/studio'
import {v4 as uuidv4} from 'uuid'

/**
 * @todo document
 */
export default {
  name: 'MainLayout',

  components: {Workspace, DialogConfirm, DialogLoadMidiblock, DialogDeleteMidiblock},

  computed: {
    /**
     * Returns the data used for saving this view
     * @returns {Object} save data
     */
    saveData () {
      return {
        title: this.meta.title,
        description: this.meta.description,
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
    this.checkBookmarks()

    // Setup listeners
    this.$refs.workspace.blockly.addChangeListener(Blockly.Events.disableOrphans)
    this.$root.$on('studio.prevBookmark', this.prevBookmark)
    this.$root.$on('studio.nextBookmark', this.nextBookmark)
    for (let i = 0; i < 10; i++) {
      this.$mousetrap.bind(i.toString(), this.onNumberKeypress)
    }

    // Autosave with CTRL+S
    this.$mousetrap.bindGlobal('ctrl+s', ev => {
      ev.preventDefault()
      this.saveMidiblock()
    })
  },

  destroyed () {
    this.$mousetrap.unbind('ctrl+s')
    this.$root.$off('studio.prevBookmark', this.prevBookmark)
    this.$root.$off('studio.nextBookmark', this.nextBookmark)
    for (let i = 0; i < 10; i++) {
      this.$mousetrap.unbind(i.toString())
    }
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

      // Current bookmark index
      currentBookmark: -1,

      block: {
        uuid: currentStudio.uuid || uuidv4()
      },

      meta: {
        // What gets saved
        title: currentStudio.title || 'Untitled',
        // Intermediary step (value inside modal)
        _title: currentStudio.title || 'Untitled',
        
        description: currentStudio.description || '',
        _description: currentStudio.description || ''
      },

      // Models for dialogs
      dialog: {
        confirmNew: false,
        deleteConfirm: false,
        editSettings: false,
        loadBlock: false,
        remixConfirm: false
      },
      
      // Blockly options
      // @see https://developers.google.com/blockly/guides/configure/web/configuration_struct
      options: {},
      toolbox: this.getToolbox(),

      // Spliter width in pixels
      splitter: store.get('splitter', window.innerWidth / 3)
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
    saveMidiblock () {
      const midiblocks = store.get('midiblocks', {})
      midiblocks[this.block.uuid] = this.saveData
      store.set('midiblocks', midiblocks)
      store.set('isStudioUnsaved', false)
      this.$store.commit('set', ['midiblocks', midiblocks])
      this.isUnsaved = false

      this.$q.notify({
        type: 'positive',
        message: `Midiblock "${midiblocks[this.block.uuid].title}" saved`,
        timeout: 2000
      })
    },

    /**
     * Creates a new midiblock
     */
    createNewMidiblock () {
      this.block.uuid = uuidv4()
      store.remove('currentStudio')
      this.$store.commit('tally', 'reloads')
      this.$store.commit('set', ['lastEvent', {log: 'New midiblock created'}])
    },

    /**
     * Create a clone of a midiblock
     */
    remixMidiblock () {
      this.block.uuid = uuidv4()
      this.meta.title += ' [Remixed]'

      this.autosave()
      this.saveMidiblock()
      
      this.$store.commit('tally', 'reloads')
    },

    /**
     * Shows settings modal, reset its fields, focus element
     */
    showSettings () {
      this.meta._title = this.meta.title
      this.meta._description = this.meta.description
      this.dialog.editSettings = true
    },

    /**
     * Save and apply settings
     */
    updateSettings () {
      this.meta.title = this.meta._title
      this.meta.description = this.meta._description
      this.autosave()
    },

    /**
     * Go to next bookmark
     */
    nextBookmark () {
      const bookmarks = this.getSortedBookmarks()
      
      // Wrap value
      let index = this.currentBookmark + 1
      if (index > bookmarks.length - 1) index = 0
      this.currentBookmark = index
      
      this.$refs.workspace.blockly.centerOnBlock(bookmarks[this.currentBookmark].id)
    },

    /**
     * Go to previous bookmark
     */
    prevBookmark () {
      const bookmarks = this.getSortedBookmarks()
      
      // Wrap value
      let index = this.currentBookmark - 1
      if (index < 0) index = bookmarks.length - 1
      this.currentBookmark = index
      
      this.$refs.workspace.blockly.centerOnBlock(bookmarks[this.currentBookmark].id)
    },

    /**
     * Navigates to the bookmark if it exists
     * @param {Event} ev
     */
    onNumberKeypress (ev) {
      const bookmarks = this.getSortedBookmarks()
      const key = +ev.key || 10
      
      if (key <= bookmarks.length) {
        this.$refs.workspace.blockly.centerOnBlock(bookmarks[key - 1].id)
        this.currentBookmark = key - 1
      }
    },

    /**
     * Returns a list of bookmarks, sorted by their $index
     * @return {Array} Sorted list of bookmark blocks
     */
    getSortedBookmarks () {
      return sortBy(this.$refs.workspace.blockly.getBlocksByType('bookmark'), [bookmark => bookmark.getFieldValue('index')])
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
          this.checkBookmarks()
          this.hasLoaded && this.autosave()
        break
      }
    },

    /**
     * Checks if there are bookmarks and toggles the pagers
     */
    checkBookmarks () {
      const bookmarks = this.$refs.workspace.blockly.getBlocksByType('bookmark')
      this.$store.commit('set', ['studio.hasBookmarks', !!bookmarks.length])
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
