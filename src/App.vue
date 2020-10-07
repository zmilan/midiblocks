<template lang="pug">
#q-app(:key='reloads')
  router-view

  //- Error: Generic
  q-dialog(v-model='!!errors.generic' persistent)
    q-card.bg-negative
      q-card-section.row.items-center
        q-avatar.text-negative(icon='fas fa-exclamation-triangle' color='white')
        span.q-ml-sm.text-white {{errors.generic}}
      q-card-actions(align='right')
        q-btn.text-black(@click='goHome' color='white') Go to home page

  Prompt
</template>

<script>
import {set} from 'lodash'
import Blockly from 'blockly'
import Prompt from './components/Prompt'
import {mapState} from 'vuex'
import defaultWorkspace from './assets/workspaces/default'
import store from 'store'

export default {
  name: 'App',

  components: {
    Prompt
  },

  computed: {
    ...mapState(['reloads'])
  },

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
    set(window, 'app.version', this.$v)
    set(window, 'app.$', this)

    // Load default workspace if no localstorage
    if (!localStorage.currentFactory) {
      Object.keys(defaultWorkspace.localStorage).forEach(key => {
        store.set(key, defaultWorkspace.localStorage[key])
      })
    }

    /**
     * Override notify to update status
     * @todo Move this to a utility module
     */
    const origNotify = this.$q.notify
    this.$q.notify = (...args) => {
      args.forEach(arg => {
        this.$store.commit('set', ['lastEvent', {
          log: arg.message,
          data: arg
        }])
      })
      origNotify(...args)
    }
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
