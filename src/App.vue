<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',

  mounted () {
    this.$root.$on('prepareRoute', this.prepareRoute)
  },

  watch: {
    /**
     * Check query string for new API domain 
     */
    $route (to) {
      if (to.query.apiDomain) {
        this.$store.commit('set', ['api.domain', to.query.apiDomain])
      }
    }
  }
}
</script>
