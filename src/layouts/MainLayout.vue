<template lang="pug">
q-layout(view='lHh Lpr lFf')
  q-header(elevated='')
    q-toolbar
      q-btn(flat='' dense='' round='' icon='menu' aria-label='Menu' @click='leftDrawerOpen = !leftDrawerOpen')
        q-toolbar-title MIDIBlocks
        div Quasar v{{ $q.version }}
  q-drawer(v-model='leftDrawerOpen' show-if-above='' bordered='' content-class='bg-grey-1')
  q-page-container
    router-view
</template>

<script>
export default {
  name: 'MainLayout',
  data () {
    return {
      leftDrawerOpen: false
    }
  }
}
</script>
