<template lang="pug">
q-dialog(:value='value' @input='$emit("input", $event)')
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
      q-btn(color='secondary' @click='accept') {{acceptLabel || 'Yes'}}
</template>

<script>
/**
 * Displays a Yes/No confirmation dialog
 * 
 * @prop {Boolean} value The dialog model
 * @prop {String} icon The dialogs icon shown before title (ex, "fas fa-file")
 * @prop {String} title
 * @prop {String} bg The background color
 * @prop {String} acceptLabel The label to apply to the accept button
 */
export default {
  name: 'DialogConfirm',

  props: ['value', 'icon', 'title', 'bg', 'accept-label'],

  computed: {
    background () {
      return 'bg-' + this.bg
    }
  },

  mounted () {
    console.log('mounted confirm')
  },

  methods: {
    accept () {
      this.$emit('accept', false)
      this.$emit('input', false)
    },
    decline () {
      this.$emit('decline', false)
      this.$emit('input', false)
    }
  }
}
</script>