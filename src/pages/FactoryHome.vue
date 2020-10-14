<template lang="pug">
q-page.full-height
  q-splitter#factory-splitter.min-height-inherit.q-pt-appbar(v-model='splitter' reverse :limits='[0, 100]')
    //- Block preview and code editor
    template(v-slot:after)
      .flex.min-height-inherit(style='flex-wrap: nowrap')
        .min-height-inherit.position-relative.workspace-toolbox(v-if='splitter === 100' style='flex: 0 0 auto')
          .q-pa-sm.flex.column.min-height-inherit
            //- @todo make this a component as it's used in workspace too
            q-space
            
            //- View change
            q-list(dense style='flex: 0 0 auto')
              q-item(@click='splitter = 0' clickable)
                q-item-section(avatar)
                  q-icon(:color='splitter === 0 ? "active" : "tertiary"' name='fas fa-window-maximize')
                q-item-section.gt-sm
                  q-item-label.text-tertiary Block view
              q-item(@click='splitter = 50' clickable)
                q-item-section(avatar)
                  q-icon(:color='splitter === 50 ? "active" : "tertiary"' name='fas fa-columns')
                q-item-section.gt-sm
                  q-item-label.text-tertiary Split view
              q-item(@click='splitter = 100' clickable)
                q-item-section(avatar)
                  q-icon(:color='splitter === 100 ? "active" : "tertiary"' name='fas fa-code')
                q-item-section.gt-sm
                  q-item-label.text-tertiary Code view

            q-space

            //- CRUD
            q-list(dense style='flex: 0 0 auto')
              q-item(@click='saveBlock' clickable)
                q-item-section(avatar)
                  q-icon(color='secondary' name='fas fa-save')
                q-item-section.gt-sm
                  q-badge(v-if='isUnsaved' color='negative' floating) Unsaved changes
                  q-item-label.text-secondary Save Block
              q-item.q-mb-lg(@click='showSettings' clickable)
                q-item-section(avatar)
                  q-icon(name='fas fa-cogs')
                q-item-section.gt-sm
                  q-item-label Block Settings
              q-item(@click='dialog.confirmNew = true' clickable)
                q-item-section(avatar)
                  q-icon(color='positive' name='fas fa-file')
                q-item-section.gt-sm
                  q-item-label.text-positive New Block
              q-item(@click='dialog.loadBlock = true' clickable)
                q-item-section(avatar)
                  q-icon(color='positive' name='fas fa-folder-open')
                q-item-section.gt-sm
                  q-item-label.text-positive Load Block
              q-item.q-mb-lg(@click='dialog.remixConfirm = true' clickable)
                q-item-section(avatar)
                  q-icon(color='positive' name='fas fa-copy')
                q-item-section.gt-sm
                  q-item-label.text-positive Remix Block
              q-item(@click='dialog.deleteConfirm = true' clickable)
                q-item-section(avatar)
                  q-icon(color='negative' name='fas fa-trash')
                q-item-section.gt-sm
                  q-item-label.text-negative Delete Block

        .flex.column.min-height-inherit
          #preview(style='flex: 0 1 250px')
          CodeEditor(ref='code' @onCodeChange='onCodeChange' :value='block.code')

    //- Workspace
    template(v-slot:before)
      ColorPicker
      Workspace.fill(ref='workspace' :toolbox='toolbox' :blocks='[]' :options='options' @change='workspaceEventHandler')
        //- View change
        template(v-slot:extraControls)
          q-list(dense style='flex: 0 0 auto')
            q-item(@click='splitter = 0' clickable)
              q-item-section(avatar)
                q-icon(:color='splitter === 0 ? "active" : "tertiary"' name='fas fa-window-maximize')
              q-item-section.gt-sm
                q-item-label.text-tertiary Block view
            q-item(@click='splitter = 50' clickable)
              q-item-section(avatar)
                q-icon(:color='splitter === 50 ? "active" : "tertiary"' name='fas fa-columns')
              q-item-section.gt-sm
                q-item-label.text-tertiary Split view
            q-item(@click='splitter = 100' clickable)
              q-item-section(avatar)
                q-icon(:color='splitter === 100 ? "active" : "tertiary"' name='fas fa-code')
              q-item-section.gt-sm
                q-item-label.text-tertiary Code view

          q-space

        //- CRUD
        q-item(@click='saveBlock' clickable)
          q-item-section(avatar)
            q-icon(color='secondary' name='fas fa-save')
          q-item-section.gt-sm
            q-badge(v-if='isUnsaved' color='negative' floating) Unsaved changes
            q-item-label.text-secondary Save Block
        q-item.q-mb-lg(@click='showSettings' clickable)
          q-item-section(avatar)
            q-icon(name='fas fa-cogs')
          q-item-section.gt-sm
            q-item-label Block Settings
        q-item(@click='dialog.confirmNew = true' clickable)
          q-item-section(avatar)
            q-icon(color='positive' name='fas fa-file')
          q-item-section.gt-sm
            q-item-label.text-positive New Block
        q-item(@click='dialog.loadBlock = true' clickable)
          q-item-section(avatar)
            q-icon(color='positive' name='fas fa-folder-open')
          q-item-section.gt-sm
            q-item-label.text-positive Load Block
        q-item.q-mb-lg(@click='dialog.remixConfirm = true' clickable)
          q-item-section(avatar)
            q-icon(color='positive' name='fas fa-copy')
          q-item-section.gt-sm
            q-item-label.text-positive Remix Block
        q-item(@click='dialog.deleteConfirm = true' clickable)
          q-item-section(avatar)
            q-icon(color='negative' name='fas fa-trash')
          q-item-section.gt-sm
            q-item-label.text-negative Delete Block

  //- Modals
  DialogConfirm(v-model='dialog.confirmNew'
    @accept='createNewBlock'
    icon='fas fa-file'
    title='Create new block?')
      p Are you sure you'd like to create a new block? Any unsaved changes will be lost.

  DialogConfirm(v-model='dialog.remixConfirm'
    @accept='remixBlock'
    icon='fas fa-copy'
    title='Remix this block?')
      p Any unsaved changes to the current block will be lost.
      p Are you sure you'd like to create a copy of this block and open it?

  DialogConfirm(v-model='dialog.editSettings'
    @accept='updateSettings'
    bg='primary'
    icon='fas fa-cogs'
    title='Block Settings'
    accept-label='Update')
      q-input(ref='autofocus' label='Description' color='secondary' v-model='meta._description' type='textarea' filled)

  DialogLoadBlock(v-model='dialog.loadBlock')

  DialogDeleteBlock(v-model='dialog.deleteConfirm' :block='block')
