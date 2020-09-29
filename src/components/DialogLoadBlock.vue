<template lang="pug">
q-dialog(v-model='isVisible' maximized)
  q-card
    q-card-section
      .text-h6
        i.fas.fa-folder-open
        span.q-ml-md Load block
    q-card-section
      LibraryGrid
        template(slot-scope='props')
          q-btn(color='secondary' @click='loadBlock(props)' icon='fas fa-folder-open') Load Block
</template>

<script>
import LibraryGrid from '../components/LibraryGrid'
import store from 'store'

/**
 * Displays a dialog box for grabbing a Midiblock
 */
export default {
  name: 'DialogLoadBlock',

  props: ['model'],

  components: {LibraryGrid},

  watch: {
    isVisible (state) {
      this.$emit('change', state)
    },

    '$props.model' (state) {
      this.isVisible = state
    }
  },

  data () {
    return {
      isVisible: this.$props.model
    }
  },

  methods: {
    /**
     * Load the block
     */
    loadBlock (props) {
      store.set('currentFactory', props.block)
      this.$store.commit('tally', 'reloads')
    }
  }
}
</script>