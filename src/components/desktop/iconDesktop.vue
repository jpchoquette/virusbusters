<script>

export default {
  name: 'IconFile',
  props: {
    title: { required: false, type: String, default: 'Untitled icon' },
    action: { required: false, type: String, default: '' },
    image: { required: false, type: String, default: '@/assets/images/twitter-logo.svg' },
    private: { required: false, type: Boolean, default: false }
  },
  data () {
    return {
    }
  },
  mixins: [],
  mounted: {
  },
  computed: {
    activeWindow: {
      set (val) { this.$store.commit('Desktop/setActiveWindow', val) },
      get () { return this.$store.state.Desktop.activeWindow }
    },
    settingsWindow: {
      set (val) { this.$store.commit('Desktop/setSettingsWindow', val) },
      get () { return this.$store.state.Desktop.settingsWindow }
    },
    customizationWindow: {
      set (val) { this.$store.commit('Desktop/setCustomizationWindow', val) },
      get () { return this.$store.state.Desktop.customizationWindow }
    },
    computersWindow: {
      set (val) { this.$store.commit('Desktop/setComputersWindow', val) },
      get () { return this.$store.state.Desktop.computersWindow }
    },
    quickLinksWindow: {
      set (val) { this.$store.commit('Desktop/setQuickLinksWindow', val) },
      get () { return this.$store.state.Desktop.quickLinksWindow }
    },
    collectionWindow: {
      set (val) { this.$store.commit('Desktop/setCollectionWindow', val) },
      get () { return this.$store.state.Desktop.collectionWindow }
    },
    blenderWindow: {
      set (val) { this.$store.commit('Desktop/setBlenderWindow', val) },
      get () { return this.$store.state.Desktop.blenderWindow }
    }
  },
  methods: {
    launchAction (action) {
      if (action) {
        this.activeWindow = action
        if (action === 'settings') {
          this.settingsWindow = true
        } else if (action === 'customization') {
          this.customizationWindow = true
        } else if (action === 'quicklinks') {
          this.quickLinksWindow = true
        } else if (action === 'collection') {
          this.collectionWindow = true
        } else if (action === 'blender') {
          this.blenderWindow = true
        }
      }
    }
  }
}
</script>
<template lang='pug'>
  .icon-desktop.pointer(@click='launchAction(action)')
    .image-wrapper
      div.fallback-image(v-if='private') ?
      v-img(v-else, :src="require('@/assets/images/icons/' + image)", contain, height='50px')
      //- div(v-else) X
    .text-wrapper {{title}}
</template>
<style lang='sass'>
  .icon-desktop
    padding: 8px 10px 5px 10px
    margin: 10px
    position: relative
    cursor: pointer
    display: flex
    flex-direction: column
    align-items: center
    width: 90px

    &::after
      content: ''
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background-color: rgba(255,255,255,0.25)
      opacity: 0
      border: solid 1px rgba(0,0,0,0.5)
    &:hover
      &::after
        opacity: 1
    .image-wrapper
      width: 50px
      height: 50px
      // background-color: white
      .fallback-image
        font-family: $display-font
        font-size: 35px
        text-align: center
        color: var(--v-secondary-base)
    .text-wrapper
      font-weight: 500
      margin-top: 8px
      color: white
      font-size: 13px
      text-align: center
      line-height: 1.5
      text-shadow: 1px 1px 4px #000, 1px 1px 1px #000

</style>
