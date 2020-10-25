<template lang="pug">
q-layout(view='lHh Lpr lFf')
  //- Header
  q-header.main-header-left-pixel-gap-fix
    q-toolbar
      q-btn(flat dense round icon='fas fa-bars' aria-label='Menu' @click='leftDrawerOpen = !leftDrawerOpen')
      q-toolbar-title(style='flex: 0 0 auto')
        router-link.text-decoration-none.text-white(:to='{name: "Home"}')
          img.gt-sm.q-mr-sm(src='~assets/logo-title.png' height=32 style='vertical-align: middle')
          img.lt-md.q-mr-sm(src='~assets/logo-title-favicon.png' height=32 style='vertical-align: middle')
        small.gt-xs.q-ml-sm.text-secondary(style='font-size: .65em; display: inline-block; transform: translate(0, -3px)') {{version}}
      q-space

      //- Studio controls
      template(v-if='studio.hasBookmarks && $route.name === "Studio"')
        span.q-mr-sm 📌
        q-btn-group(push dense)
          q-btn(color='tertiary' size='sm' icon='fas fa-caret-square-left' @click='$root.$emit("studio.prevBookmark")')
          q-btn(color='tertiary' size='sm' icon='fas fa-caret-square-right' @click='$root.$emit("studio.nextBookmark")')
        q-space

      //- Handsfree toggle
      q-toggle.no-select(v-if='settings.isFacePointerActive || settings.isFacePointerToggleAlwaysOn' color='negative' dark v-model='settings.isFacePointerActive')
        | Handsfree
        span.gt-sm.q-ml-xs {{settings.isFacePointerActive ? 'enabled' : 'disabled'}}

      //- MIDI toggle
      q-toggle.no-select(color='negative' dark v-model='isMIDIActive')
        | MIDI
        span.gt-sm.q-ml-xs {{isMIDIActive ? 'enabled' : 'disabled'}}

  //- Sidebar
  q-drawer.main-sidebar.flex-drawer(v-model='leftDrawerOpen' show-if-above bordered :breakpoint='1400')
    q-toolbar.bg-primary.text-white
    q-list.q-pa-sm
      template(v-if='mainNavPanel')
        MainNavLink(v-for='link in mainNavPanel.links' :key='link.title' v-bind='link')
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
        q-badge.q-mr-sm.cursor-pointer(v-if='eventLogs.warn.length' color='block-orange' @click='dialog.warning = true') {{eventLogs.warn.length}}
        span.text-info Last event:
        span.text-white.q-ml-sm {{lastEvent.log}}

  //- Dialogs
  DialogConfirm(v-model='dialog.error'
    @accept='clearErrorLogs'
    cancel-label='Close'
    accept-label='Clear errors'
    bg='negative'
    icon='fas fa-bug'
    title='Error Logs')
    q-table(:data='eventLogs.error' :columns='columns.error')
      template(v-slot:body-cell-log='props')
        q-td.white-space-normal(:props='props') {{props.row.log}}

  DialogConfirm(v-model='dialog.warning'
    @accept='clearWarningLogs'
    cancel-label='Close'
    accept-label='Clear warnings'
    bg='block-orange'
    icon='fas fa-bug'
    title='Warning Logs')
    q-table(:data='eventLogs.warn' :columns='columns.error')
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
    ...mapState(['user', 'lastEvent', 'eventLogs', 'studio', 'settings'])
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
      mainNavPanel: {
        links: [
          {
            title: 'Home',
            description: 'Get an overview of what Midiblocks is about',
            link: '/',
            icon: 'fas fa-home'
          },
          {
            title: 'Studio',
            description: 'Visually map and program your MIDI devices',
            link: '/studio',
            icon: 'fas fa-puzzle-piece fa-flip-both'
          },
          {
            title: 'Factory',
            description: 'Create custom blocks with JavaScript',
            link: '/factory',
            icon: 'fas fa-laptop-code'
          },
          {
            title: 'Library',
            description: 'Browse our library of user created Midiblocks and learn how to use them',
            link: '/library',
            icon: 'fas fa-cubes'
          },
          {
            title: 'Settings',
            description: 'Toggle Handsfree mode and other settings',
            link: '/settings',
            icon: 'fas fa-cogs'
          },
          {
            title: 'Documentation',
            description: 'Learn how to use Midiblocks and Handsfree.js',
            link: '/docs',
            icon: 'fas fa-book'
          }
        ]
      },

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
