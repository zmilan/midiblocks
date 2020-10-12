<template lang="pug">
div
  q-table.midiblocks-table(:data='midiblockValues' :columns='columns' row-key='uuid')
    template(v-slot:body-cell-actions='props')
      q-td(:props='props')
        q-btn.q-mr-lg(color='negative' @click='deleteMidiblock(props)' icon='fas fa-trash') Delete
        q-btn.q-mr-lg(color='tertiary' @click='cloneMidiblock(props)' icon='fas fa-copy') Remix
        q-btn(color='secondary' @click='loadMidiblock(props)' icon='fas fa-folder-open') Load
  DialogDeleteMidiblock(v-model='dialog.deleteMidiblock' :midiblock='dialogMidiblock')
</template>

<script>
import store from 'store'
import {mapState} from 'vuex'
import DialogDeleteMidiblock from '../dialog/DeleteMidiblock'
import {v4 as uuidv4} from 'uuid'

/**
 * Displays a table containing all available midiblocks
 */
export default {
  name: 'MidiblocksTable',

  components: {DialogDeleteMidiblock},

  computed: {
    ...mapState(['midiblocks']),

    midiblockValues () {
      return Object.values(this.midiblocks)
    }
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
    },

    /**
     * Clone a midiblock
     */
    cloneMidiblock (props) {
      const block = Object.assign({}, this.midiblocks[props.key])
      block.uuid = uuidv4()
      block.title += ' [Remixed]'

      this.$store.commit('set', [`midiblocks["${block.uuid}"]`, block])
      store.set('currentStudio', block)
      store.set('midiblocks', this.midiblocks)
      this.$q.notify({
        type: 'positive',
        message: `Midilock "${block.title}" remixed!`,
        timeout: 3000
      })

      // Reroute
      if (this.$route.name === 'Studio') {
        this.$store.commit('tally', 'reloads')
      } else {
        this.$router.push({name: 'Studio'})
      }
    }
  }
}
</script>

<style lang="sass">
.midiblocks-table tbody tr td:nth-child(3)
  white-space: pre
</style>