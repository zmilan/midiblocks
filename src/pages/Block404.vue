<template lang="pug">
.text-center.text-black
  h1 404
  h2 <code>/block/{{id}}</code> doesn't exist.
  p For a list of available blocks, visit <a href="https://midiblocks.com/blocks">Midiblocks.com/blocks</a>
</template>

<script>
export default {
  name: 'Block404',

  props: ['id']
}
</script>