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
</template>

<script>
import pkg from '../../package.json'
import MainNavLink from 'components/mainNavPanel/Link.vue'

const linksData = [
  {
    title: 'Docs',
    caption: 'quasar.dev',
    icon: 'school',
    link: 'https://quasar.dev'
  },
  {
    title: 'Github',
    caption: 'github.com/quasarframework',
    icon: 'code',
    link: 'https://github.com/quasarframework'
  },
  {
    title: 'Discord Chat Channel',
    caption: 'chat.quasar.dev',
    icon: 'chat',
    link: 'https://chat.quasar.dev'
  },
  {
    title: 'Forum',
    caption: 'forum.quasar.dev',
    icon: 'record_voice_over',
    link: 'https://forum.quasar.dev'
  },
  {
    title: 'Twitter',
    caption: '@quasarframework',
    icon: 'rss_feed',
    link: 'https://twitter.quasar.dev'
  },
  {
    title: 'Facebook',
    caption: '@QuasarFramework',
    icon: 'public',
    link: 'https://facebook.quasar.dev'
  },
  {
    title: 'Quasar Awesome',
    caption: 'Community Quasar projects',
    icon: 'favorite',
    link: 'https://awesome.quasar.dev'
  }
];

export default {
  name: 'MainLayout',

  components: { MainNavLink },
  
  data () {
    return {
      version: pkg.version,
      leftDrawerOpen: false,
      links: linksData
    }
  }
}
</script>
