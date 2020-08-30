<template lang="pug">
  MonacoEditor(v-model='workspace.code' language='javascript' :options='options' theme='vs-dark')
</template>

<script>
import MonacoEditor from 'vue-monaco'
import {mapState} from 'vuex'

export default {
  name: 'PageCode',

  components: {MonacoEditor},
  
  computed: {
    ...mapState(['workspace'])
  },

  data: () => ({
    // @see
    options: {
      automaticLayout: true,
      readOnly: true,
      minimap: {enabled: false}
    }
  })
}
</script>