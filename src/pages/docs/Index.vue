<template lang="pug">
q-page.full-height
  section.content
    h1 Documentation

    .row.q-col-gutter-md
      .col-12.col-sm-6
        q-card
          q-card-section
            div.text-h2 Midiblocks
          q-card-section
            q-video(:ratio='16/9' src='//www.youtube.com/embed/bcDOv09-5RI?rel=0')
          q-card-section
            p Learn what Midiblocks is about, how to create different kinds of apps, and more!
          q-card-actions
            q-btn.full-width(disabled) Coming soon

      .col-12.col-sm-6
        q-card
          q-card-section
            div.text-h2 Handsfree.js
          q-card-section
            q-video(:ratio='16/9' src='//www.youtube.com/embed/lb-Bkejm0Pg?rel=0')
          q-card-section
            p Learn how to add Face Pointers and gesture recognition to your own projects (outside of Midiblocks) via CDN and NPM
          q-card-actions
            q-btn.bg-secondary.full-width(:to='{name: "DocsHandsfree"}') Explore the docs
</template>

<script>
export default {
  name: 'LibraryHome'
}
</script>