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

  //- Blockly Prompt
  //- @todo move into component
  q-dialog(v-model='prompt.visible')
    q-card
      q-card-section
        h3 {{prompt.message}}
        q-input(ref='promptValue' v-model='prompt.value')
      q-card-actions(align='right')
        q-btn(color='white' flat @click='prompt.visible = false') Cancel
        q-space
        q-btn.text-black(color='secondary' @click='submitPrompt') Done
</template>

<script>
import {set} from 'lodash'
import Blockly from 'blockly'

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
      // @todo move this to store
      errors: {
        generic: ''
      },

      prompt: {
        visible: false,
        message: '',
        value: null,
        callback: null
      }
    }
  },

  mounted () {
    this.$root.$on('prepareRoute', this.prepareRoute)
    this.$root.$on('error', this.onError)
    set(window, 'app.version', this.$v)
    set(window, 'app.$', this)

    Blockly.prompt = this.onBlocklyPrompt
  },

  destroyed () {
    this.$root.$off('error', this.onError)
  },

  methods: {
    onBlocklyPrompt (message, defaultValue, callback) {
      this.prompt.visible = true
      this.prompt.message = message
      this.prompt.value = defaultValue
      this.prompt.callback = callback

      this.$nextTick(() => {
        this.$refs.promptValue.focus()
      })
    },

    /**
     * @todo move into component
     */
    submitPrompt () {
      if (this.prompt.callback) {
        this.prompt.callback(this.prompt.value)
        console.log('callback', this.prompt.value)
      }
      this.prompt.visible = false
    },
    
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
