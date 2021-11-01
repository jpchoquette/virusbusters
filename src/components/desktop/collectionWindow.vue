<script>
// import WaxLogin from '@/mixins/waxLogin.js'
import TextScrambler from 'text-scrambler'
import VueResizable from 'vue-resizable'
export default {
  name: 'CustomizationWindow',
  components: {
    VueResizable,
    TextScrambler
  },
  data () {
    return {
    }
  },
  // mixins: [WaxLogin],
  mounted () {
  },
  computed: {
    activeWindow: {
      set (val) { this.$store.commit('Desktop/setActiveWindow', val) },
      get () { return this.$store.state.Desktop.activeWindow }
    },
    collectionWindow: {
      set (val) { this.$store.commit('Desktop/setCollectionWindow', val) },
      get () { return this.$store.state.Desktop.collectionWindow }
    }
  },
  methods: {
    closeWindow () {
      this.collectionWindow = false
    }
  }
}
</script>
<template lang='pug'>
  vue-resizable(top="200", left="400", :width="600", :height="450", :min-height="250", :min-width="300", drag-selector=".window-top-bar", :class='{"active-window" : $store.state.Desktop.activeWindow === "collection"}')
    div.customization-window.desktop-window(:class='{"active-window" : $store.state.Desktop.activeWindow === "collection"}', @mousedown='activeWindow = "collection"')
      //- LOGIN WAX
      div.window-top-bar
        div.window-title My NFT Collection
        div.flex-grow-1
        v-btn.white--text(@click='closeWindow', tile, color='accent', fab, depressed) X
      div.window-content
        div.collection__wrapper.h-100.w-100
          v-hover(v-slot:default="{hover}", close-delay='1000')

            .empty-content__wrapper
              .title-placeholder.accent--text ERROR!
              .description-placeholder
                text-scrambler(
                  :text="hover ? 'ThEWSWREis folderE#@  has be3 ####en corrupted.  ##RQWR3fback l3#RF#ater' : 'This folder has been corrupted. Please come back later'"
                )
</template>
<style lang='sass'>
  .customization-window.desktop-window
    // top: calc(50% - 150px)
    // left: calc(50% - 250px)

    .quicklinks__wrapper
      display: flex
      flex-direction: column
      table
        min-width: 500px
        thead
          tr
            font-size: 12px
            border-bottom: solid 1px black
        tbody
          font-size: 14px
          tr
            padding-bottom: 10px
            height: 100%
            height: 50px
            position: relative
            &::after
              content: ''
              position: absolute
              top: 0
              left: 0
              width: 100%
              height: 100%
              background-color: transparent
            &:hover
              &::after
                background-color: rgba(0,0,0,0.15)
            td
              margin-bottom: 10px
              // display: flex

</style>
