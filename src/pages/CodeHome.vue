<template lang="pug">
q-page(style='height: 1px')
  Workspace.blockly(:options='options' :blocks='[]')
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
      block(type='field_label_serializable')
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
</template>

<script>
import Workspace from '../components/Workspace'
import '../assets/blocks/code'

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
