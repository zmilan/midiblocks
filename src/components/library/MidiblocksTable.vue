<template lang="pug">
q-table.midiblocks-table(:data='Object.values(midiblocks)' :columns='columns' row-key='uuid')
  template(v-slot:body-cell-actions='props')
    q-td(:props='props')
      slot(:midiblock='midiblocks[props.key]')
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
    return {
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
  }
}
</script>

<style lang="sass">
.midiblocks-table tbody tr td:nth-child(3)
  white-space: pre
</style>