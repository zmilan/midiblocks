<template lang="pug">
q-page.full-height
  section.content
    h1 Library

    div.center-children(v-if='post.isChecking')
      q-spinner(color='primary' size='5em')
    div(v-else) {{post.content}}
    template(if='blocks.length')
      .row.q-col-gutter-md
        .col-12.col-sm-6.col-lg-4.col-xl-3(v-for='block in blocks' :key='block.title')
          q-card
            q-card-section
              Workspace.blockly.inline(:options='options' style="right: 0" :blocks='[block]')
                category(name='Readonly' colour='#fff')
                  block(v-for='block in blocks' :type='block.type' :key='block.type')
            q-separator
            q-card-section
              h3 {{block.title}}
              p {{block.short_description[0]}}
</template>

<script>
import Workspace from '../components/Workspace'
import {mapState} from 'vuex'

export default {
  name: 'LibraryHome',

  components: {
    Workspace
  },

  computed: {
    ...mapState(['post'])
  },

  data () {
    return {
      blocks: [],
      options: {
        media: 'media/',
        grid: null,
        sounds: false,
        toolbox: null,
        trashcan: false,
        zoom: false
      }
    }
  },

  mounted () {
    this.$store.dispatch('apiGet', 'library')
      .then(resp => {
        this.blocks = resp.data.blocks
      })
      .catch(err => {
        this.$root.$emit('error', err)
      })
  }
}
</script>