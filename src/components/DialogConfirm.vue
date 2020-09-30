<template lang="pug">
q-dialog(:value='value' @input='$emit("change", $event)')
  q-card
    q-card-section
      .text-h6
        i(:class='icon')
        span.q-ml-md {{title}}
    q-card-section
      slot
    q-card-actions(align='right')
      q-btn(flat @click='decline') Cancel
      q-space
      q-btn(color='secondary' @click='accept') Yes
</template>

<script>
/**
 * Displays a Yes/No confirmation dialog
 * 
 * @props {Boolean} isVisible The dialog model
 */
export default {
  name: 'DialogConfirm',

  props: ['value', 'icon', 'title'],

  methods: {
    accept () {
      this.$emit('accept')
      this.isVisible = false
    },
    decline () {
      this.$emit('decline')
      this.isVisible = false
    }
  }
}
</script>