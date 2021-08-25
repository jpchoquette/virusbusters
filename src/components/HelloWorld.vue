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
      img.animate__animated.animate__zoomIn(data-scroll data-scroll-speed="2", alt='Virus Busters', src="../assets/images/virus-busters-logo.svg")
      div.flex-grow-1
      div.landing-description.animate__animated.animate__fadeIn.animate__delay-2s.tc(data-scroll data-scroll-speed="3")
        span.mr2 Coming soon on
        a(href='https://wax.atomichub.io', target='_blank')
          img.image-test(alt='Virus Busters', src="../assets/images/wax-logo-white.png", height='40px')
</template>

<style lang='sass'>
  .page-intro
    height: 90vh !important
    // max-height: 90vh
    display: flex
    flex-direction: column
    img
      align-self: center
      width: 700px
      // height: 200px
    .landing-description
      color: var(--v-accent-base)
      font-size: 20px
      font-weight: 400
      // margin-top: 40px
      text-align: center
      display: flex
      align-items: center
      justify-content: center
      white-space: nowrap
      padding: 40px 0
      p
        margin-bottom: 0
        margin-right: 10px
      a,.image-test
        width: 100px
        height: 30px
        object-fit: contain
</style>
