<script>
import WindowsPaths from '@/mixins/windowsPaths.js'
import RoutePath from '@/components/desktop/work/routePath'

import VueResizable from 'vue-resizable'
export default {
  name: 'ContactsWindow',
  components: {
    VueResizable,
    RoutePath
  },
  data () {
    return {
      activeRoute: null,
      windowId: 'contactsWindow',
      detailedView: false,
      activeCollection: null,
      collections: [
        {
          title: 'cryptomonKeys',
          routeName: 'computer',
          level: 1,
          bannerColor: '#1abe3e',
          signature: 'collabs/cryptomonkeys-signature.png',
          icon: 'collabs/cryptomonkeys-icon.png',
          date: '2021-02-17',
          type: 'Collection',
          links: [
            {
              title: 'cryptomonKeys Website',
              url: 'https://cryptomonkeys.cc/',
              image: 'collabs/cryptomonkeys-icon.png'
            },
            {
              title: 'Atomic Hub Collection Page',
              url: 'https://wax.atomichub.io/explorer/collection/crptomonkeys',
              image: 'atomic-hub-icon.png'
            },
            {
              title: 'Youtube Channel',
              url: 'https://www.youtube.com/c/cryptomonKeys',
              image: this.$vuetify.theme.dark ? 'icons/youtube-icon.svg' : 'icons/youtube-icon-black.svg'
            },
            {
              title: 'Twitter',
              url: 'https://twitter.com/Crypt0monKeys',
              image: 'twitter-logo.svg'
            },
            {
              title: 'Discord',
              url: 'https://chat.cryptomonkeys.cc/',
              image: this.$vuetify.theme.dark ? 'icons/discord-icon.svg' : 'icons/discord-icon-black.svg'
            }
          ]
        },
        {
          title: 'Cat Stickers',
          routeName: 'computer',
          level: 1,
          bannerColor: '#fca5a5',
          signature: 'collabs/catstickers-signature.svg',
          icon: 'collabs/catstickers-icon.png',
          date: '2021-03-08',
          type: 'Collection',
          links: [
            {
              title: 'Cat Stickers Website',
              url: 'https://www.catstickersnft.com/',
              image: 'collabs/catstickers-icon.png'
            },
            {
              title: 'Atomic Hub Collection Page',
              url: 'https://wax.atomichub.io/explorer/collection/catstickerss',
              image: 'atomic-hub-icon.png'
            },
            {
              title: 'Twitter',
              url: 'https://twitter.com/catstickersnft',
              image: 'twitter-logo.svg'
            },
            {
              title: 'Discord',
              url: 'https://discord.com/invite/uUaQEhxPt4',
              image: this.$vuetify.theme.dark ? 'icons/discord-icon.svg' : 'icons/discord-icon-black.svg'
            }
          ]
        },
        {
          title: 'Digital Ducks',
          routeName: 'computer',
          level: 1,
          bannerColor: '#4056FF',
          signature: 'collabs/digitalducks-signature.svg',
          icon: 'collabs/digitalducks-icon.png',
          date: '2021-03-08',
          type: 'Collection',
          links: [
            {
              title: 'Digital Ducks Website',
              url: 'https://digital-duck.com/',
              image: 'collabs/digitalducks-icon.png'
            },
            {
              title: 'Atomic Hub Collection Page',
              url: 'https://wax.atomichub.io/explorer/collection/digitalducks',
              image: 'atomic-hub-icon.png'
            },
            {
              title: 'Twitter',
              url: 'https://twitter.com/StabbyQuack',
              image: 'twitter-logo.svg'
            },
            {
              title: 'Discord',
              url: 'https://discord.com/invite/uUaQEhxPt4',
              image: this.$vuetify.theme.dark ? 'icons/discord-icon.svg' : 'icons/discord-icon-black.svg'
            }
          ]
        }
      ]
    }
  },
  mixins: [WindowsPaths],
  mounted () {
  },
  computed: {
    activeWindow: {
      set (val) { this.$store.commit('Desktop/setActiveWindow', val) },
      get () { return this.$store.state.Desktop.activeWindow }
    },
    contactsWindow: {
      set (val) { this.$store.commit('Desktop/setContactsWindow', val) },
      get () { return this.$store.state.Desktop.contactsWindow }
    },
    windowsRoutes: {
      set (val) { this.$store.commit('WindowsRoutes/setWindowsRoutes', val) },
      get () { return this.$store.state.WindowsRoutes.windowsRoutes }
    },
    currentWindow () {
      return this.windowsRoutes.find(route => route.value === this.windowId)
    },
    currentPath () {
      const currentWindow = this.windowsRoutes.find(route => route.value === this.windowId)
      const activeRoute = currentWindow.activePath[currentWindow.activePath.length - 1]
      return activeRoute
    }
  },
  methods: {
    closeWindow () {
      this.contactsWindow = false
    },
    openLink (link) {
      window.open(link, '_blank')
    }
  }
}
</script>
<template lang='pug'>
  vue-resizable(:top="$store.state.App.mobileTemplate ? '10%' : '20%'", :left="$store.state.App.mobileTemplate ? '10%' : '40%'", :width="$store.state.App.mobileTemplate ? '80vw' : '350px'", :height="$store.state.App.mobileTemplate ? '70vh' : '350px'", :min-height="250", :min-width="300", drag-selector=".window-top-bar", :class='{"active-window" : $store.state.Desktop.activeWindow === "contacts"}')
    div.customization-window.desktop-window(:class='{"active-window" : $store.state.Desktop.activeWindow === "contacts"}', @mousedown='activeWindow = "contacts"')
      //- LOGIN WAX
      div.window-top-bar(:class='{"active-gradient" : ($store.state.Customizations.activeTheme && $store.state.Customizations.activeTheme.data.gradients)}')
        div.window-title Buster's Friends
        div.flex-grow-1
        v-btn.close-button.secondary--text(@click='closeWindow', tile, color='accent', fab, depressed) X
      route-path(:activeWindow='currentWindow', :windowId='windowId', @stepBack='stepBack')
      div.window-content
        div.collections_wrapper(v-if='currentPath && currentPath.level === 0')
          template(v-for='(col, index) in collections')
            div.collection-icon.pointer(@click='updateRoute(windowId, col)')
              v-img.collection-image(:src="require('@/assets/images/' + col.icon)", width='50px', height='50px', contain, style='max-width: 50px')
              div.collection-title {{col.title}}
          template(v-for='(col, index) in 1')
            div.collection-icon.pointer(@click='')
              div.fallback-image()
                span ?
              div.collection-title Coming soon!
        div.collection_wrapper(v-else-if='currentPath && currentPath.level === 1')
          div.quicklinks__wrapper
            div.collection-header(:style='{backgroundColor: currentPath.bannerColor}')
              v-img(:src="require('@/assets/images/' + currentPath.signature)", width='100%', height='80px', contain, style='max-width: 300px', alt='activeCollection.title')
            v-list(color='transparent')
              template(v-for='(link, index) in currentPath.links')
                v-list-item.pointer(@click='openLink(link.url)')
                  v-list-item-content
                    div.row-wrapper
                      div.first-row
                        v-img.mr2(:src="require('@/assets/images/' + link.image)", width='20px', height='20px', contain, style='max-width: 30px')
                        span.link-content(:class='link.classes ? link.classes : null') {{link.title}}
                      div.second-row {{link.date}}
                      div.third-row {{link.type}}
                  v-list-item-action
                    v-icon mdi-open-in-new
</template>
<style lang='sass'>
  .customization-window.desktop-window
    .collections_wrapper
      display: flex
      flex-wrap: wrap
      .collection-icon
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        width: 120px
        height: 100%
        text-align: center
        position: relative
        padding: 5px
        .fallback-image
          display: flex
          flex-direction: column
          align-items: center
          justify-content: center
          height: 50px
          width: 50px
          font-size: 24px
          font-family: $display-font
          line-height: 1
          background-color: black
          border-radius: 25px
          color: white
        .collection-image
          height: 50px
          max-height: 50px !important
        .collection-title
          margin-top: 5px
          word-break: break-word
          line-height: 1.15
          font-size: 14px
        &::after
          content: ''
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
          opacity: 0
          border: solid 1px black
          background-color: rgba(0,0,0,0.15)
        &:hover
          &::after
            opacity: 1

    .collection-header
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      padding: 10px
      border-radius: $border-radius-root
      margin-bottom: 10px
    .collection_wrapper
      .quicklinks__wrapper
        display: flex
        flex-direction: column
        min-width: 300px
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
