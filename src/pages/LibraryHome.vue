<template lang="pug">
q-page.full-height
  section.content
    h1 Library

    div.center-children(v-if='post.isChecking')
      q-spinner(color='primary' size='5em')

    div(v-else v-html='post.content')

    LibraryGrid
</template>

<script>
import LibraryGrid from '../components/LibraryGrid'
import {mapState} from 'vuex'

export default {
  name: 'LibraryHome',

  components: {LibraryGrid},

  computed: {
    ...mapState(['post'])
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