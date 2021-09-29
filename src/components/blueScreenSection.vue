<script>
export default {
  name: 'BlueScreenSection',
  components: {
  },
  data: () => ({
  })
}
</script>
<template lang='pug'>
  section.blue-screen-section(data-scroll-section, data-scroll-section-id='section4', data-scroll-persistent)
    div.section-container(id='scroll-direction4')
      .block-wrapper()
        .section-content.relative(data-scroll, data-scroll-sticky, data-scroll-target='#scroll-direction4', data-scroll-persistent)
          div.bs-title Corrupted website
          div.bs-content
            p An error has occured.
            p A file downloaded from BUSTER-COMPUTER has corrupted the VIRUS-BUSTERS server. The current presentation will be terminated.
            p To restore thge content
            p
              | Head to the
              a.mh2.white--text.underline DISCORD SERVER
              | to see how you can help.
</template>
<style lang='sass'>
  .blue-screen-section
    position: relative
    .section-container
      .block-wrapper
        .section-content
          background-color: #0000AA
          color: white
          font-family: 'Lucida Console', sans-serif
          padding: 80px $responsive-gutter-small
          display: flex
          flex-direction: column
          align-items: center
          justify-content: center
          .bs-title
            padding: 10px
            background-color: grey
            color: #0000AA
          .bs-content
            font-family: 'Lucida Console', sans-serif
            color: white
            padding: 40px 0
            max-width: 800px
            margin: 0 auto
            p
              font-family: inherit
</style>
