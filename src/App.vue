<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'App',

  /**
   * Sets up WP API and initial payload
   */
  mounted () {
    if (process.env.DEV) {
      
    }
  }
}
</script>
