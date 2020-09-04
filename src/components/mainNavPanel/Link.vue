<template lang="pug">
q-item(clickable tag='a' :to='link' exact)
  q-item-section(v-if='link' avatar)
    img(v-if='title !== "Home"' src='~/assets/favicon.png' style='height: 32px')
    q-icon(v-else :name='icon' color='primary')
  q-item-section
    q-item-label {{ title }}
    q-item-label(caption)
      | {{ description }}
</template>

<script>
export default {
  name: 'EssentialLink',
  props: ['title', 'description', 'link', 'icon']
}
</script>
