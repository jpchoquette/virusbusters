<script>
import TextPattern from '../components/shared/textPattern'

export default {
  name: 'InfectedSection',
  components: {
    TextPattern
  },
  data: () => ({
  })
}
</script>
<template lang='pug'>
  section.infected-section(data-scroll-section, data-scroll-section-id='section3', data-scroll-persistent)
    div.section-container(id='scroll-direction2')
      .block-wrapper()
        .section-content.accent.relative(data-scroll, data-scroll-sticky, data-scroll-target='#scroll-direction2', data-scroll-persistent)
          text-pattern.backward(data='MULTIPLE THREATS DETECTED! WARNING! INFECTION! VIRUS!', color='#7e2753', opacity='0.25', angle='-20', target='#scroll-direction2', speed='-2', qtyPerLine='3')
          //- div.pt5.tc() This is another section
          div.relative.w-100.h-100
            div.warning-window.top-left(data-scroll data-scroll-speed="2")
              .warning-header
                div.flex-grow-1
                v-btn.mr2(tile, fab, color='white', depressed, disabled) _
                v-btn(tile, fab, color='accent', depressed, disabled) X
              .warning-content
                .main-warning
                  p Virus.exe has succesfully cloned itself to the Virus-SBusters servers. Please wait while we clear all your authorizations.
                div.tc
                  v-btn.mr3 Yes
                  v-btn(disabled) No
            div.warning-window.top-right(data-scroll data-scroll-speed="1")
              img(alt='skull-virus', src="../assets/images/virus/v_skull_1.gif", height='250px')
            div.warning-window.bottom-right(data-scroll data-scroll-speed="1")
            div.warning-window.middle-center(data-scroll data-scroll-speed="3")
              .warning-header
                div.flex-grow-1
                v-btn.mr2(tile, fab, color='white', depressed, disabled) _
                v-btn(tile, fab, color='accent', depressed, disab led) X
              .warning-content
                .main-warning
                  p.f3 Hello #&*^ç^ç987*(USER-BUSTER-PRESIDENT Multiple threats have been detected across your computers and servers. To proceed further, please contact your local cybersecurity professionals.
                //- div.tc
                  v-btn.mr3 Yes
                  v-btn(disabled) No
</template>
<style lang='sass'>
  .infected-section
    // min-height: 150vh
    position: relative
    .section-container
      height: 150vh !important
      .block-wrapper
        .section-content
          height: 150vh !important
    .warning-window
      width: 500px
      height: 300px
      // background-color: white
      z-index: 2000
      position: absolute
      overflow: hidden
      border-radius: $border-radius-root
      display: flex
      flex-direction: column
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
          // flex-grow: 1
          // height: 100%
      &.top-left
        top: 10%
        left: 100px
        z-index: 3
        &::before
          background-color: #ffcece
      &.top-right
        width: 250px
        height: 250px
        top: 20%
        right: 20%
        z-index: 3
        &::before
          background-color: black
        &.is-inview
          &::before
            transition-delay: 1.5s
      &.bottom-right
        width: 300px
        height: 400px
        bottom: 10%
        right: 80px
        z-index: 5
        &::before
          background-color: #ffcece
        &.is-inview
          &::before
            transition-delay: 1.2s
      &.middle-center
        width: 800px
        height: 400px
        top: calc(50% - 200px)
        right: calc(50vw - 400px)
        z-index: 10
        &.is-inview
          &::before
            transition-delay: 0.5s
      &::before
        content:""
        position: absolute
        top: 0
        bottom: 0
        right: 0
        left: 0
        z-index: -1
        background-color: white
        border-radius: $border-radius-root
        box-shadow: $box-shadow-large
        transform: scale(0)
        transition: transform 0.25s ease-in
        overflow: hidden
      &.is-inview
        &::before
          transform: scale(1)
          transition-delay: 3s
</style>
