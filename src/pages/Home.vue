<template lang="pug">
q-page
  section.content.flex.flex-center
    div.max-width-100
      q-card.max-width-100(style='width: 550px; margin: auto')
        q-card-section.text-center
          img.q-mt-lg.max-width-100(src='~assets/logo-title.png' style="width: 500px;")
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
