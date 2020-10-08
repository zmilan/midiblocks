<template lang="pug">
q-layout(view='lHh Lpr lFf')
  //- Header
  q-header.main-header-left-pixel-gap-fix
    q-toolbar
      q-btn(flat dense round icon='fas fa-bars' aria-label='Menu' @click='leftDrawerOpen = !leftDrawerOpen')
      q-toolbar-title
        router-link.text-decoration-none.text-white(:to='{name: "Home"}')
          img.gt-sm.q-mr-sm(src='~assets/logo-title.png' height=32 style='vertical-align: middle')
          img.lt-md.q-mr-sm(src='~assets/logo-title-favicon.png' height=32 style='vertical-align: middle')
        small.gt-xs.q-ml-sm.text-secondary(style='font-size: .65em; display: inline-block; transform: translate(0, -3px)') {{version}}
      q-space
      q-toggle.no-select(color='negative' dark v-model='isMIDIActive') MIDI is {{isMIDIActive ? 'enabled' : 'disabled'}}

  //- Sidebar
  q-drawer.main-sidebar.flex-drawer(v-model='leftDrawerOpen' show-if-above bordered)
    q-toolbar.bg-primary.text-white
    q-list.q-pa-sm
      template(v-if='boot.mainNavPanel')
        MainNavLink(v-for='link in boot.mainNavPanel.links' :key='link.title' v-bind='link')
      .text-center(v-else)
        q-spinner(color='primary')
    q-space
    q-list.q-pb-sm(dense)
      q-item
        ImporterExporter

  //- Page
  q-page-container
    router-view

  //- Status bar
  q-footer
    q-bar.bg-inactive
      div
        q-badge.q-mr-sm.cursor-pointer(v-if='eventLogs.error.length' color='negative' @click='dialog.error = true') {{eventLogs.error.length}}
        q-badge.q-mr-sm.cursor-pointer(v-if='eventLogs.warn.length' color='warning' @click='dialog.warning = true') {{eventLogs.warn.length}}
        span.text-info Last event:
        span.text-white.q-ml-sm {{lastEvent.log}}

  //- Dialogs
  DialogConfirm(v-model='dialog.error'
    @accept='clearErrorLogs'
    bg='negative'
    icon='fas fa-bug'
    title='Error Logs')
    q-table(:data='eventLogs.error' :columns='columns.error')
      template(v-slot:body-cell-log='props')
        q-td.white-space-normal(:props='props') {{props.row.log}}
</template>

<script>
import {get, set} from 'lodash'
import pkg from '../../package.json'
import MainNavLink from 'components/mainNavPanel/Link'
import ImporterExporter from 'components/ImporterExporter'
import DialogConfirm from 'components/dialog/Confirm'
import {mapState} from 'vuex'

export default {
  name: 'MainLayout',

  components: {ImporterExporter, MainNavLink, DialogConfirm},

  computed: {
    ...mapState(['user', 'lastEvent', 'eventLogs'])
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
      // @todo remove
      boot: {},

      columns: {
        error: [
          {
            label: 'Log',
            field: 'log',
            name: 'log',
            sortable: true,
            align: 'left'
          }
        ]
      },

      // Dialog models
      dialog: {
        error: false,
        warning: false
      },

      isMIDIActive: false,
      
      version: pkg.version,
      leftDrawerOpen: false,
      links: []
    }
  },

  /**
   * Load and setup payload
   * - Binds global navigation shortcuts
   */
  mounted () {
    this.$nextTick(() => {
      // Load boot data
      this.boot = get(window, 'app.boot', {})
      if (!this.boot.mainNavPanel) {
        this.$store.dispatch('apiGet', 'boot')
          .then(({data}) => {
            this.boot = data
            set(window, 'app.boot', data)
          })
          .catch(err => {
            this.$root.$emit('error', err)
          })
      }
    })

    this.$mousetrap.bind('s', ev => {
      ev.preventDefault()
      this.$router.push({name: 'Studio'})
    })

    this.$mousetrap.bind('f', ev => {
      ev.preventDefault()
      this.$router.push({name: 'Factory'})
    })
  },

  destroyed () {
    this.$mousetrap.unbind('s')
    this.$mousetrap.unbind('f')
  },

  methods: {
    /**
     * Clear logs
     */
    clearErrorLogs () {
      this.$store.commit('set', ['eventLogs.error', []])
    },
    clearWarningLogs () {
      this.$store.commit('set', ['eventLogs.error', []])
      this.$store.commit('set', ['eventLogs.warn', []])
    },
    clearAllLogs () {
      this.$store.commit('set', ['eventLogs.error', []])
      this.$store.commit('set', ['eventLogs.warn', []])
    }
  }
}
</script>
