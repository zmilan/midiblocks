<template lang="pug">
.row.q-col-gutter-md
  .col-12.col-sm-6.col-lg-4(v-for='block in blocks' :key='block.name')
    q-card
      q-card-section
        Workspace(:options='options' :blocks='[block]' :midiblocks='[midiblocks]' :inline='true' :toolbox='toolbox')
      q-separator
      q-card-section
        h3 {{block.name}}
        p.pre {{block.description}}
      q-card-actions(align='right')
        template(slot-scope='props')
          q-btn(color='secondary' @click='loadBlock(block)' icon='fas fa-folder-open') Load
</template>

<script>
import Workspace from '../Workspace'
import store from 'store'
import {mapState} from 'vuex'

/**
 * Displays a grid of blocks in the users current library
 */
export default {
  name: 'BlocksGrid',

  props: {
    midiblocks: {
      type: Object
    }
  },

  components: {Workspace},

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
      store.set('currentFactory', block)
      this.$q.notify({
        type: 'positive',
        message: `Block "${block.name}" loaded!`,
        timeout: 3000
      })

      if (this.$route.name === 'Factory') {
        this.$store.commit('tally', 'reloads')
      } else {
        this.$router.push({name: 'Factory'})
      }
    }
  }
}
</script>