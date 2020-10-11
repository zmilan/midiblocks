<template lang="pug">
DialogConfirm(:value='value' @input='$emit("input", $event)'
  @accept='deleteBlock'
  bg='negative'
  icon='fas fa-trash'
  title='Delete block?')
    p Are you sure you want to delete this block? This cannot be undone!
</template>

<script>
import DialogConfirm from './Confirm'
import {mapState} from 'vuex'
import store from 'store'

export default {
  name: 'DeleteBlock',

  components: {DialogConfirm},

  computed: {
    ...mapState(['blocks'])
  },

  props: ['value', 'block'],

  methods: {
    /**
     * Deletes the block and creates a new one
     */
    deleteBlock () {
      let name = this.blocks[this.block.uuid].name
      let blocks = Object.assign({}, this.blocks)
      let currentFactory = store.get('currentFactory', {})

      // Delete block
      delete blocks[this.block.uuid]
      this.$store.commit('set', ['blocks', blocks])
      store.set('blocks', blocks)

      // Reset factory
      if (this.block.uuid === currentFactory.uuid) {
        store.remove('currentFactory')
      }

      // Notifications
      this.$q.notify({
        type: 'positive',
        message: `Block "${name}" deleted`,
        timeout: 2000
      })
      this.$store.commit('set', ['lastEvent', {log: `Block "${name}" deleted`}])

      // Reroute
      if (this.$route.name === 'Factory') {
        this.$store.commit('tally', 'reloads')
      }
    }
  }
}
</script>