<template lang="pug">
q-page.full-height
  q-splitter#factory-splitter.min-height-inherit.q-pt-appbar(v-model='splitter' unit='px' reverse)
    template(v-slot:after)
      .flex.column.min-height-inherit
        #preview(style='flex: 0 1 250px')
        CodeEditor(@onCodeChange='onCodeChange' :value='block.code')
    template(v-slot:before)
      ColorPicker
      Workspace.fill(ref='workspace' :toolbox='toolbox' :blocks='[]' :options='options' @change='workspaceEventHandler')
        q-btn.full-width.text-black(color='secondary' icon='fas fa-save' @click='saveBlock')
          span.q-ml-sm Save
</template>

<script>
import '../assets/blocks/factory'
import Workspace from '../components/Workspace'
import CodeEditor from '../components/CodeEditor'
import ColorPicker from '../components/ColorPicker'
import {mapState} from 'vuex'
import Blockly from 'blockly'
import store from 'store'
import {set, throttle} from 'lodash'
import toolbox from '../assets/toolboxes/factory'
import { v4 as uuidv4 } from 'uuid'

export default {
  name: 'FactoryHome',

  components: {Workspace, CodeEditor, ColorPicker},

  computed: {
    /**
     * Returns the data used for saving this view
     * @returns {Object} save data
     */
    saveData () {
      const rootBlock = this.getRootBlock()
      const category = rootBlock ? rootBlock.getFieldValue('category') : 'NONE'
      
      return {
        ...this.block,
        category,
        workspace: Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.$refs.workspace.blockly))
      }
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
    const currentFactory = store.get('currentFactory', {})
    
    return {
      hasLoaded: false,

      // Block data
      block: {
        uuid: currentFactory.uuid || uuidv4(),
        // The code generated from the factory
        json: {},
        // User entered code
        code: currentFactory.code || '',
      },
      
      // is the splitter in horizontal or vertical mode
      splitter: store.get('splitter') || window.innerWidth / 3,

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
    },

    /**
     * Saves the block so that it's useable in Studio etc
     */
    saveBlock () {
      const blocks = store.get('blocks', {})
      blocks[this.block.uuid] = this.saveData
      store.set('blocks', blocks)

      this.$q.notify({
        type: 'positive',
        message: 'Block saved',
        timeout: 2000
      })
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
     * Generates variable code
     */
    makeVar (root, name) {
      name = name.toLowerCase().replace(/\W/g, '_')
      return 'let ' + root + '_' + name
    },

    /**
     * Update the generator code
     * @param {!Blockly.Block} block Rendered block in preview workspace
     */
    updateGenerator (block) {
      let code = []

      // Generate getters for any fields or inputs
      for (let i = 0, input; input = block.inputList[i]; i++) {
        for (let j = 0, field; field = input.fieldRow[j]; j++) {
          // Inject field variables
          if (!field.name) continue
          if (field instanceof Blockly.FieldVariable) {
            // Subclass of Blockly.FieldDropdown, must test first
            code.push(`${this.makeVar('variable', field.name)} = Blockly.JavaScript.variableDB_.getName(block.getFieldValue('${field.name}'), Blockly.Variables.NAME_TYPE)`)
            code.push({
              type: 'variable',
              name: field.name
            })
          } else if (field instanceof Blockly.FieldAngle) {
            // Subclass of Blockly.FieldTextInput, must test first
            code.push(`${this.makeVar('angle', field.name)} = block.getFieldValue('${field.name}')`)
          } else if (field instanceof Blockly.FieldColour) {
            code.push(`${this.makeVar('colour', field.name)} = block.getFieldValue('${field.name}')`)
          } else if (field instanceof Blockly.FieldCheckbox) {
            code.push(`${this.makeVar('checkbox', field.name)} = block.getFieldValue('${field.name}') === 'TRUE'`)
          } else if (field instanceof Blockly.FieldDropdown) {
            code.push(`${this.makeVar('dropdown', field.name)} = block.getFieldValue('${field.name}')`)
          } else if (field instanceof Blockly.FieldNumber) {
            code.push(`${this.makeVar('number', field.name)} = block.getFieldValue('${field.name}')`)
          } else if (field instanceof Blockly.FieldTextInput) {
            code.push(`${this.makeVar('text', field.name)} = block.getFieldValue('${field.name}')`)
          }
        }

        // Inject inputs and statements
        if (!input.name) continue
        if (input.type === Blockly.INPUT_VALUE) {
          code.push(`${this.makeVar('value', input.name)} = Blockly.JavaScript.valueToCode(block, '${input.name}', Blockly.JavaScript.ORDER_ATOMIC)`)
        } else if (input.type === Blockly.NEXT_STATEMENT) {
          code.push(`${this.makeVar('statements', input.name)} = Blockly.JavaScript.statementToCode(block, '${input.name}')`)
        }
      }

      // Inject statements
      // if (block.outputConnection) {
      //   code.push('return [code, Blockly.JavaScript.ORDER_NONE]')
      // } else {
      //   code.push('return code')
      // }

      // Inject variables
      // this.block.code.prefix = code.join('\n')
    },

    /**
     * Returns field strings and any config
     * 
     * @param {!Blockly.Block} block Input block
     * @return {!Array.<string|!Object>} Array of static text and field configs
     */
    getFieldsJson (block) {
      let fields = []
      
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

            case 'field_angle':
              fields.push({
                type: block.type,
                name: block.getFieldValue('FIELDNAME'),
                angle: Number(block.getFieldValue('ANGLE'))
              })
            break

            case 'field_checkbox':
              fields.push({
                type: block.type,
                name: block.getFieldValue('FIELDNAME'),
                checked: block.getFieldValue('CHECKED') === 'TRUE'
              })
            break

            case 'field_colour':
              fields.push({
                type: block.type,
                name: block.getFieldValue('FIELDNAME'),
                colour: block.getFieldValue('COLOUR')
              })
            break

            case 'field_variable':
              fields.push({
                type: block.type,
                name: block.getFieldValue('FIELDNAME'),
                variable: block.getFieldValue('TEXT')
              })
            break

            case 'field_dropdown':
              let options = []
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

            case 'field_image':
              fields.push({
                type: block.type,
                src: block.getFieldValue('SRC'),
                width: Number(block.getFieldValue('WIDTH')),
                height: Number(block.getFieldValue('HEIGHT')),
                alt: block.getFieldValue('ALT')
              })
            break
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