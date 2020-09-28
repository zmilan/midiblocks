<template lang="pug">
q-btn(type='a' color='secondary' icon='fas fa-user' @click='showModal') Import/Export Profile
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
        q-file.hidden(ref='file' v-model='file')
        q-space
        q-btn(color='secondary' icon='fas fa-download' @click='importState' :loading='isBusy') Import
        q-btn(color='secondary' icon='fas fa-upload' @click='exportState' :loading='isBusy') Export
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
      isBusy: false,
      file: null,
      isDialogVisible: false
    }
  },

  watch: {
    /**
     * Import file
     */
    file (file) {
      if (file) {
        try {
          file.text()
            .then(data => {
              data = JSON.parse(data)
              Object.keys(data.localStorage).forEach(key => {
                store.set(key, data.localStorage[key])
              })

              this.$q.notify({
                type: 'positive',
                message: 'Import complete!',
                timeout: 3000
              })

              this.$store.commit('tally', 'reloads')
            })
            .catch(err => this.showError(err))
        } catch (err) {
          this.showError(err)
        }
      }
    }
  },

  methods: {
    /**
     * Imports a json file to overwrite the apps current state, including localStorage
     */
    importState (ev) {
      this.isBusy = true
      this.$nextTick(() => {
        this.$refs.file.pickFiles(ev)
      })
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

      this.isDialogVisible = false
    },

    /**
     * Shows the modal and clears the file
     */
    showModal () {
      this.file = null
      this.isDialogVisible = true
    },

    /**
     * Error message
     */
    showError (err) {
      this.$q.notify({
        type: 'negative',
        message: `Error importing file: ${err.toString()}`,
        timeout: 5000
      })
      console.warn('Error importing file:', err)
      this.isBusy = false
    }
  }
}
</script>