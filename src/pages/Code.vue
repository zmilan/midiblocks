<template lang="pug">
  code
    pre {{workspace.code}}
</template>

<script>
import {mapState} from 'vuex'

export default {
  name: 'PageCode',
  computed: {
    ...mapState(['workspace'])
  }
}
</script>