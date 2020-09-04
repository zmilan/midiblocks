<template lang="pug">
  q-page.full-height
    h1 Test
</template>

<script>
export default {
  name: 'LibraryHome',

  mounted () {
    this.$store.dispatch('apiGet', 'library')
      .catch(err => {
        this.$root.$emit('error', err)
      })
  }
}
</script>