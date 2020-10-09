<template lang="pug">
q-page.full-height
  section.content
    h1 Library

    div.center-children(v-if='post.isChecking')
      q-spinner(color='primary' size='5em')

    div(v-else v-html='post.content')

    h4 Midiblocks
    MidiblocksTable(:midiblocks='midiblocks')

    h4 Building blocks
    BlocksGrid(:blocks='blocks')
</template>

<script>
import BlocksGrid from '../components/library/BlocksGrid'
import MidiblocksTable from '../components/library/MidiblocksTable'
import {mapState} from 'vuex'
import store from 'store'

export default {
  name: 'LibraryHome',

  components: {BlocksGrid, MidiblocksTable},

  computed: {
    ...mapState(['post', 'blocks', 'midiblocks'])
  },

  mounted () {
    // @todo uncomment once a backend is added
    // this.$store.dispatch('apiGet', 'library')
    //   .then(resp => {
    //     this.blocks = resp.data.blocks
    //   })
    //   .catch(err => {
    //     this.$root.$emit('error', err)
    //   })
  }
}
</script>