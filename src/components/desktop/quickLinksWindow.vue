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
  vue-resizable(top="20%", left="40%", :width="600", :height="450", :min-height="250", :min-width="300", drag-selector=".window-top-bar", :class='{"active-window" : $store.state.Desktop.activeWindow === "quicklinks"}')
    div.customization-window.desktop-window(:class='{"active-window" : $store.state.Desktop.activeWindow === "quicklinks"}', @mousedown='activeWindow = "quicklinks"')
      //- LOGIN WAX
      div.window-top-bar
        div.window-title Quick Links
        div.flex-grow-1
        v-btn.white--text(@click='closeWindow', tile, color='accent', fab, depressed) X
      div.window-content
        div.quicklinks__wrapper
          table
            thead
              tr
                th.tl() Name
                th.tl() Date added
                th.tl() Type
            tbody
              template(v-for='(link, index) in quickLinks')
                tr.pointer(@click='openLink(link.url)')
                  td()
                    div.flex
                      v-img.mr2(:src="require('@/assets/images/' + link.image)", width='20px', height='20px', contain, style='max-width: 30px')
                      .link-content {{link.title}}
                  td.tl {{link.date}}
                  td.tl {{link.type}}
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
