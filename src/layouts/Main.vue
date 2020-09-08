<template lang="pug">
q-layout(view='lHh Lpr lFf')
  //- Header
  q-header.main-header-left-pixel-gap-fix
    q-toolbar
      q-btn(flat dense round icon='fas fa-bars' aria-label='Menu' @click='leftDrawerOpen = !leftDrawerOpen')
      q-toolbar-title
        router-link.text-decoration-none.text-white(:to='{name: "Home"}')
          img.q-mr-sm(src='~assets/logo-title.png' height=32 style='vertical-align: middle')
        small.q-ml-sm.text-secondary(style='font-size: .65em; display: inline-block; transform: translate(0, -3px)') {{version}}
      q-space
      q-toggle.no-select(color='negative' dark v-model='isMIDIActive') MIDI is {{isMIDIActive ? 'enabled' : 'disabled'}}

  //- Sidebar
  q-drawer.main-sidebar.flex-drawer(v-model='leftDrawerOpen' show-if-above bordered)
    q-toolbar.bg-primary.text-white
      //- q-btn(flat dense round icon='fas fa-bars' aria-label='Menu' @click='leftDrawerOpen = !leftDrawerOpen')
    q-list.q-pa-sm
      template(v-if='boot.mainNavPanel')
        MainNavLink(v-for='link in boot.mainNavPanel.links' :key='link.title' v-bind='link')
      .text-center(v-else)
        q-spinner(color='primary')
    q-space
    q-item
      q-item-section
        q-btn(type='a' color='secondary' href='/wp-admin') Login

  //- Page
  q-page-container
    router-view
</template>

<script>
import {get, set} from 'lodash'
import pkg from '../../package.json'
import MainNavLink from 'components/mainNavPanel/Link.vue'
import {mapState} from 'vuex'

export default {
  name: 'MainLayout',

  components: { MainNavLink },

  computed: {
    ...mapState(['user'])
  },

  watch: {
    leftDrawerOpen () {
      Array.from(Array(20).keys()).forEach(interval => {
        setTimeout(() => {
          window.dispatchEvent(new Event('resize'))
        }, interval * 25)
      })
    }
  },
  
  data () {
    return {
      boot: {},

      isMIDIActive: false,
      
      version: pkg.version,
      leftDrawerOpen: false,
      links: []
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
        this.$store.dispatch('apiGet', 'boot')
          .then(resp => {
            this.boot = resp.data
            set(window, 'app.boot', resp.data)
          })
          .catch(err => {
            this.$root.$emit('error', err)
          })
      }
    })
  }
}
</script>
