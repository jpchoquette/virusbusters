<script>
// import WindowsPaths from '@/mixins/windowsPaths.js'

export default {
  name: 'AirdropStatus',
  components: {
  },
  props: {
    // activeWindow: { required: true, type: Object },
    // windowId: { required: true, type: String }
  },
  data () {
    return {
      currentStatus: {
        type: 'error',
        color: 'red',
        icon: 'mdi-alert',
        description: 'You are missing components to receive weekly airdrops. Go check in Computer Status for more infos'
      }
    }
  },
  // mixins: [WindowsPaths],
  mounted () {
  },
  computed: {
    // activeWindow () {
    //   return this.windowsRoutes.find(route => route.value === this.windowId)
    // },
  },
  methods: {

  }
}
</script>
<template lang='pug'>
  .airdrop-status__banner
    v-alert(:color='currentStatus.color', dark='', :icon='currentStatus.icon', border='left', dense)
      | {{currentStatus.description}}
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
    background-color: white
    border: solid 1px grey
    border-width: 0 0 1px 0
    // padding: 3px
    display: flex
    align-items: center
    .step-back__button
      height: 34px
      width: 34px
      background-color: lightgrey
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
