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
        q-btn.text-black(@click='goHome' color='white') Go to home page
</template>

<script>
export default {
  name: 'App',

  watch: {
    /**
     * Check query string for new API domain and fetches post content
     */
    $route (to) {
      if (to.query.apiDomain) {
        this.$store.commit('set', ['api.domain', to.query.apiDomain])
      }

      // Load post data
      this.$store.commit('set', ['post.isChecking', true])
      this.$store.dispatch('apiGet', {
        path: 'post',
        url: this.$route.path
      })
        .then(resp => {
          const data = resp.data || {}

          if (data.content) {
            data.content = this.$markdown.render(data.content)
          }
          
          this.$store.commit('set', ['post', data]);
        })
        .finally(() => {
          this.$store.commit('set', ['post.isChecking', false]);
        })
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
