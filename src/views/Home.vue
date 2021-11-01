<script>
import LocomotiveScroll from 'locomotive-scroll'
import Intro from '../components/intro'
import InfectedSection from '../components/infectedSection'
import DescriptionSection from '../components/descriptionSection'
import BlueScreenSection from '../components/blueScreenSection'
import TextPattern from '../components/shared/textPattern'
// import WaxLogin from '@/mixins/waxLogin.js'

export default {
  name: 'Home',
  components: {
    Intro,
    InfectedSection,
    DescriptionSection,
    BlueScreenSection,
    TextPattern
  },
  // mixins: [WaxLogin],
  data () {
    return {
      scrollIns: null
    }
  },
  computed: {
    mobileTemplate: {
      get () { return this.$store.state.App.mobileTemplate },
      set (val) { this.$store.commit('App/setMobileTemplate', val) }
    }
  },
  // watch: {
  // mobileTemplate: {
  //   immediate: true,
  //   handler (newVal) {
  //     if (newVal) {
  //       console.log('OMN DESTROUY')
  //       if (this.scroll) {
  //         this.scroll.destroy()
  //         const _self = this
  //         this.$nextTick(function () {
  //           _self.initLocoScroll()
  //         })
  //       }
  //     } else {
  //       const _self = this
  //       this.$nextTick(function () {
  //         _self.initLocoScroll()
  //       })
  //     }
  //   }
  // }
  // },
  mounted () {
    const _self = this
    this.$nextTick(function () {
      _self.initLocoScroll()
    })
  },
  methods: {
    initLocoScroll () {
      console.log('init scroll')
      const _self = this
      _self.scroll = new LocomotiveScroll({
        // eslint-disable-next-line
        el: document.querySelector('#loco-scroll'),
        smooth: true,
        smoothMobile: true,
        getDirection: true,
        class: 'is-inview'
      })
    }
  }
}
</script>

<template lang='pug'>
  .landing-page(id='loco-scroll')
    intro
    description-section
    infected-section
    blue-screen-section
    section(data-scroll-section, data-scroll-persistent)
      div.section-container.sticky-section
        .block-wrapper()
          .section-content.secondary.flex.flex-column
            div.flex-grow-1
            div.pt5.tc.test() See you soon!
            div.tc
              img.tc(alt='Wormy', src="../assets/images/virus/v_worm_test.gif", height='300px')
            div.socials__wrapper
              a(href='https://discord.gg/vKWRKtsDCX', target='_blank')
                img.tc(alt='Discord', src="../assets/images/icons/discord-icon.svg", height='26px', style='fill: red !important;')
              a(href='https://twitter.com/VirusBustersNFT', target='_blank')
                img.tc(alt='Twitter', src="../assets/images/icons/twitter-icon.svg", height='26px')
            //- D
            div.tc.white--text.f7.i.mb2.o-50
              div Made with love by two friends in Canada - V0.23
              div Questions? Contact us directly on Discord or by
                a.ml1.white--text(href='mailto:info@virusbusters.cards') email
</template>

<style lang='sass'>
  p
    font-family: 'Kawingan', serif
  .test
    font-family: 'Daydream', sans-serif
    color: var(--v-light-base)
  .landing-page
    min-height: 100vh
    width: 100vw
    background-color: var(--v-secondary-base)
    .text-pattern__wrapper
      position: absolute
      width: 100%
      height: 100%
      &.forward
        top: 0
        left: 0
      &.backward
        bottom: 0
        right: 0
    section
      overflow: hidden
      min-height: 100vh
      width: 100%
      position: relative
      &.sticky-section-fullsize
        // height: 100vh
        .section-container
          height: 200vh
          .block-wrapper
            min-height: 200vh
            height: 200vh
            .section-content
              height: 100vh
      .section-container
        width: 100%
        height: 100vh
        .block-wrapper
          // min-height: 200vh
          // height: 200vh
          .section-content
            // height: 100%
            height: 100vh
            overflow: hidden
            position: relative
          .socials__wrapper
            display: flex
            justify-content: center
            align-items: center
            a
              margin: 10px
    @media all and (max-width: $medium)
      section
        overflow: hidden
        .section-container
          height: 100%

          .block-wrapper
            .section-content
              height: 100%
</style>
