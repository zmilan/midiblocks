<template lang="pug">
q-table.midiblocks-table(:data='blocks' :columns='columns' row-key='uuid')
  template(v-slot:body-cell-actions='props')
    q-td(:props='props')
      q-btn.bg-secondary(@click='loadMidiblock(props.key)') Load
</template>

<script>
import store from 'store'

/**
 * Displays a table containing all available midiblocks
 */
export default {
  name: 'MidiblocksTable',

  props: ['midiblocks'],

  data () {
    const blocks = []

    Object.keys(this.$props.midiblocks).forEach(key => {
      blocks.push({
        title: this.$props.midiblocks[key].title || 'untitled',
        description: this.$props.midiblocks[key].description || '',
        updated: this.$props.midiblocks[key].updated,
        uuid: this.$props.midiblocks[key].uuid
      })
    })

    return {
      blocks,

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
    loadMidiblock (key) {
      store.set('currentStudio', this.midiblocks[key])
      this.$store.commit('tally', 'reloads')
    }
  }
}
</script>

<style lang="sass">
.midiblocks-table tbody tr td:nth-child(3)
  white-space: pre
</style>