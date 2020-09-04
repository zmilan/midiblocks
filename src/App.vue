<template lang="pug">
#q-app
  router-view

  //- Error: Generic
  q-dialog(v-model='!!errors.generic' persistent)
    q-card.bg-negative
      q-card-section.row.items-center
        q-avatar.text-negative(icon='fas fa-exclamation-triangle' color='white')
        span.q-ml-sm.text-white {{errors.generic}}
      q-card-actions(align='right')
        q-btn.bg-white(@click='goHome') Go to home page
</template>

<script>
export default {
  name: 'App',

  watch: {
    /**
     * Check query string for new API domain 
     */
    $route (to) {
      if (to.query.apiDomain) {
        this.$store.commit('set', ['api.domain', to.query.apiDomain])
      }
    }
  },

  data () {
    return {
      // Will display different modals based on error messages
      errors: {
        generic: ''
      }
    }
  },

  mounted () {
    this.$root.$on('prepareRoute', this.prepareRoute)
    this.$root.$on('error', this.onError)
  },

  destroyed () {
    this.$root.$off('error', this.onError)
  },

  methods: {
    onError (payload) {
      this.errors.generic = payload
    },

    goHome () {
      this.$router.push({name: 'Home'})
      this.errors.generic = ''
    }
  }
}
</script>
