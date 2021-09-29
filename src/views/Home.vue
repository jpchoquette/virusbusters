<script>
import LocomotiveScroll from 'locomotive-scroll'
import Intro from '../components/intro'
import InfectedSection from '../components/infectedSection'
import BlueScreenSection from '../components/blueScreenSection'
import TextPattern from '../components/shared/textPattern'
import WaxLogin from '@/mixins/waxLogin.js'

export default {
  name: 'Home',
  components: {
    Intro,
    InfectedSection,
    BlueScreenSection,
    TextPattern
  },
  mixins: [WaxLogin],
  data () {
    return {
      scrollIns: null
    }
  },
  mounted () {
    const _self = this
    this.$nextTick(function () {
      _self.initLocoScroll()
    })
  },
  methods: {
    initLocoScroll () {
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
    section(data-scroll-section, data-scroll-section-id='section0', data-scroll-persistent)
      div.section-container(id='scroll-direction0')
        .block-wrapper()
          .section-content.light.black--text.flex.items-center(data-scroll, data-scroll-sticky, data-scroll-target='#scroll-direction0', data-scroll-persistent)
            div.tc.f4.pa5.flex.flex-column.justify-center.items-center()
              p.f2.b Welcome to the headquarters of Virus Busters, a top of the line cybersecurity agency.
              p.f3.w-70.mt3 It will be our pleasure to help you get rid of any unwanted activity on your devices. Un peu plus de bla bla ici aussi.
    infected-section
    //- section.sticky-section-fullsize(data-scroll-section, data-scroll-section-id='section3', data-scroll-persistent)
      div.section-container(id='scroll-direction2')
        .block-wrapper()
          .section-content.accent(data-scroll, data-scroll-sticky, data-scroll-target='#scroll-direction2', data-scroll-persistent)
            text-pattern.backward(data='WARNING! INFECTED! WARNING!', color='#7e2753', opacity='0.25', angle='-20', target='#scroll-direction2', speed='-2', qtyPerLine='6')
            div.pt5.tc() This is another section
    blue-screen-section
    //- section.sticky-section-fullsize(data-scroll-section, data-scroll-section-id='section1', data-scroll-persistent)
      div.section-container(id='scroll-direction1')
        .block-wrapper()
          .section-content.tertiary(data-scroll, data-scroll-sticky, data-scroll-target='#scroll-direction1', data-scroll-persistent)
            //- div.text-pattern__wrapper.w-100.h-100
            //- text-pattern.forward(data='Meet the viruses', color='gold', opacity='0.5', target='#scroll-direction1', speed='2')
            //- LOGIN WAX
            //- template
              div.pt5.tc.relative() This is a section
              v-btn(v-if='$store.state.User.userConnected', @click='logout') Logout
              v-btn(v-else, @click='login') Login wax
              template(v-if='$store.state.User.userConnected')
                div Welcome {{userProfile}}
                div My NFTS:
                  ul
                    li(v-for='(nft, index) in userTemplates') {{nft.data.name}}
              template(v-else)
                div Welcome. Please login to continue
    section(data-scroll-section, data-scroll-persistent)
      div.section-container.sticky-section
        .block-wrapper()
          .section-content.secondary.flex.flex-column
            div.flex-grow-1
            div.pt5.tc.test() See you soon!
            div.tc
              img.tc(alt='Wormy', src="../assets/images/virus/v_worm_test.gif", height='300px')
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

</style>
