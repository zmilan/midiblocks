<template lang="pug">
.full-height
  div.full-height.center-children(v-if='isChecking')
    q-spinner(color='primary' size='5em')
  .full-height(v-else)
    q-dialog(v-model='!blocks.length' persistent )
      q-card.bg-negative
        q-card-section.row.items-center
          q-avatar.text-negative(icon='fas fa-exclamation-triangle' color='white')
          span.q-ml-sm.text-white <code>/block/{{id}}</code> does not exist
    Workspace.blockly(v-if='blocks.length' ref='workspace' :options='options' style="right: 0")
      category(name='Readonly' colour='#fff')
        block(v-for='block in blocks' :type='block.type' :key='block.type')
</template>

<script>
import {mapState} from 'vuex'
import BlocklyJS from 'blockly'
import Workspace from '../components/Workspace'

export default {
  name: 'PageReadOnly',

  computed: {
    ...mapState(['workspace'])
  },

  components: {
    Workspace
  },

  data () {
    return {
      isChecking: true,

      id: this.$route.params.id,
      
      // Collection of blocks
      blocks: [],
      
      // Blockly options
      // @see https://developers.google.com/blockly/guides/configure/web/configuration_struct
      options: {
        media: 'media/',
        grid: null,
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
    document.querySelector('body').classList.add('transparent')
    
    this.$axios.get(this.$api.base  + 'block/' + this.$route.params.id).then(resp => {
      this.isChecking = false
      this.blocks = resp.data.blocks

      this.$nextTick(() => {
        this.blocks.forEach(block => {
          BlocklyJS.Blocks[block.title] = {
            init: function () {
              this.jsonInit(JSON.parse(block.block_definition))
            }
          }
          BlocklyJS.JavaScript[block.title] = () => ''
  
          // Inject into workspace
          const theBlock = this.$refs.workspace.blockly.newBlock(block.title)
          theBlock.initSvg()
          theBlock.render()
  
          // Center the block
          this.$refs.workspace.blockly.centerOnBlock(theBlock.id)
          this.$refs.workspace.blockly.scroll(this.$refs.workspace.blockly.scrollX, this.$refs.workspace.blockly.scrollY)
        })
      })
    })
    // @TODO show error
    .catch(err => {
      console.log('🚨 Error: ', err)
    })
    .finally(() => {
      this.isChecking = false
    })
  }
}
</script>