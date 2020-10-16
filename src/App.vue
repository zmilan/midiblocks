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
    ...mapState(['reloads', 'settings'])
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
    if (!localStorage.blocks) {
      Object.keys(defaultWorkspace.localStorage).forEach(key => {
        store.set(key, defaultWorkspace.localStorage[key])
      })
      this.$store.commit('set', ['blocks', defaultWorkspace.localStorage.blocks])
      this.$store.commit('set', ['midiblocks', defaultWorkspace.localStorage.midiblocks])
    }

    /**
     * Override notify to update status
     * @todo Move this to a utility module
     */
    const origNotify = this.$q.notify
    this.$q.notify = (...args) => {
      args.forEach(arg => {
        this.$store.commit('set', ['lastEvent', {log: arg.message}])
      })
      origNotify(...args)
    }

    /**
     * Override console warnings and errors
     */
    const err = console.error
    console.error = (...args) => {
      this.$store.commit('push', ['eventLogs.error', {log: args[0]}])
      err(...args)
    }
    const warn = console.warn
    console.warn = (...args) => {
      this.$store.commit('push', ['eventLogs.warn', {log: args[0]}])
      warn(...args)
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
