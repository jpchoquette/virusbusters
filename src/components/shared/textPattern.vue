<script>
export default {
  name: 'TextPattern',
  props: {
    quantity: { required: false, type: Number, default: 300 },
    lines: { required: false, type: Number, default: 5 },
    qtyPerLine: { required: false, type: Number, default: 4 },
    // quantity: { required: false, type: Number, default: 400 },
    data: { required: false, type: String, default: 'Ceci est un test' },
    angle: { required: false, type: Number, default: 15 },
    size: { required: false, type: Number, default: 60 },
    color: { required: false, type: String, default: 'red' },
    opacity: { required: false, type: Number, default: 0.25 },
    target: { required: false, type: String, default: '#scroll-direction0' },
    speed: { required: false, type: String, default: '-2' }
  },
  computed: {
    patternText () {
      let builtSentence = ''
      for (let i = 0; i <= this.quantity; i++) {
        builtSentence += ('' + this.data + '&nbsp;')
      }
      return builtSentence
    }
  }
}
</script>

<template lang="pug">
  .text-pattern-widget(data-scroll, :style='{"opacity" : opacity}')
    div.text-wrapper(:style='{transform: "rotate(" + angle + "deg)" + " perspective(0px) skew(0deg,0deg)"}')
      div(
        data-scroll
        data-scroll-direction='horizontal'
        :data-scroll-speed="speed"
        :data-scroll-target='target'
        )
        p
          div(style='word-break: break-word;', :style='{fontSize: size + "px", color: color}', v-html='patternText')
</template>
<style lang='sass'>
  .text-pattern-widget
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
    z-index: 0
    // overflow: hidden
    .text-wrapper
      // opacity: 0.15
      position: absolute
      top: -25%
      left: -25%
      width: 200%
      height: 200%
      transform-origin: center center
      // position: absolute
      display: block
      flex-wrap: wrap
      // font-size: 20px
      // font-family: $display-font
      font-family: 'Daydream', sans-serif
      // font-weight: $bold
      span
        transform-origin: center center
        margin-right: 20px
        white-space: normal
        word-wrap: break-word
</style>
