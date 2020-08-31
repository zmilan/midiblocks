<template lang="pug">
q-layout.full-height(view='lHh Lpr lFf')
  q-page-container.full-height
    q-page.full-height
      router-view
      Blockly.blockly(ref='foo' :options='options' style="right: 0")
</template>

<script>
import {mapState} from 'vuex'
import Blockly from '../components/Blockly'
import BlocklyJS from 'blockly/javascript'
import '../blocks/midi-events'
import '../blocks/midi-args'
import '../blocks/midi-send'
import '../blocks/prompt'

const minHeight = 200

export default {
  name: 'MainLayout',

  computed: {
    ...mapState(['workspace'])
  },

  components: {
    Blockly
  },

  data () {
    return {
      id: null,
      
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
        grid: null,
        readOnly: true,
        sounds: false,
        toolbox: null,
        trashcan: false,
        zoom: false
      }
    }
  },

  /**
   * Load the blockly data from the server
   */
  mounted () {
    this.$axios.get(process.env.api.base + 'getBlock', {id: this.$route.params.id}).then(resp => {
      console.log('✅ Reponse: ', resp)
    })
    .catch(err => {
      console.log('🚨 Error: ', err)
    })
  }
}
</script>
