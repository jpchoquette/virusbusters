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
            p A file downloaded from "BUSTER-COMPUTER" has corrupted the "VIRUS-BUSTERS" server. The current presentation will be terminated.
            p To restore the server, please follow the suggestions below:
            ul
              li Do not panic, we are professionals.
              li
                | Head over to the Virus Busters
                a.mh2.white--text.underline(href='https://discord.gg/zaHsXaXBGJ', target='_blank') DISCORD SERVER
                | and contact one of our representatives
              li We are currently looking for new employees to fix our current employees computers.
            p.mt4 More information coming soon...
</template>
<style lang='sass'>
  .blue-screen-section
    position: relative
    .section-container
      height: 150vh
      .block-wrapper
        .section-content
          height: 150vh
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
            ul
              margin-top: 40px
              list-style-type: square
              li:not(:last-child)
                margin-bottom: 10px
            p
              font-family: inherit
</style>
