<template lang="pug">
q-dialog(v-model='isVisible')
  q-card
    q-card-section
      .text-h6
        i.fas.fa-folder-open
        span.q-ml-md Load block
</template>

<script>
/**
 * Displays a dialog box for grabbing a Midiblock
 */
export default {
  name: 'DialogLoadBlock',

  props: ['model'],

  watch: {
    isVisible (state) {
      this.$emit('change', state)
    },

    '$props.model' (state) {
      this.isVisible = state
    }
  },

  data () {
    return {
      isVisible: this.$props.model
    }
  }
}
</script>