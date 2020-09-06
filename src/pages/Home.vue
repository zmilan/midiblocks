<template lang="pug">
  q-page
    section.content.flex.flex-center
      q-card(style='width: 450px')
        q-card-section.text-center
          img.q-mt-lg(src='~assets/logo-title.png' height=60)
          p.text-subtitle2.q-mt-lg A programmable MIDI Platform
          p.text-subtitle1 coming soon
          p
            small (but feel free to explore anyways)
          p
            small <a href="https://github.com/midiblocks/midiblocks">GitHub</a> &middot; <a href="https://twitter.com/midiblocks">Twitter</a>
</template>

<script>
export default {
  name: 'PageHome'
}
</script>
