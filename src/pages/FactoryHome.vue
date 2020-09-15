<template lang="pug">
q-page.full-height
  q-splitter#factory-splitter.min-height-inherit.q-pt-appbar(v-model='splitter' unit='px' reverse)
    template(v-slot:after)
      .flex.column.min-height-inherit
        #preview(style='flex: 0 1 250px')
        CodeEditor(@onCodeChange='onCodeChange' :value='code')
    template(v-slot:before)
      Workspace.fill(ref='workspace' :toolbox='toolbox' :blocks='[]' :options='options' @change='workspaceEventHandler')

  //- @TODO remove these depdendencys
  .hidden
    select#direction
      option(value='ltr') LTR
      option(value='rtl') RTL
    button#linkButton
    button#helpButton
      span Help
    select#format
      option(value='JSON') JSON
      option(value='JavaScript') JavaScript
      option(value='Manual') Manual edit&mldr;
    pre#languagePre.prettyprint.lang-js
    textarea#languageTA
    select#language
      option(value='JavaScript') JavaScript
      option(value='Python') Python
      option(value='PHP') PHP
      option(value='Lua') Lua
      option(value='Dart') Dart
    pre#generatorPre
</template>

<script>
import '../assets/blocks/factory'
import Workspace from '../components/Workspace'
import CodeEditor from '../components/CodeEditor'
import {mapState} from 'vuex'
import Blockly from 'blockly'
import store from 'store'
import {set, throttle} from 'lodash'
import toolbox from '../assets/toolboxes/factory'

