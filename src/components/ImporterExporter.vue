<template lang="pug">
q-btn(type='a' color='secondary' icon='fas fa-user' @click='isDialogVisible = true') Import/Export Profile

  q-dialog(v-model='isDialogVisible')
    q-card
      q-card-section
        .text-h6
          i.fas.fa-user
          span.q-ml-md Import / Export Profile
      q-card-section
        //- @todo Add link to Patreon here
        p We plan on adding user profiles soon, but for now use the buttons below to import and export your midiblocks and workspaces.
      q-card-actions(align='right')
        q-btn(flat @click='isDialogVisible = false') Cancel
        q-space
        q-btn(color='secondary' icon='fas fa-download' @click='importState') Import
        q-btn(color='secondary' icon='fas fa-upload' @click='exportState') Export
</template>

<script>
import store from 'store'
import fileDownload from 'js-file-download'

/**
 * Button with dialog for Importing/Exporting app states
 */
export default {
  name: 'ImporterExporter',

  data: () => {
    return {
      isDialogVisible: false
    }
  },

  methods: {
    /**
     * Imports a json file to overwrite the apps current state, including localStorage
     */
    importState () {
      console.log('importState')
    },
    
    /**
     * Exports a json file containing the apps current state, including localStorage
     */
    exportState () {
      const data = {
        localStorage: {}
      }
      store.each((val, key) => {
        data.localStorage[key] = val
      })

      const date = new Date()
        .getFullYear()
          + '-' + ('0' + (new Date().getMonth() + 1)).slice(-2)
          + '-' + ('0' + new Date().getDate()).slice(-2)
      fileDownload(JSON.stringify(data, null, 2), `midiblocks-${date}.json`)
    }
  }
}
</script>