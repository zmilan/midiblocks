<template lang="pug">
q-page(style='height: 1px')
  //- @TODO remove these depdendencys @see ./assets/js/factory.js
  .hidden
    select#direction
      option(value='ltr') LTR
      option(value='rtl') RTL
    button#linkButton(title='Save and link to blocks.')
    button#helpButton(title='View documentation in new window.')
      span Help

  table
    tr
      td(width='50%' style='padding: 2px;')
        Workspace.fill(:blocks='[]' :options='options')
          category(name='Input')
            block(type='input_value')
              value(name='TYPE')
                shadow(type='type_null')
            block(type='input_statement')
              value(name='TYPE')
                shadow(type='type_null')
            block(type='input_dummy')
          category(name='Field')
            block(type='field_static')
            block(type='field_input')
            block(type='field_number')
            block(type='field_angle')
            block(type='field_dropdown')
            block(type='field_checkbox')
            block(type='field_colour')
            block(type='field_variable')
            block(type='field_image')
          category(name='Type')
            block(type='type_group')
            block(type='type_null')
            block(type='type_boolean')
            block(type='type_number')
            block(type='type_string')
            block(type='type_list')
            block(type='type_other')
          category#colourCategory(name='Colour')
            block(type='colour_hue')
              mutation(colour='20')
              field(name='HUE') 20
            block(type='colour_hue')
              mutation(colour='65')
              field(name='HUE') 65
            block(type='colour_hue')
              mutation(colour='120')
              field(name='HUE') 120
            block(type='colour_hue')
              mutation(colour='160')
              field(name='HUE') 160
            block(type='colour_hue')
              mutation(colour='210')
              field(name='HUE') 210
            block(type='colour_hue')
              mutation(colour='230')
              field(name='HUE') 230
            block(type='colour_hue')
              mutation(colour='260')
              field(name='HUE') 260
            block(type='colour_hue')
              mutation(colour='290')
              field(name='HUE') 290
            block(type='colour_hue')
              mutation(colour='330')
              field(name='HUE') 330
        #blocklyMask
      td(width='50%')
        table
          tr
            td(height='30%')
              #preview
          tr
            td(height='5%')
              h3
                | Language code:
                select#format
                  option(value='JSON') JSON
                  option(value='JavaScript') JavaScript
                  option(value='Manual') Manual edit&mldr;
          tr
            td(height='30%')
              pre#languagePre.prettyprint.lang-js.
                
              textarea#languageTA
          tr
            td(height='5%')
              h3
                | Generator stub:
                select#language
                  option(value='JavaScript') JavaScript
                  option(value='Python') Python
                  option(value='PHP') PHP
                  option(value='Lua') Lua
                  option(value='Dart') Dart
          tr
            td(height='30%')
              pre#generatorPre.prettyprint.lang-js.
</template>

<script>
import '../assets/blocks/factory'
import '../assets/js/factory'
import Workspace from '../components/Workspace'

export default {
  name: 'PageCodeHome',

  components: {Workspace},

  data () {
    return {
      // Blockly options
      // @see https://developers.google.com/blockly/guides/configure/web/configuration_struct
      options: {
        media: 'media/',
        // renderer: 'zelos',
        zoom: {
          controls: true,
          pinch: true,
          wheel: true
        },
        grid: {
          spacing: 25,
          length: 10,
          opacity: 0,
          colour: '#efefef',
          snap: true
        }
      }
    }
  }
}
</script>

<style scoped>
  table {
    height: 100%;
    width: 100%;
  }
  td {
    vertical-align: top;
    padding: 0;
  }
  #blocklyMask {
    background-color: #000;
    cursor: not-allowed;
    display: none;
    position: fixed;
    opacity: 0.2;
    z-index: 9;
  }
  #preview {
    position: absolute;
  }
  pre,
  #languageTA {
    border: #ddd 1px solid;
    margin-top: 0;
    position: absolute;
    overflow: scroll;
  }
  #languageTA {
    display: none;
    font-family: monospace;
    font-size: 10pt;
  }
</style>
