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
      readOnly: true      
    }
  })
}
</script>