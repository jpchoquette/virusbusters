<script>
import TextPattern from '../components/shared/textPattern'
import LoadingBar from '../components/shared/loadingBar'

export default {
  name: 'InfectedSection',
  components: {
    TextPattern,
    LoadingBar
  },
  data () {
    return {
      activePopup: true,
      popupClasses: 'animate__animated animate__flash'
    }
  },
  methods: {
    trollClose () {
      this.activePopup = false
      this.popupClasses = 'animate__animated animate__zoomOut'
      setTimeout(() => {
        this.activePopup = true
        this.popupClasses = 'animate__animated animate__zoomIn'
      }, 1000)
    }
  }
}
</script>
<template lang='pug'>
  section.infected-section.infected-section-cursor(data-scroll-section, data-scroll-section-id='section3', data-scroll-persistent)
    div.section-container(id='scroll-direction2')
      .block-wrapper()
        .section-content.accent.relative(data-scroll, data-scroll-sticky, data-scroll-target='#scroll-direction2', data-scroll-persistent)
          text-pattern.backward(data='MULTIPLE THREATS DETECTED! WARNING! INFECTION! VIRUS!', color='#7e2753', :opacity='0.25', :angle='-20', target='#scroll-direction2', speed='-2', :qtyPerLine='1')
          div.relative.w-100.h-100(style='max-width: 1500px; margin: 0 auto;')
            div.warning-window.top-left(data-scroll data-scroll-speed="2")
              .warning__inner-content
                .warning-header
                  div.flex-grow-1
                  v-btn.mr2(tile, fab, color='white', depressed, disabled) _
                  v-btn(tile, fab, color='accent', depressed, disabled) X
                .warning-content
                  .main-warning
                    img.mh3(alt='warning', src="../assets/images/icons/warning-icon.svg", height='50px')
                    div
                      p.b YOU GOT PWNED
                      p Virus.exe has succesfully cloned itself to the Virus-Busters servers. Please wait while we clear all your authorizations.
                  div.tc.mt3
                    v-btn.mr3 Thank you
                    v-btn Great news!
            div.warning-window.bottom-left(data-scroll data-scroll-speed="2")
              .warning__inner-content
                .warning-header
                  div.flex-grow-1
                  v-btn.mr2(tile, fab, color='white', depressed, disabled) _
                  v-btn(tile, fab, color='accent', depressed, disabled) X
                .warning-content
                  loading-bar
            div.warning-window.top-right(data-scroll data-scroll-speed="1")
              .warning__inner-content
                img(alt='skull-virus', src="../assets/images/virus/v_skull_1.gif", height='250px')
            div.warning-window.bottom-right(data-scroll data-scroll-speed="1")
              .warning__inner-content
                .warning-content.nft-promo
                  div.flex-grow-1
                  .main-warning
                    div.main-title.animate__animated.animate__flash.animate__delay-2s.animate__infinite FREE NFT
                  div.tc
                    div.b.f4.mb2 CONGRATULATIONS!
                    div.mb2 YOU HAVE BEEN RANDOMLY SELECTED TO WIN A FREE NFT
                    div.b ENTER YOUR WAX ADDRESS BELOW!
                  div.flex-grow-1
                  v-btn(rounded, large, dark, href='https://bit.ly/vb-free-nft-1', target='_blank') CLAIM YOUR PRIZE NOW!
                  div.mt2.i.f6 Limited quantities.
                  div.flex-grow-1

            div.warning-window.middle-center(data-scroll data-scroll-speed="3", data-scroll-delay='0.6')
              .warning__inner-content(:class='popupClasses')
                .warning-header.bluescreen()
                  div.flex-grow-1
                  v-btn.mr2(tile, fab, color='white', depressed, disabled) _
                  v-btn(tile, fab, color='accent', depressed, @click='trollClose()') X
                .warning-content
                  div.tc
                    img.mb3(alt='smiley-bad', src="../assets/images/icons/smiley-icon.svg", height='120px')

                    .main-warning.tc
                      p.f3 ACCESS TO #[span.b BUSTER-CEO-LAPTOP] REVOKED.
                    p Multiple threats have been detected across your computers and servers. To proceed further, please contact your local cybersecurity professionals.
