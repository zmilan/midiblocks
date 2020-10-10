<template lang="pug">
DialogConfirm(:value='value' @input='$emit("input", $event)'
  @accept='deleteMidiblock'
  bg='negative'
  icon='fas fa-trash'
  title='Delete midiblock?')
    p Are you sure you want to delete this midiblock? This cannot be undone!
</template>

<script>
import DialogConfirm from './Confirm'
import {mapState} from 'vuex'
import store from 'store'

export default {
  name: 'DialogDeleteMidiblock',

  components: {DialogConfirm},

  computed: {
    ...mapState(['midiblocks'])
  },

  props: ['value', 'midiblock'],

  methods: {
    /**
     * Deletes the block and creates a new one
     */
    deleteMidiblock () {
      let title = this.midiblocks[this.midiblock.uuid].title
      let midiblocks = Object.assign({}, this.midiblocks)
      let currentStudio = store.get('currentStudio', {})

      // Delete Midiblock
      delete midiblocks[this.midiblock.uuid]
      this.$store.commit('set', ['midiblocks', midiblocks])
      store.set('midiblocks', midiblocks)

      // Reset Studio
      if (this.midiblock.uuid === currentStudio.uuid) {
        store.remove('currentStudio')
      }

      // Notifications
      this.$q.notify({
        type: 'positive',
        message: `Midiblock "${title}" deleted`,
        timeout: 2000
      })
      this.$store.commit('set', ['lastEvent', {log: `Midiblock "${title}" deleted`}])

      // Reroute
      if (this.$route.name === 'Studio') {
        this.$store.commit('tally', 'reloads')
      }
    }
  }
}
</script>