<template lang="pug">
q-table(:data='blocks' :columns='columns')
</template>

<script>
export default {
  name: 'MidiblocksTable',

  props: ['midiblocks'],

  data () {
    const blocks = []

    Object.keys(this.$props.midiblocks).forEach(key => {
      blocks.push({
        title: 'untitled',
        description: this.$props.midiblocks[key].description,
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
          align: 'left'
        },
        {
          label: 'Updated',
          field: 'updated',
          name: 'updated',
          align: 'left'
        },
        {
          label: 'Description',
          field: 'description',
          name: 'description',
          align: 'left'
        }
      ]
    }
  }
}
</script>