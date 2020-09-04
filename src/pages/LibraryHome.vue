<template lang="pug">
q-page.full-height
  section.content
    h1 Library

    div.center-children(v-if='isChecking')
      q-spinner(color='primary' size='5em')
    template(v-else-if='blocks.length')
      Workspace.blockly.inline(v-for='block in blocks' ref='workspace' :options='options' style="right: 0" :key='block.title' :blocks='[block]')
        category(name='Readonly' colour='#fff')
          block(v-for='block in blocks' :type='block.type' :key='block.type')
</template>

<script>
import Workspace from '../components/Workspace'

export default {
  name: 'LibraryHome',

  components: {
    Workspace
  },

  data () {
    return {
      blocks: [],
      isChecking: true,
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
      .finally(() => {
        this.isChecking = false
      })
  }
}
</script>