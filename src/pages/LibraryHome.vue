<template lang="pug">
q-page.full-height
  section.content
    h1 Library

    div.center-children(v-if='post.isChecking')
      q-spinner(color='primary' size='5em')
    div(v-else v-html='post.content')
    template(if='blocks.length')
      .row.q-col-gutter-md
        .col-12.col-sm-6.col-lg-4(v-for='block in blocks' :key='block.title')
          q-card
            q-card-section
              Workspace(:options='options' style="right: 0" :blocks='[block]' :inline='true' :toolbox='toolbox')
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
    ...mapState(['post']),

    toolbox () {
      let toolbox = []

      this.blocks.forEach(block => {
        toolbox.push({
          tag: 'category',
          name: 'Readonly',
          colour: '#fff',
          children: [
            {
              tag: 'block',
              type: block.type
            }
          ]
        })
      })
      
      return toolbox
    }
  },

  data () {
    return {
      blocks: [],

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