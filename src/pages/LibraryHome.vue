<template lang="pug">
q-page.full-height
  section.content
    h1 Library

    h4 Midiblocks
    MidiblocksTable

    h4 Building blocks
    BlocksGrid
</template>

<script>
import BlocksGrid from '../components/library/BlocksGrid'
import MidiblocksTable from '../components/library/MidiblocksTable'
import {mapState} from 'vuex'
import store from 'store'

export default {
  name: 'LibraryHome',

  components: {BlocksGrid, MidiblocksTable}
}
</script>