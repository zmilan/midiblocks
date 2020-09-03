<template lang="pug">
q-item(clickable='' tag='a' target='_blank' :href='link')
  q-item-section
    q-item-label {{ title }}
    q-item-label(caption='')
      | {{ description }}
</template>

<script>
export default {
  name: 'EssentialLink',
  props: ['title', 'description', 'link']
}
</script>
