<template lang="pug">
  MonacoEditor(ref='editor' v-model='code' language='javascript' :options='settings' @editorDidMount='editorDidMount' theme='shadesofpurple')
</template>

<script>
import MonacoEditor from 'vue-monaco'
import {defaultsDeep} from 'lodash'

/**
 * A Monaco (VSCode) editor
 * 
 * @prop options {Object} @see https://microsoft.github.io/monaco-editor/api/interfaces/monaco.editor.ieditorconstructionoptions.html
 * @prop value {String} The initial code to use
 * @emits onCodeChange [{STR} code]
 */
export default {
  name: 'PageCode',

  components: {MonacoEditor},
  props: {
    options: {
      type: Object,
      default: () => {}
    },
    value: {
      type: String,
      default: ''
    },
    prefix: {
      type: String,
      default: ''
    }
  },

  watch: {
    code (code) {
      this.$emit('onCodeChange', code)
    },

    /**
     * Appends code at the beginning of the document
     */
    prefix (newPrefix, oldPrefix) {
      if (oldPrefix) {
        this.code = newPrefix + '\n' + this.code.replace(oldPrefix + '\n', '') 
      }
    }
  },
  
  data () {
    return {
      code: this.$props.value,
      
      settings: defaultsDeep(this.$props.options, {
        theme: 'shadesofpurple',
        automaticLayout: true,
        minimap: {enabled: false}
      })
    }
  },

  methods: {
    editorDidMount (editor) {
      const monaco = this.$refs.editor.monaco
  
      monaco.editor.defineTheme('shadesofpurple', {
          base: 'vs-dark',
          inherit: true,
          rules: [
            { token: '', foreground: '9EFFFF', background: '9EFFFF' },
            // { token: 'invalid', foreground: 'ff0000' },
            { token: 'emphasis', fontStyle: 'italic' },
            { token: 'strong', fontStyle: 'bold' },

            { token: 'variable', foreground: 'ff0000' },
            // { token: 'variable.predefined', foreground: 'ff0000' },
            { token: 'variable.parameter', foreground: '9EFFFF' },
            // { token: 'constant', foreground: 'ff0000' },
            { token: 'comment', foreground: 'B362FF' },
            { token: 'number', foreground: 'FF628C' },
            { token: 'number.hex', foreground: 'FF628C' },
            { token: 'regexp', foreground: 'FB94FF' },
            // { token: 'annotation', foreground: 'ff0000' },
            { token: 'type', foreground: '9EFFFF' },

            { token: 'delimiter', foreground: 'ffffff' },

            { token: 'attribute.name', foreground: 'ff0000' },
            { token: 'attribute.value', foreground: 'ff0000' },

            { token: 'string', foreground: 'A5FF90' },

            { token: 'keyword', foreground: 'FF9D00' }
          ],

          // @see https://code.visualstudio.com/api/references/theme-color
          colors: {
            'editorIndentGuide.background': '#A599E90F',
            'editorIndentGuide.activeBackground': '#A599E942',
            'editor.background': '#2d2b55',
            'editor.foreground': '#ffffff',
            'editor.selectionBackground': '#7448af',
            'editor.lineHighlightBackground': '#1f1f41',
            'editorCursor.foreground': '#fad000',
            'editorWhitespace.foreground': 'red'
          }
      })
      monaco.editor.setTheme('shadesofpurple')
    }
  }
}
</script>