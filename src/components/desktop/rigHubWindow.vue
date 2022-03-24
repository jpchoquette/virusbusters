<script>
import WindowsPaths from '@/mixins/windowsPaths.js'
import WindowBar from '@/components/shared/windowBar.vue'

import RoutePath from '@/components/desktop/work/routePath'
import AirdropStatus from '@/components/desktop/work/airdropStatus'
import ContentHints from '@/components/desktop/work/contentHints'
import VirusNfts from '@/components/desktop/work/virusNfts'
import ShopNfts from '@/components/desktop/work/shopNfts'
// import TrophyNfts from '@/components/desktop/work/trophyNfts'
import ComputerNfts from '@/components/desktop/work/computerNfts'

import VueResizable from 'vue-resizable'
export default {
  name: 'WorkWindow',
  components: {
    VueResizable,
    WindowBar,
    RoutePath,
    AirdropStatus,
    ContentHints,
    VirusNfts,
    ShopNfts,
    ComputerNfts
  },
  data () {
    return {
      detailedView: false,
      activeRoute: null,
      windowId: 'rigHubWindow',
      routes: [
        {
          title: 'Computer Status',
          routeName: 'computer',
          icon: 'icons/computer-icon.svg',
          type: 'Route',
          level: 1
        },
        {
          title: 'Active Viruses',
          routeName: 'virus',
          icon: 'icons/virus-icon.svg',
          type: 'Route',
          level: 1
        },
        {
          title: 'The Shop',
          routeName: 'shop',
          icon: 'icons/money-icon.svg',
          type: 'Route',
          level: 1
        },
        {
          title: 'My Trophies',
          routeName: 'trophies',
          icon: 'icons/trophy-icon.svg',
          type: 'Route',
          level: 1
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
    rigHubWindow: {
      set (val) { this.$store.commit('Desktop/setRigHubWindow', val) },
      get () { return this.$store.state.Desktop.rigHubWindow }
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
      this.rigHubWindow = false
    },
    resetPrefs () {
      this.$emit('resetPrefs')
    },
    checkOwnership (id) {
      if (this.$store.state.User.userProfile === 'virusbusters') {
        // virusbuster wallet used to debug nfts preview
        return true
      } else {
        // // console.log('this.$store.state.Buster.ownedGameTemplates', this.$store.state.Buster.ownedGameTemplates)
        // const ownedTemplate = this.$store.state.Buster.ownedGameTemplates.findIndex((temp) => temp.template.template_id === id)
        // return ownedTemplate >= 0
        return false
      }
    }
    // launchUpdateRoute (index) {
    //   this.updateRoute(this.windowId, this.routes[index])
    // }
  }
}
</script>
<template lang='pug'>
  vue-resizable(:top="$store.state.App.mobileTemplate ? '10%' : '20%'", :left="$store.state.App.mobileTemplate ? '10%' : '20%'", :width="$store.state.App.mobileTemplate ? '80vw' : '500px'", :height="$store.state.App.mobileTemplate ? '70vh' : '500px'", :min-height="250", :min-width="300", drag-selector=".window-top-bar", :class='{"active-window" : $store.state.Desktop.activeWindow === "computer"}')
    div.work-window.desktop-window(:class='{"active-window" : $store.state.Desktop.activeWindow === "computer"}', @mousedown='activeWindow = "computer"')
      window-bar(title='Work Station', @closeWindow='closeWindow')
      route-path(:activeWindow='currentWindow', :windowId='windowId', @stepBack='stepBack')
      //- pre {{windowsRoutes}}
      div.window-content
        template(v-if='checkOwnership("3245345")')
          //- pre {{currentPath}}
          //- pre {{currentWindow.activePath[currentWindow.activePath - 1].level === 0}}
          airdrop-status(v-if='currentPath && currentPath.level === 0')
          content-hints(v-else)
          div.routes_wrapper(v-if='currentPath && currentPath.level === 0')
            template(v-for='(route, index) in routes')
              div.route-icon.pointer(@click='updateRoute(windowId, route)')
                v-img.route-image(:src="require('@/assets/images/' + route.icon)", width='50px', height='50px', contain, style='max-width: 50px')
                div.route-title {{route.title}}
          div.route_wrapper(v-else)
            div.quicklinks__wrapper
              template(v-if='currentWindow.activePath[1].routeName === "virus"')
                virus-nfts(:windowId='windowId', :currentPath='currentPath')
              template(v-if='currentWindow.activePath[1].routeName === "shop"')
                shop-nfts(:windowId='windowId', :currentPath='currentPath')
              template(v-if='currentWindow.activePath[1].routeName === "computer"')
                computer-nfts(:windowId='windowId', :currentPath='currentPath')
              //- template(v-else)
                span component ici {{activeRoute}}
        .empty-content__wrapper(v-else)
          .title-placeholder Oh no!
          .description-placeholder
            p This program is under construction
            p
              | For more infos, join us on
              a.mh1(href='https://discord.gg/vKWRKtsDCX', target='_blank', style='color: inherit') Discord
              |.
</template>
<style lang='sass'>
  .work-window.desktop-window
    background-color: var(--v-light-base)
    .routes_wrapper
      display: flex
      flex-wrap: wrap
      .route-icon
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
          font-size: 30px
          font-family: $display-font
          line-height: 1
        .route-image
          height: 50px
          max-height: 50px !important
        .route-title
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

    .route-header
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      // ---
    .route_wrapper
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
