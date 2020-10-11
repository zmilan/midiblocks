<template lang="pug">
q-dialog(v-model='value' maximized @input='$emit("input", $event)')
  q-card.full-height.flex.column
    q-card-section(style='flex: 0 0 auto')
      .text-h6
        i.fas.fa-folder-open
        span.q-ml-md Load block
    q-card-section
      BlocksGrid
    q-card-actions(style='flex: 0 0 auto')
      q-btn.full-width(color='negative' @click='$emit("input", $event.target.value)') Cancel
</template>

<script>
import BlocksGrid from '../library/BlocksGrid'
import store from 'store'

/**
 * Displays a dialog box for grabbing a Midiblock
 */
export default {
  name: 'DialogLoadBlock',

  props: ['value', 'type'],

  components: {BlocksGrid}
}
</script>