<template lang="pug">
  MonacoEditor(v-model='code' language='javascript' :options='options' theme='vs-dark')
</template>

<script>
import MonacoEditor from 'vue-monaco'

export default {
  name: 'PageCode',

  components: {MonacoEditor},
  
  data: () => ({
    code: '',
    
    options: {
      automaticLayout: true,
      minimap: {enabled: false}
    }
  })
}
</script>