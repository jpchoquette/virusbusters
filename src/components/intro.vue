<script>
export default {
  name: 'HelloWorld',

  data: () => ({
  })
}
</script>
<template lang='pug'>
  section#intro-section(data-scroll-section)
    div.page-intro
      div.flex-grow-1
      img.signature-img.animate__animated.animate__zoomIn(data-scroll data-scroll-speed="2", alt='Virus Busters', src="../assets/images/vb-animated-logo.gif")
      div.landing-description.animate__animated.animate__fadeIn.animate__delay-1s.mt3(data-scroll data-scroll-speed="3")
        p A brand new NFT collection is being uploaded on the
        a(href='https://wax.atomichub.io/explorer/collection/virusbusters', target='_blank')
          img(alt='Wax Logo', src="../assets/images/wax-logo-white.png", :height='$store.state.App.mobileTemplate ? "20px" : "36px"')
        p blockchain. Join us on Discord to stay updated.
      div.landing-actions.animate__animated.animate__fadeIn.animate__delay-1s(data-scroll data-scroll-speed="3")
        div.w-100.flex-grow-1.tc.mb2
          v-btn.ma1(to='/desktop', x-large, rounded, color='accent')
            span.f5.b Virtual Desktop™ Login
            img.ml2(src='~@/assets/images/icons/desktop-icon-v1.png', contain, height='40px')
        v-btn.ma1(href='https://discord.gg/vKWRKtsDCX', target='_blank', large, rounded, color='black', dark)
          span.f5 Take me to Discord!
          img.ml2(alt='Virus Busters Discord', src="~@/assets/images/icons/discord-icon.svg", height='20px')
        v-btn.ma1(href='https://wax.atomichub.io/market?collection_name=virusbusters', target='_blank', large, rounded, color='#14192E')
          span.f5.white--text Buy on AtomicHub
          img.ml2(alt='Atomic Hub Market', src="~@/assets/images/atomic-hub-icon.png", height='20px')
      div.flex-grow-1
      div.flex-column.justify-center.items-center.animate__animated.animate__fadeIn.animate__delay-1s(style='display:flex; width:120px; height: 60px; margin-top: 40px')
        img.animate__animated.animate__bounce.animate__delay-2s(alt='scroll-arrow', src="../assets/images/icons/arrow-icon.svg", width='60px')
</template>

<style lang='sass'>
  .page-intro
    height: 90vh !important
    display: flex
    flex-direction: column
    align-items: center
    justify-content: start
    padding: 0 $responsive-gutter
    .signature-img
      align-self: center
      width: 90%
      max-width: 700px
      max-height: 30vh
      margin-top: 10vh
      object-fit: contain
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
    .landing-actions
      margin-top: 20px
      display: flex
      flex-wrap: wrap
      align-items: center
      justify-content: center
    @media all and (max-width: $medium)
      // min-height: 120vh !important
      padding: 0 $responsive-gutter
      .signature-img
        // width: 250px
      .landing-description
        font-size: 15px
        // flex-direction: column
        p
          // font-size: 16px
        a
          margin: 10px 0
          height: 20px
          width: 60px
      .landing-actions
        flex-direction: column
        align-items: center
    @media all and (max-height: 600px)
      height: 100% !important

</style>