export default {
  name: 'PageCodeHome',

  components: {Workspace, CodeEditor},

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
      
      code: currentFactory.code || '',
      
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
    
    // Load workspace
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

    this.$refs.workspace.blockly.addChangeListener(Blockly.Events.disableOrphans)
  },

  methods: {
    /**
     * Autosave code to localstorage
     */
    autosave () {
      store.set('currentFactory', {
        code: this.code,
        workspace: Blockly.Xml.domToText(Blockly.Xml.workspaceToDom(this.$refs.workspace.blockly))
      })
    },

    /**
     * Handles code editor changes
     */
    onCodeChange (code) {
      this.code = code
      this.autosave()
    },

    /**
     * Handles Workspace events
     */
    workspaceEventHandler (ev) {
      // @todo Move this logic into Workspace component
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
     * Update the language code based on constructs made in Blockly.
     */
    onWorkspaceChange () {
      const rootBlock = this.getRootBlock()

      if (!rootBlock) {
        return
      }

      let blockType = rootBlock.getFieldValue('NAME').trim().toLowerCase()
      if (!blockType) {
        blockType = ''
      }
      blockType = blockType.replace(/\W/g, '_').replace(/^(\d)/, '_\\1')

      this.injectCode(this.formatJson(blockType, rootBlock), 'languagePre')
      this.updatePreview()
    },

    /**
     * Return the uneditable container block that everything else attaches to.
     * @return {Blockly.Block}
     */
    getRootBlock() {
      const blocks = this.$refs.workspace.blockly.getTopBlocks(false)

      for (var i = 0, block; block = blocks[i]; i++) {
        if (block.type == 'factory_base') {
          return block
        }
      }

      return
    },

    /**
     * Update the language code as JSON.
     * @param {string} blockType Name of block.
     * @param {!Blockly.Block} rootBlock Factory_base block.
     * @return {string} Generated language code.
     * @private
     */
    formatJson (blockType, rootBlock) {
      var JS = {}
      // Type is not used by Blockly, but may be used by a loader.
      JS.type = blockType
      // Generate inputs.
      var message = []
      var args = []
      var contentsBlock = rootBlock.getInputTargetBlock('INPUTS')
      var lastInput = null
      while (contentsBlock) {
        if (!contentsBlock.disabled && !contentsBlock.getInheritedDisabled()) {
          var fields = this.getFieldsJson(contentsBlock.getInputTargetBlock('FIELDS'))
          for (var i = 0; i < fields.length; i++) {
            if (typeof fields[i] == 'string') {
              message.push(fields[i].replace(/%/g, '%%'))
            } else {
              args.push(fields[i])
              message.push('%' + args.length)
            }
          }

          var input = {type: contentsBlock.type}
          // Dummy inputs don't have names.  Other inputs do.
          if (contentsBlock.type != 'input_dummy') {
            input.name = contentsBlock.getFieldValue('INPUTNAME')
          }
          var check = JSON.parse(this.getOptTypesFrom(contentsBlock, 'TYPE') || 'null')
          if (check) {
            input.check = check
          }
          var align = contentsBlock.getFieldValue('ALIGN')
          if (align != 'LEFT') {
            input.align = align
          }
          args.push(input)
          message.push('%' + args.length)
          lastInput = contentsBlock
        }
        contentsBlock = contentsBlock.nextConnection &&
            contentsBlock.nextConnection.targetBlock()
      }
      // Remove last input if dummy and not empty.
      if (lastInput && lastInput.type == 'input_dummy') {
        var fields = lastInput.getInputTargetBlock('FIELDS')
        if (fields && this.getFieldsJson(fields).join('').trim() != '') {
          var align = lastInput.getFieldValue('ALIGN')
          if (align != 'LEFT') {
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
      // Generate inline/external switch.
      if (rootBlock.getFieldValue('INLINE') == 'EXT') {
        JS.inputsInline = false
      } else if (rootBlock.getFieldValue('INLINE') == 'INT') {
        JS.inputsInline = true
      }
      // Generate output, or next/previous connections.
      switch (rootBlock.getFieldValue('CONNECTIONS')) {
        case 'LEFT':
          JS.output =
              JSON.parse(this.getOptTypesFrom(rootBlock, 'OUTPUTTYPE') || 'null')
          break
        case 'BOTH':
          JS.previousStatement =
              JSON.parse(this.getOptTypesFrom(rootBlock, 'TOPTYPE') || 'null')
          JS.nextStatement =
              JSON.parse(this.getOptTypesFrom(rootBlock, 'BOTTOMTYPE') || 'null')
          break
        case 'TOP':
          JS.previousStatement =
              JSON.parse(this.getOptTypesFrom(rootBlock, 'TOPTYPE') || 'null')
          break
        case 'BOTTOM':
          JS.nextStatement =
              JSON.parse(this.getOptTypesFrom(rootBlock, 'BOTTOMTYPE') || 'null')
          break
      }
      // Generate colour.
      var colourBlock = rootBlock.getInputTargetBlock('COLOUR')
      if (colourBlock && !colourBlock.disabled) {
        var hue = parseInt(colourBlock.getFieldValue('HUE'), 10)
        JS.colour = hue
      }
      JS.tooltip = ''
      JS.helpUrl = 'http://www.example.com/'
      return JSON.stringify(JS, null, '  ')
    },

    /**
     * Inject code into a pre tag, with syntax highlighting.
     * Safe from HTML/script injection.
     * @param {string} code Lines of code.
     * @param {string} id ID of <pre> element to inject into.
     */
    injectCode (code, id) {
      var pre = document.getElementById(id);
      pre.textContent = code;
    },

    /**
     * Update the preview display.
     */
    updatePreview () {
      // Toggle between LTR/RTL if needed (also used in first display).
      var newDir = document.getElementById('direction').value;
      if (this.previewWorkspace) {
        this.previewWorkspace.dispose();
      }
      var rtl = newDir == 'rtl';

      const options = Object.assign({}, this.options)
      options.zoom.controls = false
      options.trashcan = false
      options.toolbox = null
      
      this.previewWorkspace = Blockly.inject('preview', {media: 'media/', ...options});
      this.previewWorkspace.clear();

      // Fetch the code and determine its format (JSON or JavaScript).
      var format = document.getElementById('format').value;
      if (format == 'Manual') {
        var code = document.getElementById('languageTA').value;
        // If the code is JSON, it will parse, otherwise treat as JS.
        try {
          JSON.parse(code);
          format = 'JSON';
        } catch (e) {
          format = 'JavaScript';
        }
      } else {
        var code = document.getElementById('languagePre').textContent;
      }
      if (!code.trim()) {
        // Nothing to render.  Happens while cloud storage is loading.
        return;
      }

      // Backup Blockly.Blocks object so that main workspace and preview don't
      // collide if user creates a 'factory_base' block, for instance.
      var backupBlocks = Blockly.Blocks;
      try {
        // Make a shallow copy.
        Blockly.Blocks = {};
        for (var prop in backupBlocks) {
          Blockly.Blocks[prop] = backupBlocks[prop];
        }

        if (format == 'JSON') {
          var json = JSON.parse(code);
          Blockly.Blocks[json.type || 'unnamed'] = {
            init: function() {
              this.jsonInit(json);
            }
          };
        } else if (format == 'JavaScript') {
          eval(code);
        } else {
          throw 'Unknown format: ' + format;
        }

        // Look for a block on Blockly.Blocks that does not match the backup.
        var blockType = null;
        for (var type in Blockly.Blocks) {
          if (typeof Blockly.Blocks[type].init == 'function' &&
              Blockly.Blocks[type] != backupBlocks[type]) {
            blockType = type;
            break;
          }
        }
        if (!blockType) {
          return;
        }

        // Create the preview block.
        var previewBlock = this.previewWorkspace.newBlock(blockType);
        previewBlock.initSvg();
        previewBlock.render();
        previewBlock.setMovable(false);
        previewBlock.setDeletable(false);
        previewBlock.moveBy(15, 10);
        this.previewWorkspace.clearUndo();

        this.updateGenerator(previewBlock);
      } finally {
        Blockly.Blocks = backupBlocks;
      }
    },

    /**
     * Update the generator code.
     * @param {!Blockly.Block} block Rendered block in preview workspace.
     */
    updateGenerator (block) {
      function makeVar(root, name) {
        name = name.toLowerCase().replace(/\W/g, '_');
        return '  var ' + root + '_' + name;
      }
      var language = document.getElementById('language').value;
      var code = [];
      code.push("Blockly." + language + "['" + block.type +
                "'] = function(block) {");

      // Generate getters for any fields or inputs.
      for (var i = 0, input; input = block.inputList[i]; i++) {
        for (var j = 0, field; field = input.fieldRow[j]; j++) {
          var name = field.name;
          if (!name) {
            continue;
          }
          if (field instanceof Blockly.FieldVariable) {
            // Subclass of Blockly.FieldDropdown, must test first.
            code.push(makeVar('variable', name) +
                      " = Blockly." + language +
                      ".variableDB_.getName(block.getFieldValue('" + name +
                      "'), Blockly.Variables.NAME_TYPE);");
          } else if (field instanceof Blockly.FieldAngle) {
            // Subclass of Blockly.FieldTextInput, must test first.
            code.push(makeVar('angle', name) +
                      " = block.getFieldValue('" + name + "');");
          } else if (field instanceof Blockly.FieldColour) {
            code.push(makeVar('colour', name) +
                      " = block.getFieldValue('" + name + "');");
          } else if (field instanceof Blockly.FieldCheckbox) {
            code.push(makeVar('checkbox', name) +
                      " = block.getFieldValue('" + name + "') == 'TRUE';");
          } else if (field instanceof Blockly.FieldDropdown) {
            code.push(makeVar('dropdown', name) +
                      " = block.getFieldValue('" + name + "');");
          } else if (field instanceof Blockly.FieldNumber) {
            code.push(makeVar('number', name) +
                      " = block.getFieldValue('" + name + "');");
          } else if (field instanceof Blockly.FieldTextInput) {
            code.push(makeVar('text', name) +
                      " = block.getFieldValue('" + name + "');");
          }
        }
        var name = input.name;
        if (name) {
          if (input.type == Blockly.INPUT_VALUE) {
            code.push(makeVar('value', name) +
                      " = Blockly." + language + ".valueToCode(block, '" + name +
                      "', Blockly." + language + ".ORDER_ATOMIC);");
          } else if (input.type == Blockly.NEXT_STATEMENT) {
            code.push(makeVar('statements', name) +
                      " = Blockly." + language + ".statementToCode(block, '" +
                      name + "');");
          }
        }
      }
      // Most languages end lines with a semicolon.  Python does not.
      var lineEnd = {
        'JavaScript': ';',
        'Python': '',
        'PHP': ';',
        'Dart': ';'
      };
      code.push("  // TODO: Assemble " + language + " into code variable.");
      if (block.outputConnection) {
        code.push("  var code = '...';");
        code.push("  // TODO: Change ORDER_NONE to the correct strength.");
        code.push("  return [code, Blockly." + language + ".ORDER_NONE];");
      } else {
        code.push("  var code = '..." + (lineEnd[language] || '') + "\\n';");
        code.push("  return code;");
      }
      code.push("};");

      this.injectCode(code.join('\n'), 'generatorPre');
    },

    /**
     * Returns field strings and any config.
     * @param {!Blockly.Block} block Input block.
     * @return {!Array.<string|!Object>} Array of static text and field configs.
     * @private
     */
    getFieldsJson (block) {
      var fields = [];
      while (block) {
        if (!block.disabled && !block.getInheritedDisabled()) {
          switch (block.type) {
            case 'field_static':
              // Result: 'hello'
              fields.push(block.getFieldValue('TEXT'));
              break;
            case 'field_input':
              fields.push({
                type: block.type,
                name: block.getFieldValue('FIELDNAME'),
                text: block.getFieldValue('TEXT')
              });
              break;
            case 'field_number':
              var obj = {
                type: block.type,
                name: block.getFieldValue('FIELDNAME'),
                value: Number(block.getFieldValue('VALUE'))
              };
              var min = Number(block.getFieldValue('MIN'));
              if (min > -Infinity) {
                obj.min = min;
              }
              var max = Number(block.getFieldValue('MAX'));
              if (max < Infinity) {
                obj.max = max;
              }
              var precision = Number(block.getFieldValue('PRECISION'));
              if (precision) {
                obj.precision = precision;
              }
              fields.push(obj);
              break;
            case 'field_angle':
              fields.push({
                type: block.type,
                name: block.getFieldValue('FIELDNAME'),
                angle: Number(block.getFieldValue('ANGLE'))
              });
              break;
            case 'field_checkbox':
              fields.push({
                type: block.type,
                name: block.getFieldValue('FIELDNAME'),
                checked: block.getFieldValue('CHECKED') == 'TRUE'
              });
              break;
            case 'field_colour':
              fields.push({
                type: block.type,
                name: block.getFieldValue('FIELDNAME'),
                colour: block.getFieldValue('COLOUR')
              });
              break;
            case 'field_variable':
              fields.push({
                type: block.type,
                name: block.getFieldValue('FIELDNAME'),
                variable: block.getFieldValue('TEXT') || null
              });
              break;
            case 'field_dropdown':
              var options = [];
              for (var i = 0; i < block.optionCount_; i++) {
                options[i] = [block.getFieldValue('USER' + i),
                    block.getFieldValue('CPU' + i)];
              }
              if (options.length) {
                fields.push({
                  type: block.type,
                  name: block.getFieldValue('FIELDNAME'),
                  options: options
                });
              }
              break;
            case 'field_image':
              fields.push({
                type: block.type,
                src: block.getFieldValue('SRC'),
                width: Number(block.getFieldValue('WIDTH')),
                height: Number(block.getFieldValue('HEIGHT')),
                alt: block.getFieldValue('ALT')
              });
              break;
          }
        }
        block = block.nextConnection && block.nextConnection.targetBlock();
      }
      return fields;
    },

    /**
     * Fetch the type(s) defined in the given input.
     * Format as a string for appending to the generated code.
     * @param {!Blockly.Block} block Block with input.
     * @param {string} name Name of the input.
     * @return {?string} String defining the types.
     */
    getOptTypesFrom (block, name) {
      var types = this.getTypesFrom(block, name);
      if (types.length == 0) {
        return undefined;
      } else if (types.indexOf('null') != -1) {
        return 'null';
      } else if (types.length == 1) {
        return types[0];
      } else {
        return '[' + types.join(', ') + ']';
      }
    },

    /**
     * Fetch the type(s) defined in the given input.
     * @param {!Blockly.Block} block Block with input.
     * @param {string} name Name of the input.
     * @return {!Array.<string>} List of types.
     * @private
     */
    getTypesFrom(block, name) {
      var typeBlock = block.getInputTargetBlock(name);
      var types;
      if (!typeBlock || typeBlock.disabled) {
        types = [];
      } else if (typeBlock.type == 'type_other') {
        types = [this.escapeString(typeBlock.getFieldValue('TYPE'))];
      } else if (typeBlock.type == 'type_group') {
        types = [];
        for (var i = 0; i < typeBlock.typeCount_; i++) {
          types = types.concat(this.getTypesFrom(typeBlock, 'TYPE' + i));
        }
        // Remove duplicates.
        var hash = Object.create(null);
        for (var n = types.length - 1; n >= 0; n--) {
          if (hash[types[n]]) {
            types.splice(n, 1);
          }
          hash[types[n]] = true;
        }
      } else {
        types = [this.escapeString(typeBlock.valueType)];
      }
      return types;
    },

    /**
     * Escape a string.
     * @param {string} string String to escape.
     * @return {string} Escaped string surrounded by quotes.
     */
    escapeString(string) {
      return JSON.stringify(string);
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