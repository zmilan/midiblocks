<template lang="pug">
.row.q-col-gutter-md
  .col-12.col-sm-6.col-lg-4(v-for='block in blocks' :key='block.name')
    q-card
      q-card-section
        Workspace(:options='options' :blocks='[block]' :inline='true' :toolbox='toolbox')
      q-separator
      q-card-section
        h3 {{block.name}}
        p {{block.json.tooltip}}
</template>

<script>
import Workspace from '../components/Workspace'
import store from 'store'

/**
 * Displays a grid of blocks in the users current library
 */
export default {
  name: 'LibraryGrid',

  components: {Workspace},

  computed: {
    toolbox () {
      let toolbox = []

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

      return toolbox
    }
  },

  data () {
    return {
      blocks: store.get('blocks'),

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
  }
}
</script>