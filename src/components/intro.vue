<script>
export default {
  name: 'HelloWorld',

  data: () => ({
  })
}
</script>
<template lang='pug'>
  section(data-scroll-section)
    div.page-intro
      div.flex-grow-1
      img.signature-img.animate__animated.animate__zoomIn(data-scroll data-scroll-speed="2", alt='Virus Busters', src="../assets/images/virus-busters-logo.svg")
      div.landing-description.animate__animated.animate__fadeIn.animate__delay-1s.mt3(data-scroll data-scroll-speed="3")
        p A brand new NFT collection is being uploaded on the
        a(href='https://wax.atomichub.io/explorer/collection/virusbusters', target='_blank')
          img(alt='Virus Busters', src="../assets/images/wax-logo-white.png", height='36px')
        p blockchain. Join us on Discord to stay updated.
      div.mt3.animate__animated.animate__fadeIn.animate__delay-1s(data-scroll data-scroll-speed="3")
        v-btn(href='https://discord.gg/zaHsXaXBGJ', large, rounded, color='accent')
          span.f5 Take me to Discord!
          img.ml2(alt='Virus Busters', src="../assets/images/icons/discord-icon.svg", height='20px')
      div.flex-grow-1
      div.flex-column.justify-center.items-center.animate__animated.animate__fadeIn.animate__delay-1s(style='display:flex; width:120px; height: 60px;')
        img.animate__animated.animate__bounce.animate__delay-2s(alt='scroll-arrow', src="../assets/images/icons/arrow-icon.svg", width='60px')
</template>

<style lang='sass'>
  .page-intro
    height: 90vh !important
    display: flex
    flex-direction: column
    align-items: center
    padding: 0 $responsive-gutter
    .signature-img
      align-self: center
      width: 700px
      margin-top: 10vh
    .landing-description
      color: var(--v-light-base)
      font-size: 30px
      font-weight: bold
      text-align: center
      display: flex
      flex-wrap: wrap
      align-items: center
      justify-content: center
      p
        margin-bottom: 0
        margin-right: 10px
      a
        margin-top: 6px
        width: 100px
        height: 36px
        object-fit: contain
    @media all and (max-width: $small)
      padding: 0 $responsive-gutter
      .signature-img
        // width: 250px
      .landing-description
        font-size: 20px
        flex-direction: column
        p
          // font-size: 16px
        a
          margin: 10px 0
</style>