</template>

<script>
import '../assets/blocks/factory'
import Workspace from '../components/Workspace'
import CodeEditor from '../components/CodeEditor'
import ColorPicker from '../components/ColorPicker'
import DialogLoadBlock from '../components/dialog/LoadBlock'
import DialogDeleteBlock from '../components/dialog/DeleteBlock'
import DialogConfirm from '../components/dialog/Confirm'
import Blockly from 'blockly'
import store from 'store'
import {set, throttle} from 'lodash'
import toolbox from '../assets/toolboxes/factory'
import { v4 as uuidv4 } from 'uuid'

/**
 * @todo document
 */
export default {
  name: 'FactoryHome',

  components: {Workspace, CodeEditor, ColorPicker, DialogLoadBlock, DialogConfirm, DialogDeleteBlock},

  computed: {
    /**
     * Returns the data used for saving this view
     * @returns {Object} save data
     */
    saveData () {
      const rootBlock = this.getRootBlock()
      const category = rootBlock ? rootBlock.getFieldValue('category') : 'NONE'
      const name = rootBlock ? rootBlock.getFieldValue('name') : 'Untitled'
      
      return {
        ...this.block,
        description: this.meta.description,
        name,
        category,
        workspace: Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.$refs.workspace.blockly))
      }
    }
  },

  watch: {
    /**
     * Trigger window resize event on splitter change
     */
    splitter: throttle(function () {
      // Resize event
      store.set('splitter', this.splitter)
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      })
    }, 50, {leading: true, trailing: true})
  },

  data () {
    const currentFactory = store.get('currentFactory', {})
    
    return {
      // Whether the workspace is ready or not
      hasLoaded: false,

      // True when autosaved but not manually saved
      isUnsaved: !!store.get('isFactoryUnsaved'),

      // Models for dialogs
      dialog: {
        confirmNew: false,
        deleteConfirm: false,
        loadBlock: false,
        editSettings: false,
        remixConfirm: false
      },

      // Block data
      block: {
        uuid: currentFactory.uuid || uuidv4(),
        // The code generated from the factory
        json: {},
        // User entered code
        code: currentFactory.code || '',
      },

      meta: {
        // What gets saved
        description: currentFactory.description || '',
        // Intermediary step (value inside modal)
        _description: currentFactory.description || ''
      },

      // is the splitter in horizontal or vertical mode
      splitter: store.get('splitter', 50),

      // Contains our block preview
      previewWorkspace: null,
      
      // Blockly options
      // @see https://developers.google.com/blockly/guides/configure/web/configuration_struct
      options: {
        isFactory: true,
        collapse: false
      },

      toolbox
    }
  },

  mounted () {
    set(window, 'app.$factory', this)
    
    // Create workspace
    const currentFactory = store.get('currentFactory', {})
    if (currentFactory.workspace) {
      Blockly.Xml.domToWorkspace(
        Blockly.Xml.textToDom(currentFactory.workspace),
        this.$refs.workspace.blockly
      )
    } else {
      Blockly.Xml.domToWorkspace(
        Blockly.Xml.textToDom('<xml xmlns="https://developers.google.com/blockly/xml"><block type="factory_base" deletable="false" movable="false"></block></xml>'),
        this.$refs.workspace.blockly
      )
    }

    // Set splitter eg for mobile
    if (window.innerWidth < 900 && this.splitter !== 100) {
      this.splitter = 0
    }

    // Listeners
    this.$refs.workspace.blockly.addChangeListener(Blockly.Events.disableOrphans)

    // Autosave with CTRL+S
    this.$mousetrap.bindGlobal('ctrl+s', ev => {
      ev.preventDefault()
      this.saveBlock()
    })
  },

  destroyed () {
    this.$mousetrap.unbind('ctrl+s')
  },

  methods: {
    /**
     * Autosave code to localstorage
     */
    autosave () {
      store.set('currentFactory', this.saveData)
      store.set('isFactoryUnsaved', true)
      this.isUnsaved = true
    },

    /**
     * Saves the block so that it's useable in Studio etc
     */
    saveBlock () {
      const blocks = store.get('blocks', {})
      blocks[this.block.uuid] = this.saveData
      store.set('blocks', blocks)
      this.$store.commit('set', ['blocks', blocks])
      store.set('isFactoryUnsaved', false)
      this.isUnsaved = false

      this.$q.notify({
        type: 'positive',
        message: `Block "${this.saveData.name}" saved`,
        timeout: 2000
      })
    },

    /**
     * Creates a new block
     */
    createNewBlock () {
      this.block.uuid = uuidv4()
      store.remove('currentFactory')
      this.$store.commit('tally', 'reloads')
      this.$store.commit('set', ['lastEvent', {log: 'New block created'}])
    },

    /**
     * Create a clone of a block
     */
    remixBlock () {
      this.block.uuid = uuidv4()
      this.getRootBlock().setFieldValue(this.getRootBlock().getFieldValue('name') + '_remix', 'name')
      this.$forceUpdate()

      this.autosave()
      this.saveBlock()
      
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
     * Handles code editor changes
     */
    onCodeChange (code) {
      this.block.code = code
      this.autosave()
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
          this.onWorkspaceChange()
          this.hasLoaded && this.autosave()
        break;
      }
    },

    /**
     * Slugifies root block name and generates block JSON
     */
    onWorkspaceChange () {
      const rootBlock = this.getRootBlock()
      if (!rootBlock) return

      let blockType = rootBlock.getFieldValue('name').trim().toLowerCase() || ''
      blockType = blockType.replace(/\W/g, '_').replace(/^(\d)/, '_\\1')

      this.block.json = this.formatJson(blockType, rootBlock)
      this.updatePreview()
    },

    /**
     * Return the uneditable container block that everything else attaches to
     * @return {Blockly.Block}
     */
    getRootBlock() {
      const blocks = this.$refs.workspace.blockly.getTopBlocks(false)

      for (var i = 0, block; block = blocks[i]; i++) {
        if (block.type === 'factory_base') {
          return block
        }
      }

      return
    },

    /**
     * Update the language code as JSON
     * 
     * @param {string} blockType Name of block
     * @param {!Blockly.Block} rootBlock Factory_base block
     * @return {string} Generated language code
     */
    formatJson (blockType, rootBlock) {
      const JS = {
        // Not used by Blockly, but may be used by a loader
        type: blockType,
        tooltip: '',
        helpUrl: 'https://midiblocks.com/help/block/' + blockType
      }
      let message = []
      let args = []
      let contentsBlock = rootBlock.getInputTargetBlock('INPUTS')
      let lastInput = null

      // Generate inputs
      while (contentsBlock) {
        if (!contentsBlock.disabled && !contentsBlock.getInheritedDisabled()) {
          let fields = this.getFieldsJson(contentsBlock.getInputTargetBlock('FIELDS'))
          for (let i = 0; i < fields.length; i++) {
            if (typeof fields[i] === 'string') {
              message.push(fields[i].replace(/%/g, '%%'))
            } else {
              args.push(fields[i])
              message.push('%' + args.length)
            }
          }

          // Dummy inputs don't have names
          let input = {type: contentsBlock.type}
          if (contentsBlock.type !== 'input_dummy') {
            input.name = contentsBlock.getFieldValue('INPUTNAME')
          }

          let check = this.getOptTypesFrom(contentsBlock, 'TYPE')
          if (check) {
            input.check = check
          }

          let align = contentsBlock.getFieldValue('ALIGN')
          if (align !== 'LEFT') {
            input.align = align
          }

          args.push(input)
          message.push('%' + args.length)
          lastInput = contentsBlock
        }

        contentsBlock = contentsBlock.nextConnection && contentsBlock.nextConnection.targetBlock()
      }

      // Remove last input if dummy and not empty.
      if (lastInput && lastInput.type === 'input_dummy') {
        let fields = lastInput.getInputTargetBlock('FIELDS')
        if (fields && this.getFieldsJson(fields).join('').trim() !== '') {
          let align = lastInput.getFieldValue('ALIGN')
          if (align !== 'LEFT') {
            JS.lastDummyAlign0 = align
          }
          args.pop()
          message.pop()
        }
      }
      
      JS.message0 = message.join(' ')
      if (args.length) {
        JS.args0 = args
      }
      
      // Generate inline/external switch
      if (rootBlock.getFieldValue('INLINE') === 'EXT') {
        JS.inputsInline = false
      } else if (rootBlock.getFieldValue('INLINE') === 'INT') {
        JS.inputsInline = true
      }

      // Generate output, or next/previous connections
      switch (rootBlock.getFieldValue('CONNECTIONS')) {
        case 'LEFT':
          JS.output = this.getOptTypesFrom(rootBlock, 'OUTPUTTYPE')
        break
        case 'BOTH':
          JS.previousStatement = this.getOptTypesFrom(rootBlock, 'TOPTYPE')
          JS.nextStatement = this.getOptTypesFrom(rootBlock, 'BOTTOMTYPE')
        break
        case 'TOP':
          JS.previousStatement = this.getOptTypesFrom(rootBlock, 'TOPTYPE')
        break
        case 'BOTTOM':
          JS.nextStatement = this.getOptTypesFrom(rootBlock, 'BOTTOMTYPE')
        break
      }

      // Generate block metadata
      let colourBlock = rootBlock.getInputTargetBlock('COLOR')
      if (colourBlock && !colourBlock.disabled) {
        JS.colour = colourBlock.getFieldValue('COLOR')
      }

      return JS
    },

    /**
     * Update the preview display
     */
    updatePreview () {
      // Create a new preview
      this.previewWorkspace && this.previewWorkspace.dispose()

      // Reuse Factory options
      const options = Object.assign({}, this.options)
      options.zoom.controls = false
      options.trashcan = false
      options.toolbox = null
      this.previewWorkspace = Blockly.inject('preview', {media: 'media/', ...options})
      this.previewWorkspace.clear()

      // Exit if nothing to render (eg loading from a store)
      if (!Object.keys(this.block.json)) {
        return
      }

      // Backup Blockly.Blocks object so that main workspace and preview don't
      // collide if user creates a 'factory_base' block, for instance
      const backupBlocks = Blockly.Blocks
      try {
        // Make a shallow copy
        Blockly.Blocks = {}
        for (let prop in backupBlocks) {
          Blockly.Blocks[prop] = backupBlocks[prop]
        }

        const json = this.block.json
        Blockly.Blocks[json.type || 'unnamed'] = {
          init: function() {
            console.log(json)
            this.jsonInit(json)
          }
        }

        // Look for a block on Blockly.Blocks that does not match the backup
        let blockType = null
        for (let type in Blockly.Blocks) {
          if (typeof Blockly.Blocks[type].init === 'function' && Blockly.Blocks[type] !== backupBlocks[type]) {
            blockType = type
            break
          }
        }
        if (!blockType) {
          return
        }

        // Create the preview block
        const previewBlock = this.previewWorkspace.newBlock(blockType)
        previewBlock.initSvg()
        previewBlock.render()
        previewBlock.setMovable(false)
        previewBlock.setDeletable(false)
        previewBlock.moveBy(15, 10)
        this.previewWorkspace.clearUndo()

        this.updateGenerator(previewBlock)
      } finally {
        Blockly.Blocks = backupBlocks
      }
    },

    /**
     * Update the generator code
     * @param {!Blockly.Block} block Rendered block in preview workspace
     */
    updateGenerator (block) {
      let vars = []

      // Generate getters for any fields or inputs
      for (let i = 0, input; input = block.inputList[i]; i++) {
        for (let j = 0, field; field = input.fieldRow[j]; j++) {
          // Inject field variables
          if (!field.name) continue
          if (field instanceof Blockly.FieldVariable) {
            // Subclass of Blockly.FieldDropdown, must test first
            vars.push({
              type: 'field',
              field: 'variable',
              name: field.name
            })
          } else if (field instanceof Blockly.FieldAngle) {
            // Subclass of Blockly.FieldTextInput, must test first
            vars.push({
              type: 'field',
              field: 'angle',
              name: field.name
            })
          } else if (field instanceof Blockly.FieldColour) {
            vars.push({
              type: 'field',
              field: 'color',
              name: field.name
            })
          } else if (field instanceof Blockly.FieldCheckbox) {
            vars.push({
              type: 'field',
              field: 'checkbox',
              name: field.name
            })
          } else if (field instanceof Blockly.FieldDropdown) {
            vars.push({
              type: 'field',
              field: 'dropdown',
              name: field.name
            })
          } else if (field instanceof Blockly.FieldNumber) {
            vars.push({
              type: 'field',
              field: 'number',
              name: field.name
            })
          } else if (field instanceof Blockly.FieldTextInput) {
            vars.push({
              type: 'field',
              field: 'text',
              name: field.name
            })
          }
        }

        // Inject inputs and statements
        if (!input.name) continue
        if (input.type === Blockly.INPUT_VALUE) {
          vars.push({
            type: 'input',
            input: 'value',
            name: input.name
          })
        } else if (input.type === Blockly.NEXT_STATEMENT) {
          vars.push({
            type: 'input',
            input: 'statements',
            name: input.name
          })
        }
      }

      // Inject variables
      this.block.variables = vars
    },

    /**
     * Returns field strings and any config
     * 
     * @param {!Blockly.Block} block Input block
     * @return {!Array.<string|!Object>} Array of static text and field configs
     */
    getFieldsJson (block) {
      let fields = []
      let options = []
      
      while (block) {
        if (!block.disabled && !block.getInheritedDisabled()) {
          switch (block.type) {
            case 'field_static':
              fields.push(block.getFieldValue('TEXT'))
            break

            case 'field_input':
              fields.push({
                type: block.type,
                name: block.getFieldValue('FIELDNAME'),
                text: block.getFieldValue('TEXT')
              })
            break

            case 'field_number':
              let obj = {
                type: block.type,
                name: block.getFieldValue('FIELDNAME'),
                value: Number(block.getFieldValue('VALUE'))
              }

              let min = Number(block.getFieldValue('MIN'))
              if (min > -Infinity) {
                obj.min = min
              }

              let max = Number(block.getFieldValue('MAX'))
              if (max < Infinity) {
                obj.max = max
              }

              let precision = Number(block.getFieldValue('PRECISION'))
              if (precision) {
                obj.precision = precision
              }
              fields.push(obj)
            break

            // case 'field_angle':
            //   fields.push({
            //     type: block.type,
            //     name: block.getFieldValue('FIELDNAME'),
            //     angle: Number(block.getFieldValue('ANGLE'))
            //   })
            // break

            case 'field_checkbox':
              fields.push({
                type: block.type,
                name: block.getFieldValue('FIELDNAME'),
                checked: block.getFieldValue('CHECKED') === 'TRUE'
              })
            break

            // case 'field_colour':
            //   fields.push({
            //     type: block.type,
            //     name: block.getFieldValue('FIELDNAME'),
            //     colour: block.getFieldValue('COLOUR')
            //   })
            // break

            case 'field_variable':
              fields.push({
                type: block.type,
                name: block.getFieldValue('FIELDNAME'),
                variable: block.getFieldValue('TEXT')
              })
            break

            case 'field_dropdown':
              for (let i = 0; i < block.optionCount_; i++) {
                options[i] = [block.getFieldValue('USER' + i), block.getFieldValue('CPU' + i)]
              }

              if (options.length) {
                fields.push({
                  type: block.type,
                  name: block.getFieldValue('FIELDNAME'),
                  options: options
                })
              }
            break

            /**
             * Dynamically generate MIDI device selector options
             */
            case 'field_midi_device_dropdown':
              options = [['MIDI is disabled', 'DISABLED']]

              if (options.length) {
                fields.push({
                  type: block.type,
                  name: block.getFieldValue('FIELDNAME'),
                  options: options
                })
              }
            break

            // case 'field_image':
            //   fields.push({
            //     type: block.type,
            //     src: block.getFieldValue('SRC'),
            //     width: Number(block.getFieldValue('WIDTH')),
            //     height: Number(block.getFieldValue('HEIGHT')),
            //     alt: block.getFieldValue('ALT')
            //   })
            // break
          }
        }

        block = block.nextConnection && block.nextConnection.targetBlock()
      }

      return fields
    },

    /**
     * Fetch the type(s) defined in the given input
     * Format as a string for appending to the generated code
     * 
     * @param {!Blockly.Block} block Block with input
     * @param {string} name Name of the input
     * @return {?string} String defining the types
     */
    getOptTypesFrom (block, name) {
      let types = this.getTypesFrom(block, name)

      if (types.length === 0) {
        return undefined
      } else if (types.indexOf('null') !== -1) {
        return 'null'
      } else if (types.length === 1) {
        return types[0]
      } else {
        return '[' + types.join(', ') + ']'
      }
    },

    /**
     * Fetch the type(s) defined in the given input
     * 
     * @param {!Blockly.Block} block Block with input
     * @param {string} name Name of the input
     * @return {!Array.<string>} List of types
     */
    getTypesFrom(block, name) {
      let typeBlock = block.getInputTargetBlock(name)
      let types

      if (!typeBlock || typeBlock.disabled) {
        types = []
      } else if (typeBlock.type === 'type_other') {
        types = [typeBlock.getFieldValue('TYPE')]
      } else if (typeBlock.type === 'type_group') {
        types = []

        for (let i = 0; i < typeBlock.typeCount_; i++) {
          types = types.concat(this.getTypesFrom(typeBlock, 'TYPE' + i))
        }

        // Remove duplicates
        let hash = Object.create(null)
        for (let n = types.length - 1; n >= 0; n--) {
          if (hash[types[n]]) {
            types.splice(n, 1)
          }
          hash[types[n]] = true
        }
      } else {
        types = [typeBlock.valueType]
      }

      return types
    }
  }
}
</script>

<style lang="sass" scoped>
table
  height: 100%
  width: 100%
</style>

<style lang="sass">
#preview
  display: flex
  flex-direction: column

  .injectionDiv
    flex: 1 !important

    .blocklySvg
      height: 100%
</style>