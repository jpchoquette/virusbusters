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
  section.blue-screen-section(data-scroll-section, data-scroll-section-id='section4')
    div.section-container(id='scroll-direction3')
      .block-wrapper()
        .section-content.relative
          div.bs-title Corrupted content
          div.bs-content
            p An error has occured.
            p A file downloaded from "BUSTER-COMPUTER" has corrupted the "VIRUS-BUSTERS" server. The current presentation will be terminated.
            p To restore the server, please follow the suggestions below:
            ul
              li Do not panic, we are professionals.
              li
                | Head over to the Virus Busters
                a.mh2.bluescreen--text.underline.ph2.pv1.yellow(href='https://discord.gg/vKWRKtsDCX', target='_blank', style='white-space:nowrap;') DISCORD SERVER
                | and contact one of our representatives
              li New employees will be required to fix the system.
            p.mt4 More information coming shortly. Please reboot.&nbsp;
              span.animate__animated.animate__flash.animate__infinite(style='height: 20px; width: 10px; background-color: white;') .
</template>
<style lang='sass'>
  .blue-screen-section
    position: relative
    .section-container
      height: 150vh !important
      .block-wrapper
        .section-content
          height: 150vh
          background-color: var(--v-bluescreen-base)
          color: white
          font-family: $code-font
          padding: 80px $responsive-gutter-small
          display: flex
          flex-direction: column
          align-items: center
          justify-content: center
          .bs-title
            padding: 10px
            background-color: grey
            color: var(--v-bluescreen-base)
          .bs-content
            font-family: $code-font
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
