<template lang="pug">
q-page.full-height
  section.content
    h1 Settings

    .row
      .col-12.col-md-6
        q-card
          q-card-section
            .text-h6 Face Pointer
          q-card-section
            p Enable the Face Pointer to control this app using face gestures. Once you've enabled the webcam, move your head around to move the pointer and smile to either side to click.
          q-card-actions
            q-space
            q-toggle.no-select(color='negative' dark v-model='settings.isFacePointerActive')
              | Face Pointer
              span.q-ml-xs {{settings.isFacePointerActive ? 'enabled' : 'disabled'}}
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'SettingsHome',

  computed: {
    ...mapState(['settings'])
  }
}
</script>