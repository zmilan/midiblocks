<template lang="pug">
q-layout.full-height(view='lHh Lpr lFf')
  q-header(elevated='')
    q-toolbar
      q-btn(flat='' dense='' round='' icon='menu' aria-label='Menu' @click='leftDrawerOpen = !leftDrawerOpen')
      q-toolbar-title MIDIBlocks
      div Quasar v{{ $q.version }}
  q-drawer(v-model='leftDrawerOpen' show-if-above='' bordered='' content-class='bg-grey-1')
  q-page-container.full-height
    router-view
</template>

<script>
export default {
  name: 'MainLayout',

  watch: {
    /**
     * Resize the Blockly editor
     */
    leftDrawerOpen () {
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 50)
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 100)
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 150)
      setTimeout(() => {
        window.dispatchEvent(new Event('resize'))
      }, 200)
    }
  },
  
  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
