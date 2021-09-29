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
  section.sticky-section-fullsize.infected-section(data-scroll-section, data-scroll-section-id='section3', data-scroll-persistent)
    div.section-container(id='scroll-direction2')
      .block-wrapper()
        .section-content.accent.relative(data-scroll, data-scroll-sticky, data-scroll-target='#scroll-direction2', data-scroll-persistent)
          text-pattern.backward(data='WARNING! INFECTED! WARNING!', color='#7e2753', opacity='0.25', angle='-20', target='#scroll-direction2', speed='-2', qtyPerLine='6')
          //- div.pt5.tc() This is another section
          div.warning-window.top-left(data-scroll data-scroll-speed="2")
          div.warning-window.bottom-right(data-scroll data-scroll-speed="1")
          div.warning-window.middle-center(data-scroll data-scroll-speed="3")
</template>
<style lang='sass'>
  .infected-section
    position: relative
    .warning-window
      width: 500px
      min-height: 300px
      // background-color: white
      z-index: 2000
      position: absolute
      // border-radius: $border-radius-root
      &.top-left
        top: 130px
        left: 100px
        z-index: 3
        &::before
          background-color: #ffcece
      &.bottom-right
        width: 300px
        height: 400px
        bottom: 150px
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
        top: calc(50vh - 200px)
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
      &.is-inview
        &::before
          transform: scale(1)
          transition-delay: 3s
</style>
