<template lang="pug">
  q-page
    section.content.flex.flex-center
      div
        q-card(style='width: 550px; margin: auto')
          q-card-section.text-center
            img.q-mt-lg(src='~assets/logo-title.png' style="width: 500px; max-width: 100%")
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
