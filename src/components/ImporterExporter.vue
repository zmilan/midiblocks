<template lang="pug">
q-btn.text-black(type='a' color='secondary' icon='fas fa-user' @click='isDialogVisible = true')
  span.q-ml-sm Import/Export Profile

  q-dialog(v-model='isDialogVisible')
    q-card
      q-card-section
        .text-h6
          i.fas.fa-user
          span.q-ml-md Import / Export Profile
      q-card-actions(align='right')
        q-btn(flat @click='isDialogVisible = false') Cancel
        q-space
        q-btn.text-black(color='secondary' icon='fas fa-upload') Import
        q-btn.text-black(color='secondary' icon='fas fa-download') Export
</template>

<script>
/**
 * Button with dialog for Importing/Exporting app states
 */
export default {
  name: 'ImporterExporter',

  data: () => {
    return {
      isDialogVisible: false
    }
  }
}
</script>