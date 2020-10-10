<template lang="pug">
div
  q-table.midiblocks-table(:data='Object.values(midiblocks)' :columns='columns' row-key='uuid')
    template(v-slot:body-cell-actions='props')
      q-td(:props='props')
        q-btn.q-mr-xl(color='negative' @click='deleteMidiblock(props)' icon='fas fa-trash') Delete
        q-btn(color='secondary' @click='loadMidiblock(props)' icon='fas fa-folder-open') Load
  DialogDeleteMidiblock(v-model='dialog.deleteMidiblock' :midiblock='dialogMidiblock')   
</template>

<script>
import store from 'store'
import {mapState} from 'vuex'
import DialogDeleteMidiblock from '../dialog/DeleteMidiblock'

/**
 * Displays a table containing all available midiblocks
 */
export default {
  name: 'MidiblocksTable',

  components: {DialogDeleteMidiblock},

  computed: {
    ...mapState(['midiblocks'])
  },

  data () {
    return {
      // The midiblock to use inside a dialog
      dialogMidiblock: null,
      
      // Dialog models
      dialog: {
        deleteMidiblock: false
      },
      
      // Table columns
      columns: [
        {
          label: 'Title',
          field: 'title',
          name: 'title',
          sortable: true,
          align: 'left'
        },
        {
          label: 'Updated',
          field: 'updated',
          name: 'updated',
          sortable: true,
          align: 'left'
        },
        {
          label: 'Description',
          field: 'description',
          name: 'description',
          sortable: true,
          align: 'left'
        },
        {
          label: 'Actions',
          name: 'actions',
          align: 'left'
        }
      ]
    }
  },

  methods: {
    /**
     * Loads the midiblock
     */
    loadMidiblock (props) {
      const midiblock = this.midiblocks[props.key]
      
      // Load block
      store.set('currentStudio', midiblock)
      this.$q.notify({
        type: 'positive',
        message: `Midilock "${midiblock.title}" loaded!`,
        timeout: 3000
      })

      // Reroute
      if (this.$route.name === 'Studio') {
        this.$store.commit('tally', 'reloads')
      } else {
        this.$router.push({name: 'Studio'})
      }
    },

    /**
     * Delete the midiblock
     */
    deleteMidiblock (props) {
      this.dialogMidiblock = this.midiblocks[props.key]
      this.dialog.deleteMidiblock = true
    }
  }
}
</script>

<style lang="sass">
.midiblocks-table tbody tr td:nth-child(3)
  white-space: pre
</style>