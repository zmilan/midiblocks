<template lang="pug">
q-layout(view='lHh Lpr lFf')
  //- Header
  q-header(elevated)
    q-toolbar
      q-btn(flat dense round icon='fas fa-bars' aria-label='Menu' @click='leftDrawerOpen = !leftDrawerOpen')
      q-toolbar-title
        router-link.text-decoration-none.text-white(:to='{name: "Home"}')
          img.q-mr-sm(src='~assets/favicon.png' height=32 style='vertical-align: middle')
          | Midiblocks
        small.q-ml-sm(style='font-size: .65em') {{version}}
      div Quasar v{{ $q.version }}

  //- Sidebar
  q-drawer(v-model='leftDrawerOpen' show-if-above bordered content-class='bg-grey-1')
    q-list(v-if='boot.mainNavPanel')
      q-item-label.text-grey-8(header) Navigation
      MainNavLink(v-for='link in boot.mainNavPanel.links' :key='link.title' v-bind='link')

  //- Page
  q-page-container
    router-view

  //- Errors
  q-dialog(v-model='!!errors.boot' persistent )
    q-card.bg-negative
      q-card-section.row.items-center
        q-avatar.text-negative(icon='fas fa-exclamation-triangle' color='white')
        span.q-ml-sm.text-white {{errors.boot}}
      q-card-actions(align='right')
        q-btn.bg-white(:to='{name: "Home"}') Go to home page
</template>

<script>
import {get, set} from 'lodash'
import pkg from '../../package.json'
import MainNavLink from 'components/mainNavPanel/Link.vue'

export default {
  name: 'MainLayout',

  components: { MainNavLink },
  
  data () {
    return {
      boot: {},
      
      version: pkg.version,
      leftDrawerOpen: false,
      links: [],

      // Will display different modals based on error messages
      errors: {
        boot: ''
      }
    }
  },

  /**
   * Load and setup payload
   */
  mounted () {
    this.$nextTick(() => {
      // Setup global `app`
      set(window, 'app.version', this.$v)

      // Load boot data
      this.boot = get(window, 'app.boot', {})
      if (!this.boot.mainNavPanel) {
        this.$axios.get(this.$api.base + 'boot')
          .then(resp => {
            this.boot = resp.data
            set(window, 'app.boot', resp.data)
          })
          .catch(err => {
            this.errors.boot = err
          })
      }
    })
  }
}
</script>
