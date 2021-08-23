<script>
// import HelloWorld from '../components/HelloWorld'

export default {
  name: 'Home',

  components: {
    // HelloWorld
  }
}
</script>

<template lang='pug'>
  //- hello-world
  .landing-page
    div.flex-grow-1
    img.animate__animated.animate__zoomIn(alt='Virus Busters', src="../assets/images/virus-busters-logo.svg")
    div.flex-grow-1
    div.landing-description.animate__animated.animate__fadeIn.animate__delay-2s
      p Coming soon on
      a(href='https://wax.atomichub.io', target='_blank')
        img(alt='Virus Busters', src="../assets/images/wax-logo-white.png", height='40px')
</template>

<style lang='sass'>
  .landing-page
    height: 100vh
    width: 100vw
    background-color: var(--v-secondary-base)
    padding: 20px
    display: flex
    align-items: center
    justify-content: center
    flex-direction: column
    img
      align-self: center
      width: 700px
      // height: 200px
    .landing-description
      color: var(--v-accent-base)
      font-size: 20px
      font-weight: 400
      margin-top: 40px
      text-align: center
      display: flex
      align-items: center
      white-space: nowrap
      p
        margin-bottom: 0
        margin-right: 10px
      a, img
        width: 100%
        height: 30px
        object-fit: contain
</style>
