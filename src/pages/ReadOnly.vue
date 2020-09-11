<template lang="pug">
.full-height
  div.full-height.center-children(v-if='isChecking')
    q-spinner(color='primary' size='5em')
  .full-height(v-else-if='blocks.length')
    Workspace(ref='workspace' :options='options' style="right: 0" :blocks='blocks')
      category(name='Readonly' colour='#fff')
        block(v-for='block in blocks' :type='block.type' :key='block.type')
  div.full-height.center-children(v-else)
    div.text-center
      h1 404 - Block not found
      p.text-subtitle1
        | Could not find block: <code>{{id}}</code>
</template>

<script>
import {mapState} from 'vuex'
import Blockly from 'blockly'
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
        grid: null,
        trashcan: false,
        zoom: {
          controls: false,
          pinch: true,
          wheel: true,
          startScale: 0.75
        }        
      }
    }
  },

  /**
   * Load the blockly data from the server
   */
  mounted () {
    document.querySelector('body').classList.add('transparent')

    this.$store.dispatch('apiGet', 'block/' + this.id).then(resp => {
      this.isChecking = false
      this.blocks = resp.data.blocks
    })
    .catch(err => {
      this.$root.$emit('error', err)
    })
    .finally(() => {
      this.isChecking = false
    })
  }
}
</script>