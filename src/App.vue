<template lang="pug">
#q-app
  router-view
</template>

<script>
export default {
  name: 'App',

  mounted () {
    window.MIDIBlocks = this
  }
}
</script>
