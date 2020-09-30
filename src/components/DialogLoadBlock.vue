<template lang="pug">
q-dialog(v-model='value' maximized @input='$emit("input", $event)')
  q-card.full-height.flex.column
    q-card-section(style='flex: 0 0 auto')
      .text-h6
        i.fas.fa-folder-open
        span.q-ml-md Load block
    q-card-section
      LibraryGrid
        template(slot-scope='props')
          q-btn(color='secondary' @click='$emit("load", props)' icon='fas fa-folder-open') Load Block
    q-card-actions(style='flex: 0 0 auto')
      q-btn.full-width(color='negative' @click='$emit("input", $event.target.value)') Cancel
</template>

<script>
import LibraryGrid from '../components/LibraryGrid'
import store from 'store'

/**
 * Displays a dialog box for grabbing a Midiblock
 */
export default {
  name: 'DialogLoadBlock',

  props: ['value'],

  components: {LibraryGrid}
}
</script>