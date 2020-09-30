<template lang="pug">
q-dialog(:value='value' @input='$emit("change", $event)')
  q-card(:class='background')
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
 * @prop {Boolean} value The dialog model
 * @prop {String} icon The dialogs icon shown before title (ex, "fas fa-file")
 * @prop {String} title
 * @prop {String} bg The background color
 */
export default {
  name: 'DialogConfirm',

  props: ['value', 'icon', 'title', 'bg'],

  computed: {
    background () {
      return 'bg-' + this.bg
    }
  },

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