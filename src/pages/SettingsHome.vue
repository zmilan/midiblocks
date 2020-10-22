<template lang="pug">
q-page.full-height
  section.content
    h1 Settings

    .row
      .col-12.col-md-6
        q-card.q-mb-lg
          q-card-section
            .text-h6 Face Pointer
          q-card-section
            p Enable the Face Pointer to control this app using face gestures. Once you've enabled the webcam, move your head around to move the pointer and smile to either side to click.
          q-card-actions
            q-space
            q-toggle.no-select(color='negative' dark v-model='settings.isFacePointerActive')
              | Face Pointer
              span.q-ml-xs {{settings.isFacePointerActive ? 'enabled' : 'disabled'}}
        q-card
          q-card-section
            .text-h6 Face Pointer Toggle
          q-card-section
            p Enable this to always show the Face Pointer toggle, allowing you to quickly switch it on/off from any screen
          q-card-actions
            q-space
            q-toggle.no-select(color='negative' dark v-model='settings.isFacePointerToggleAlwaysOn')
              | Face Pointer toggle always-on
              span.q-ml-xs is {{settings.isFacePointerToggleAlwaysOn ? 'visible' : 'hidden'}}
</template>

<script>
import {mapState} from 'vuex'
import store from 'store'

export default {
  name: 'SettingsHome',

  computed: {
    ...mapState(['settings'])
  },

  watch: {
    settings: {
      deep: true,
      handler (settings) {
        store.set('facepointer.alwaysOn', settings.isFacePointerToggleAlwaysOn)
      }
    }
  }
}
</script>