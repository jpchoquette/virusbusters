<script>
import LocomotiveScroll from 'locomotive-scroll'
import HelloWorld from '../components/HelloWorld'
import TextPattern from '../components/shared/textPattern'
import WaxLogin from '@/mixins/waxLogin.js'

export default {
  name: 'Home',
  components: {
    HelloWorld,
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
        getDirection: true
      })
    }
  }
}
</script>

<template lang='pug'>
  .landing-page(id='loco-scroll')
    hello-world
    section.sticky-section-fullsize(data-scroll-section, data-scroll-section-id='section2', data-scroll-persistent)
      div.section-container(id='scroll-direction')
        .block-wrapper()
          .section-content.bg-yellow(data-scroll, data-scroll-sticky, data-scroll-target='#scroll-direction', data-scroll-persistent)
            //- div.text-pattern__wrapper.w-100.h-100
            text-pattern
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
    section.bg-red(data-scroll-section, data-scroll-persistent)
      div.section-container.sticky-section
        .block-wrapper()
          .section-content.accent
            div.pt5.tc() This is another section
</template>

<style lang='sass'>
  .landing-page
    min-height: 100vh
    width: 100vw
    background-color: var(--v-secondary-base)
    .text-pattern__wrapper
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
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