</template>
<style lang='sass'>
  .infected-section
    position: relative
    progress::-webkit-progress-value
      background-image: -webkit-linear-gradient(135deg, transparent, transparent 33%, rgba(0,0,0,.1) 33%, rgba(0,0,0,.1) 66%, transparent 66%), -webkit-linear-gradient( top, rgba(255, 255, 255, .25), rgba(0,0,0,.2)), -webkit-linear-gradient( left, #09c, #ff0)
    .section-container
      height: 150vh !important
      .block-wrapper
        .section-content
          height: 150vh !important
    .warning-window
      width: 500px
      height: 300px
      z-index: 2000
      position: absolute
      overflow: hidden
      border-radius: $border-radius-root
      .warning__inner-content
        transform: scale(0)
        transition: transform 0.25s ease-in
        position: absolute
        top: 0
        bottom: 0
        right: 0
        left: 0
        width: 100%
        height: 100%
        display: flex
        flex-direction: column
        background-color: white
        .warning-header
          padding: 10px 10px
          background-color: var(--v-secondary-base)
          display: flex
        .warning-content
          display: flex
          flex-direction: column
          padding: 30px
          flex-grow: 1
          justify-content: center
          align-items: center
          .main-warning
            display: flex
            align-items: center
            justify-content: center
          &.nft-promo
            .main-warning
              .main-title
                font-size: 30px
                font-family: $display-font
                margin-bottom: 20px
      &.is-inview
        .warning__inner-content
          transform: scale(1)
          transition-delay: 3s
      &.top-left
        top: 10%
        left: 100px
        z-index: 3
        .warning__inner-content
          background-color: #ffcece
      &.top-right
        width: 250px
        height: 250px
        top: 20%
        right: 20%
        z-index: 3
        .warning__inner-content
          background-color: black
        &.is-inview
          .warning__inner-content
            transition-delay: 1.5s
      &.bottom-right
        width: 300px
        height: 400px
        bottom: 10%
        right: 80px
        z-index: 5
        .warning__inner-content
          background-color: #ffec27
          background-image: repeating-linear-gradient(0deg, #333333, #333333 3px, transparent 3px, transparent 13px, #333333 13px), repeating-linear-gradient(90deg, #333333, #333333 3px, transparent 3px, transparent 13px, #333333 13px), repeating-linear-gradient(180deg, #333333, #333333 3px, transparent 3px, transparent 13px, #333333 13px), repeating-linear-gradient(270deg, #333333, #333333 3px, transparent 3px, transparent 13px, #333333 13px)
          background-size: 3px calc(100% + 13px), calc(100% + 13px) 3px, 3px calc(100% + 13px) , calc(100% + 13px) 3px
          background-position: 0 0, 0 0, 100% 0, 0 100%
          background-repeat: no-repeat
          animation: borderAnimation 0.6s infinite linear
        &.is-inview
          .warning__inner-content
            transition-delay: 1.2s
      &.middle-center
        width: 800px
        height: 400px
        top: calc(50% - 200px)
        right: calc(50% - 400px)
        z-index: 10
        &.is-inview
          .warning__inner-content
            transition-delay: 0.5s
      &.bottom-left
        width: 600px
        height: 300px
        bottom: 15%
        left: 10%
        z-index: 2
        &.is-inview
          .warning__inner-content
            transition-delay: 0.5s
    @media all and (max-width: $medium)
      .section-container
        height: 100% !important
        .block-wrapper
          .section-content
            height: 2000px !important
      .warning-window
        width: 100%
        &.top-left
          top: 200px
          left: 90px
        &.top-right
          top: 450px
          right: 220px
        &.bottom-right
          bottom: 420px
          right: 60px
        &.middle-center
          width: 100%
          height: 400px
          top: 730px
          right: 0
        &.bottom-left
          width: 100%
          left: -40px
          bottom: 150px
  @keyframes borderAnimation
    from
      background-position: 0 0, -13px 0, 100% -13px, 0 100%
    to
      background-position: 0 -13px, 0 0, 100% 0, -13px 100%
</style>
