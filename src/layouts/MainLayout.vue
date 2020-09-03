<template lang="pug">
q-layout(view='lHh Lpr lFf')
  q-header(elevated)
    q-toolbar
      q-btn(flat dense round icon='menu' aria-label='Menu' @click='leftDrawerOpen = !leftDrawerOpen')
      q-toolbar-title
        router-link.text-decoration-none.text-white(:to='{name: "Home"}')
          img.q-mr-sm(src='/favicon.png' height=32 style='vertical-align: middle')
          | Midiblocks
        small.q-ml-sm(style='font-size: .65em') {{version}}
      div Quasar v{{ $q.version }}
  q-drawer(v-model='leftDrawerOpen' show-if-above bordered content-class='bg-grey-1')
    q-list
      q-item-label.text-grey-8(header)
        | Essential Links
      MainNavLink(v-for='link in links' :key='link.title' v-bind='link')
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
import {get} from 'lodash'
import pkg from '../../package.json'
import MainNavLink from 'components/mainNavPanel/Link.vue'

export default {
  name: 'MainLayout',

  components: { MainNavLink },
  
  data () {
    return {
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
    let boot = get(window, 'app.boot')

    if (boot) {
      this.loadLayout(boot)
    } else {
      this.$axios.get(this.$api.base + 'boot')
        .catch(err => {
          this.errors.boot = err
        })
    }
  },

  methods: {
    /**
     * Parses layout data so that the page renders completely
     */
    loadLayout (data) {
      console.log('data', data)
    }
  }
}
</script>
