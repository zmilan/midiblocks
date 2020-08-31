<template lang="pug">
q-layout.full-height(view='lHh Lpr lFf')
  q-page-container.full-height
    q-page.full-height
      router-view
      Blockly.blockly(ref='blockly' :options='options' style="right: 0")
        category(name='Readonly')
          block(v-for='block in blocks' :type='block.type' :key='block.type')
</template>

<script>
import {mapState} from 'vuex'
import BlocklyJS from 'blockly'
import Blockly from '../components/Blockly'

export default {
  name: 'ReadOnly',

  computed: {
    ...mapState(['workspace'])
  },

  components: {
    Blockly
  },

  data () {
    return {
      // Collection of blocks
      blocks: [],
      
      // Blockly options
      // @see https://developers.google.com/blockly/guides/configure/web/configuration_struct
      options: {
        media: 'media/',
        grid: null,
        sounds: false,
        toolbox: false,
        trashcan: false,
        zoom: false
      }
    }
  },

  /**
   * Load the blockly data from the server
   */
  mounted () {
    document.querySelector('body').classList.add('transparent')
    
    this.$axios.get(`${process.env.api.base}block/${this.$route.params.id}`).then(resp => {
      // Build blocks
      this.blocks = resp.data.blocks
      this.blocks.forEach(block => {
        BlocklyJS.Blocks[block.title] = {
          init: function () {
            this.jsonInit(JSON.parse(block.block_definition))
          }
        }
        BlocklyJS.JavaScript[block.title] = () => ''

        // Inject into workspace
        const theBlock = this.$refs.blockly.blockly.newBlock(block.title)
        theBlock.initSvg()
        theBlock.render()

        // Center the block
        this.$refs.blockly.blockly.centerOnBlock(theBlock.id)
      })
    })
    // @TODO show error
    .catch(err => {
      console.log('🚨 Error: ', err)
    })
  }
}
</script>
