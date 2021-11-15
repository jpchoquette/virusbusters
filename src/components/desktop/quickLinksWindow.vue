<script>
// import WaxLogin from '@/mixins/waxLogin.js'
import VueResizable from 'vue-resizable'
export default {
  name: 'CustomizationWindow',
  components: {
    VueResizable
  },
  data () {
    return {
      quickLinks: [
        {
          title: 'Pop-up #3 - Limited free drop!',
          url: 'https://neftyblocks.com/c/virusbusters/drops/70094?key=5JT4tgXQw4MZ2VwuQtTNQTuY9ZdXFXQQ1TwVMqxaFsQzafa52RE',
          image: 'nefty-blocks-logo-small.svg',
          date: '2021-11-06',
          type: 'Link',
          classes: 'b i underline accent--text'
          // showDate: 1636567140
        },
        {
          title: 'Neftyblocks Collection Page',
          url: 'https://neftyblocks.com/c/virusbusters',
          image: 'nefty-blocks-logo-small.svg',
          date: '2021-11-01',
          type: 'Link'
        },
        {
          title: 'Atomic Hub Collection Page',
          url: 'https://wax.atomichub.io/explorer/collection/virusbusters',
          image: 'atomic-hub-icon.png',
          date: '2021-11-01',
          type: 'Link'
        },
        {
          title: 'Atomic Hub Market Page',
          url: 'https://wax.atomichub.io/market?collection_name=virusbusters',
          image: 'atomic-hub-icon.png',
          date: '2021-11-01',
          type: 'Link'
        },
        {
          title: "Buster's Twitter",
          url: 'https://twitter.com/VirusBustersNFT',
          image: 'twitter-logo.svg',
          date: '2021-11-01',
          type: 'Link'
        }
      ]
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
    quickLinksWindow: {
      set (val) { this.$store.commit('Desktop/setQuickLinksWindow', val) },
      get () { return this.$store.state.Desktop.quickLinksWindow }
    }
  },
  methods: {
    closeWindow () {
      this.quickLinksWindow = false
    },
    openLink (link) {
      window.open(link, '_blank')
    }
  }
}
</script>
<template lang='pug'>
  vue-resizable(:top="$store.state.App.mobileTemplate ? '10%' : '20%'", :left="$store.state.App.mobileTemplate ? '10%' : '40%'", :width="$store.state.App.mobileTemplate ? '80vw' : '500px'", :height="$store.state.App.mobileTemplate ? '70vh' : '350px'", :min-height="250", :min-width="300", drag-selector=".window-top-bar", :class='{"active-window" : $store.state.Desktop.activeWindow === "quicklinks"}')
    div.customization-window.desktop-window(:class='{"active-window" : $store.state.Desktop.activeWindow === "quicklinks"}', @mousedown='activeWindow = "quicklinks"')
      //- LOGIN WAX
      div.window-top-bar
        div.window-title Quick Links
        div.flex-grow-1
        v-btn.white--text(@click='closeWindow', tile, color='accent', fab, depressed) X
      div.window-content
        div.quicklinks__wrapper
          v-list(color='transparent')
            v-list-item
              v-list-item-content
                div.row-wrapper.headers
                  div.first-row Name
                  div.second-row Date added
                  div.third-row Type
            template(v-for='(link, index) in quickLinks')
              v-list-item.pointer(@click='openLink(link.url)', v-if='!link.showDate || (Math.round(+new Date()/1000) >= link.showDate)')
                v-list-item-content
                  div.row-wrapper
                    div.first-row
                      v-img.mr2(:src="require('@/assets/images/' + link.image)", width='20px', height='20px', contain, style='max-width: 30px')
                      span.link-content(:class='link.classes ? link.classes : null') {{link.title}}
                    div.second-row {{link.date}}
                    div.third-row {{link.type}}
</template>
<style lang='sass'>
  .customization-window.desktop-window
    .quicklinks__wrapper
      display: flex
      flex-direction: column
      min-width: 500px
      .v-list-item
        padding: 0
        min-height: 36px
        .v-list-item__content
          padding: 8px 0
      .row-wrapper
        display: flex
        align-items: center
        font-size: 14px
        &.headers
          font-size: 12px
          padding-bottom: 10px
          border-bottom: solid 1px black
          font-weight: bold
        .first-row
          min-width: 300px
          flex-grow: 1
          display: flex
        .second-row
          min-width: 100px
        .third-row
          min-width: 80px

</style>
