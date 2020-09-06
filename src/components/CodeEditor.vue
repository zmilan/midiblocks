<template lang="pug">
  MonacoEditor(ref='editor' v-model='code' language='javascript' :options='options' @editorDidMount='editorDidMount' theme='shadesofpurple')
</template>

<script>
import MonacoEditor from 'vue-monaco'
import TMPSTRING from '!!raw-loader!!../assets/js/syntax-highlight-test.js'

export default {
  name: 'PageCode',

  components: {MonacoEditor},
  
  data () {
    return {
      code: TMPSTRING,
      options: {
        theme: 'shadesofpurple',
        automaticLayout: true,
        minimap: {enabled: false}
      }
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
            { token: 'invalid', foreground: 'f44747' },
            { token: 'emphasis', fontStyle: 'italic' },
            { token: 'strong', fontStyle: 'bold' },

            { token: 'variable', foreground: '74B0DF' },
            { token: 'variable.predefined', foreground: '4864AA' },
            { token: 'variable.parameter', foreground: '9CDCFE' },
            { token: 'constant', foreground: '569CD6' },
            { token: 'comment', foreground: 'B362FF' },
            { token: 'number', foreground: 'B5CEA8' },
            { token: 'number.hex', foreground: '5BB498' },
            { token: 'regexp', foreground: '0000ff' },
            { token: 'annotation', foreground: 'ff0000' },
            { token: 'type', foreground: '9EFFFF' },

            { token: 'delimiter', foreground: 'ffffff' },

            { token: 'attribute.name', foreground: 'ff0000' },
            { token: 'attribute.value', foreground: 'ff0000' },

            { token: 'string', foreground: 'A5FF90' },

            { token: 'keyword', foreground: 'FF9D00' }
          ],
          colors: {
            "editor.background": "#28284E",
            "editor.foreground": "#ffffff",
            "editor.selectionBackground": "#7448af",
            "editor.lineHighlightBackground": "#1f1f41",
            "editorCursor.foreground": "#fad000",
            "editorWhitespace.foreground": "red"
          }
      })
      monaco.editor.setTheme('shadesofpurple')
    }
  }
}
</script>