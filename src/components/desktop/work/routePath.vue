<script>
import WindowsPaths from '@/mixins/windowsPaths.js'

export default {
  name: 'RoutePath',
  components: {
  },
  props: {
    activeWindow: { required: true, type: Object },
    windowId: { required: true, type: String }
  },
  data () {
    return {
    }
  },
  mixins: [WindowsPaths],
  mounted () {
  },
  computed: {
    // activeWindow () {
    //   return this.windowsRoutes.find(route => route.value === this.windowId)
    // },
    currentLevel () {
      if (this.activeWindow && this.activeWindow.activePath && this.activeWindow.activePath.length) {
        return this.activeWindow.activePath.length - 1
      } else {
        return 0
      }
    }
  },
  methods: {
    updateStepBack (routeLevel) {
      if (this.currentLevel > 0) {
        this.stepBack(this.windowId, routeLevel, this.currentLevel)
      }
    }
    // stepBack (activeWindow) {
    //   // this.$emit('stepBack')
    // },
    // goBackToStep (level) {
    //   if (level < this.currentLevel) {
    //     // this.$emit('stepBack', level, this.currentLevel)
    //   }
    // }
  }
}
</script>
<template lang='pug'>
  .routes-path__wrapper
    button.step-back__button(@click='updateStepBack()', :disabled='currentLevel <= 0') <
    div.route
      //- pre {{activeWindow}}
      template(v-for='(route,index) in activeWindow.activePath')
        .pointer.route-elem(@click='updateStepBack(route.level)') {{route.title}}
        div(v-if='index < activeWindow.activePath.length - 1') >
    //- pre {{currentLevel}}
    //- div.header__wrapper
      //- v-btn(@click='$emit("goBack")', outlined) <
      div.header-title Viruses
</template>
<style lang='sass' scoped>
  .routes-path__wrapper
    width: 100%
    min-height: 34px
    height: 34px
    background-color: var(--v-light-base)
    border: solid 1px var(--v-light-lighten2)
    border-width: 1px 0
    // padding: 3px
    display: flex
    align-items: center
    .step-back__button
      height: 34px
      width: 34px
      background-color: var(--v-light-lighten2)
      border: solid 1px var(--v-light-lighten2)
    .route
      display: flex
      align-items: center
      height: 100%
      width: 100%
      .route-elem
        display: flex
        align-items: center
        height: 100%
        font-size: 14px
        position: relative
        padding: 3px 5px
        &:hover
          text-decoration: underline
          &::after
            content: ''
            position: absolute
            top: 0
            left: 0
            width: 100%
            height: 100%
            background-color: rgba(0,0,0,0.25)
        &:last-child
          font-weight: bold

</style>
