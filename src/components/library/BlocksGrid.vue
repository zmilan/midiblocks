<template lang="pug">
.row.q-col-gutter-md
  .col-12.col-sm-6.col-lg-4(v-for='block in blocks' :key='block.json.type')
    q-card
      q-card-section
        Workspace(:options='options' :blocks='[block]' :inline='true' :toolbox='toolbox')
      q-separator
      q-card-section
        h3 {{block.json.type}}
        p.pre-wrap {{block.description}}
      q-card-actions(align='right')
        template(slot-scope='props')
          q-btn(size='sm' color='secondary' @click='loadBlock(block)' icon='fas fa-folder-open') Load
          q-space
          q-btn(size='sm' color='tertiary' @click='remixBlock(block)' icon='fas fa-copy') Remix
          q-space
          q-btn(size='sm' color='negative' @click='deleteBlock(block)' icon='fas fa-trash') Delete

  DialogDeleteBlock(v-model='dialog.deleteBlock' :block='dialogBlock')
</template>

<script>
import Workspace from '../Workspace'
import DialogDeleteBlock from '../dialog/DeleteBlock'
import store from 'store'
import {mapState} from 'vuex'
import {cloneDeep} from 'lodash'
import {v4 as uuidv4} from 'uuid'

/**
 * Displays a grid of blocks in the users current library
 */
export default {
  name: 'BlocksGrid',

  components: {Workspace, DialogDeleteBlock},

  computed: {
    ...mapState(['blocks']),
    
    toolbox () {
      let toolbox = []

      if (this.blocks.length) {
        Object.keys(this.blocks).forEach(key => {
          toolbox.push({
            tag: 'category',
            name: 'Readonly',
            colour: '#fff',
            children: [
              {
                tag: 'block',
                type: this.blocks[key].category
              }
            ]
          })
        })
      }

      return toolbox
    }
  },

  data () {
    return {
      // The block to use inside a dialog
      dialogBlock: null,
      
      // Dialog models
      dialog: {
        deleteBlock: false
      },
      
      // Blockly workspace
      options: {
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

  methods: {
    /**
     * Load the block
     */
    loadBlock (block) {
      // Load block
      store.set('currentFactory', block)
      this.$q.notify({
        type: 'positive',
        message: `Block "${block.json.type}" loaded!`,
        timeout: 3000
      })

      // Reroute
      if (this.$route.name === 'Factory') {
        this.$store.commit('tally', 'reloads')
      } else {
        this.$router.push({name: 'Factory'})
      }
    },

    /**
     * Delete the block
     */
    deleteBlock (block) {
      this.dialogBlock = block
      this.dialog.deleteBlock = true
    },

    /**
     * Remix a block
     */
    remixBlock (block) {
      const oldName = block.name
      block = cloneDeep(block)
      block.uuid = uuidv4()
      block.json.type = block.name += '_remixed'
      block.workspace = block.workspace.replace(`<field name="name">${oldName}</field>`, `<field name="name">${block.name}</field>`)

      this.$store.commit('set', [`blocks["${block.uuid}"]`, block])
      store.set('currentFactory', block)
      store.set('isFactoryUnsaved', false)
      store.set('blocks', this.blocks)
      this.$q.notify({
        type: 'positive',
        message: `Block "${block.title}" remixed!`,
        timeout: 3000
      })

      // Reroute
      if (this.$route.name === 'Factory') {
        this.$store.commit('tally', 'reloads')
      } else {
        this.$router.push({name: 'Factory'})
      }
    }
  }
}
</script>