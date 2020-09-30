<template lang="pug">
q-page.full-height
  section.content
    h1 Library

    div.center-children(v-if='post.isChecking')
      q-spinner(color='primary' size='5em')

    div(v-else v-html='post.content')

    LibraryGrid(:blocks='allBlocks')
</template>

<script>
import LibraryGrid from '../components/LibraryGrid'
import {mapState} from 'vuex'
import store from 'store'

export default {
  name: 'LibraryHome',

  components: {LibraryGrid},

  computed: {
    ...mapState(['post'])
  },

  data () {
    return {
      allBlocks: store.get('blocks')
    }
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