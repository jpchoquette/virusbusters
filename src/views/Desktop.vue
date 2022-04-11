<script>
import FeedbackNotification from '../components/shared/feedbackNotification'
import TextPattern from '../components/shared/textPattern'
import StatCalculator from '../components/shared/statCalculator'
import DateWidget from '../components/desktop/dateWidget'
import LoginWindow from '../components/desktop/loginWindow'
import IconDesktop from '../components/desktop/iconDesktop'
import CustomizationWindow from '../components/desktop/customizationWindow'
import SettingsWindow from '../components/desktop/settingsWindow'
import QuickLinksWindow from '../components/desktop/quickLinksWindow'
import CollectionWindow from '../components/desktop/collectionWindow'
import BlenderWindow from '../components/desktop/blenderWindow'
import RiskyClickWindow from '../components/desktop/riskyClickWindow'
import PopupFighterWindow from '../components/desktop/popupFighterWindow'
import RigHubWindow from '../components/desktop/rigHubWindow'
import LeaderboardWindow from '../components/desktop/leaderboardWindow'
import ContactsWindow from '../components/desktop/contactsWindow'

import WaxLogin from '@/mixins/waxLogin.js'
import UpdatePreferences from '@/mixins/updatePreferences.js'

import AnimatedCursors from '@/mixins/animatedCursors.js'
import CustomThemes from '@/mixins/customThemes.js'

export default {
  name: 'Desktop',
  components: {
    FeedbackNotification,
    TextPattern,
    StatCalculator,
    DateWidget,
    LoginWindow,
    IconDesktop,
    CustomizationWindow,
    SettingsWindow,
    QuickLinksWindow,
    CollectionWindow,
    BlenderWindow,
    RiskyClickWindow,
    PopupFighterWindow,
    RigHubWindow,
    LeaderboardWindow,
    ContactsWindow
  },
  mixins: [WaxLogin, UpdatePreferences, AnimatedCursors, CustomThemes],
  data () {
    return {
      showLogin: true,
      showTemporaryWelcome: false,
      showTemporaryExit: false,
      menu: false,
      mobileView: false,
      wpOwnership: false,
      buttonHint: false,
      timer: null
    }
  },
  computed: {
    mobileTemplate: {
      get () { return this.$store.state.App.mobileTemplate },
      set (val) { this.$store.commit('App/setMobileTemplate', val) }
    },
    profile: {
      set (val) { this.$store.commit('User/setUserProfile', val) },
      get () { return this.$store.state.User.userProfile }
    },
    userConnected: {
      set (val) { this.$store.commit('User/setUserConnected', val) },
      get () { return this.$store.state.User.userConnected }
    },
    userTemplates: {
      set (val) { this.$store.commit('User/setUserTemplates', val) },
      get () { return this.$store.state.User.userTemplates }
    },
    selectedBusterTemplate: {
      set (val) { this.$store.commit('Buster/setSelectedBusterTemplate', val) },
      get () { return this.$store.state.Buster.selectedBusterTemplate }
    },
    screenState: {
      set (val) { this.$store.commit('Desktop/setScreenState', val) },
      get () { return this.$store.state.Desktop.screenState }
    }
  },
  watch: {
    '$route.name': {
      immediate: true,
      handler (newVal) {
        if (newVal === 'Desktop') {
          document.documentElement.setAttribute('style', 'overflow-y:hidden !important')
        } else {
          document.documentElement.setAttribute('style', 'overflow-y:auto !important')
        }
      }
    },
    userConnected: {
      immediate: true,
      handler (newVal, oldVal) {
        // console.log('newVal', newVal, oldVal)
        if (newVal) {
          this.showTemporaryWelcome = true
          this.showLogin = false
          this.menu = false
          setTimeout(() => {
            this.showTemporaryWelcome = false
            this.validatePreferences()
          }, 2000)
        } else {
          if (this.$store.state.Customizations.activeCursor && this.$store.state.Customizations.activeCursor.data && this.$store.state.Customizations.activeCursor.data.type !== 'base') {
            this.clearCursor()
          }
          this.clearTheme()
          if (oldVal) {
            this.showTemporaryExit = true
          }
          this.showLogin = true
          setTimeout(() => {
            this.showTemporaryExit = false
          }, 2000)
        }
      }
    },
    '$store.state.App.windowSize': {
      immediate: true,
      deep: true,
      handler (newVal) {
        if (newVal) {
          if (newVal.width < 901 || newVal.height < 801) {
            this.mobileView = true
            // this.screenState = false
            this.retrieveScreenState()
          } else {
            this.mobileView = false
          }
        } else {
          this.mobileView = false
        }
      }
    },
    '$store.state.Customizations.activeCursor': {
      immediate: true,
      deep: true,
      handler (newVal, oldVal) {
        if (newVal) {
          if (oldVal && oldVal.data && oldVal.data.type && oldVal.data.type !== 'base') {
            this.clearCursor()
          }
          this.setCursor(newVal.data.options, newVal.data.type)
        } else if (!newVal && oldVal) {
          if (oldVal && oldVal.data && oldVal.data.type && oldVal.data.type !== 'base') {
            this.clearCursor()
          }
        }
      }
    },
    '$store.state.Customizations.activeTheme': {
      immediate: true,
      deep: true,
      handler (newVal, oldVal) {
        if (newVal) {
          this.setTheme(newVal.data)
        } else if (!newVal && oldVal) {
          this.clearTheme()
        }
      }
    },
    '$store.state.Customizations.activeWallpaper': {
      immediate: true,
      deep: true,
      handler (newVal, oldVal) {
        if (newVal) {
          // this.setWallpaper(newVal.data)
        } else if (!newVal && oldVal) {
          // this.clearTheme()
        }
      }
    },
    screenState: {
      immediate: true,
      handler (newVal) {
        // console.log('screen on?', newVal)
        if (!newVal) {
          this.timer = setTimeout(() => {
            this.buttonHint = true
          }, 4000)
        } else {
          this.buttonHint = false
          clearTimeout(this.timer)
        }
      }
    }
  },
  mounted () {
    this.retrieveScreenState()
  },
  methods: {
    retrieveScreenState () {
      const screen = this.$cookies.get('screen')
      if (screen === 'true' || screen === true) {
        this.screenState = true
      } else {
        this.screenState = false
      }
      this.buttonHint = false
    },
    getBackgroundSize () {
      if (this.$store.state.Customizations.activeWallpaperDisplayStyle === 'mosaic-background') {
        if (this.$store.state.Customizations.activeWallpaper.data.mosaicSize) {
          return this.$store.state.Customizations.activeWallpaper.data.mosaicSize
        } else {
          return null
        }
      } else if (this.$store.state.Customizations.activeWallpaper.data.defaultSize) {
        return this.$store.state.Customizations.activeWallpaper.data.defaultSize
      } else {
        return null
      }
      // $store.state.Customizations.activeWallpaper.data.defaultSize
    },
    toggleScreen () {
      this.screenState = !this.screenState
      this.menu = false
      if (this.screenState) {
        this.buttonHint = false
      }
      this.$cookies.set('screen', this.screenState, 604800)
    },
    leaveComputer () {
      this.logout()
      window.location.href = '/'
    }
  }
}
</script>

<template lang='pug'>
.desktop__wrapper
  //- IF WE WANT ASPECT RATIO LOCKED
  //- .computer__wrapper.aspect-ratio_4-3
  .computer-frame(:class='{"mobile-desktop" : mobileView}')
    template(v-if='!mobileView')
      .post-it-yellow
        img(src="@/assets/images/postits/postit-yellow-1.png", width='200px', max-width='200px')
      .post-it-pink
        img(src="@/assets/images/postits/postit-pink-1.png", width='200px', max-width='200px')
      .frame-buttons
        button.black--text(@click='toggleScreen()', :class='{"hint-active" : buttonHint}') I/O
    .crt-wrapper
      .desktop-page.screen(
        id='screenContent'
        :class='[($store.state.Customizations.activeCursor && $store.state.Customizations.activeCursor.data.customCursor) ? $store.state.Customizations.activeCursor.data.class : null, this.cursorClick ? "clicked-cursor" : null, (!screenState && !mobileView) ? "screen-off" : null, !$store.state.Customizations.activeWallpaper ? "default-wallpaper" : null]'
      )
        transition(name='custom-classes-transition', enter-active-class='animate__animated animate__fadeIn animate__faster', leave-active-class='animate__animated animate__fadeOut animate__faster', mode='out-in')
          .screen-off__overlay(v-if='!screenState && !mobileView')
        transition(name='custom-classes-transition', enter-active-class='animate__animated animate__fadeIn animate__faster', leave-active-class='animate__animated animate__fadeOut animate__faster', mode='out-in')
          div.transition-screen(v-if='showTemporaryWelcome')
            .temp-windows__wrapper
            .transition-screen__content
              img(src="@/assets/images/virtual-desktop-logo-white.png", width='350px')
              .transition-title Welcome, {{profile}}
        transition(name='custom-classes-transition', enter-active-class='animate__animated animate__fadeIn animate__faster', leave-active-class='animate__animated animate__fadeOut animate__faster', mode='out-in')
          div.transition-screen(v-if='showTemporaryExit')
            .temp-windows__wrapper
            .transition-screen__content
              .transition-title.mb2 Thank you for using
              img(src="@/assets/images/virtual-desktop-logo-white.png", width='350px')

        transition(name='custom-classes-transition', enter-active-class='animate__animated animate__fadeIn', leave-active-class='animate__animated animate__fadeOut', mode='out-in')
          login-window.crt(v-if='showLogin')
          div(v-else, style='display: flex; flex-direction: column; height: 100%;')
            .temp-windows__wrapper
              settings-window(v-if='$store.state.Desktop.settingsWindow')
              customization-window(v-if='$store.state.Desktop.customizationWindow', @resetPrefs='resetUserPreferences()')
              rig-hub-window(v-if='$store.state.Desktop.rigHubWindow')
              contacts-window(v-if='$store.state.Desktop.contactsWindow')
              quick-links-window(v-if='$store.state.Desktop.quickLinksWindow')
              //- collection-window(v-if='$store.state.Desktop.collectionWindow')
              //- blender-window(v-if='$store.state.Desktop.blenderWindow')
              risky-click-window(v-if='$store.state.Desktop.riskyClickWindow')
              popup-fighter-window(v-if='$store.state.Desktop.popupFighterWindow')
              leaderboard-window(v-if='$store.state.Desktop.leaderboardWindow')

            .window__wrapper(:style='{backgroundColor: ($store.state.Customizations.activeWallpaper && $store.state.Customizations.activeWallpaper.data.bgColor) ? $store.state.Customizations.activeWallpaper.data.bgColor : "transparent"}')
              feedback-notification(:desktopStyle='!mobileView')

              div.wallpaper-content
                //- <svg id="svg" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1314 712">
                //-   <polyline id="polyline" fill="none" points=" 746,376 754,377 783,381 802,385 824,391 827,393 868,400 939,408 988,415 1133,427 1205,432"></polyline>
                //- </svg>
                template(v-if='$store.state.Customizations.activeWallpaper && $store.state.Customizations.activeWallpaper.data')
                  template(v-if='$store.state.Customizations.activeWallpaper.data.type === "buster"')
                    text-pattern(:data='$store.state.Customizations.activeWallpaper.data.name', :color='$store.state.Customizations.activeWallpaper.data.dark ? "white" : "black"', :opacity='0.10', :angle='-20', :qtyPerLine='2')
                    transition(name='custom-classes-transition', enter-active-class='animate__animated animate__zoomIn', leave-active-class='animate__animated animate__zoomOut', mode='out-in')
                      v-img(:src="require('@/assets/images/buster/buster_' + $store.state.Customizations.activeWallpaper.data.template_id + '.gif')", width='350px', :key="$store.state.Customizations.activeWallpaper.data.template_id")
                  template(v-else)
                    //- div.top-wallpaper-gradient(v-if='$store.state.Customizations.activeWallpaper.data.bgGradient', :class='$store.state.Customizations.activeWallpaper.data.animatedGradient ? "animated-gradient" : ""')
                    div.wallpaper-gradient(v-if='$store.state.Customizations.activeWallpaper.data.bgGradient', :class='$store.state.Customizations.activeWallpaper.data.animatedGradient ? "animated-gradient" : ""', :style='{background: $store.state.Customizations.activeWallpaper.data.customGradient}')
                    div.wallpaper-image(:style='{ backgroundImage:"url(" + require("@/assets/images/wallpapers/wallpaper_" + $store.state.Customizations.activeWallpaper.data.template_id + $store.state.Customizations.activeWallpaper.data.extension) + ")", backgroundSize: getBackgroundSize() }', :class='$store.state.Customizations.activeWallpaperDisplayStyle')
                    template(v-if='$store.state.Customizations.activeWallpaper.data.texture')
                      div.pattern-image.primary(:style='{ opacity: $store.state.Customizations.activeWallpaper.data.textureOpacity,  backgroundImage:"url(" + require("@/assets/images/wallpapers/texture_" + $store.state.Customizations.activeWallpaper.data.template_id + ($store.state.Customizations.activeWallpaper.data.textureExtension ? $store.state.Customizations.activeWallpaper.data.textureExtension : ".png")) + ")" }')
                img(v-else, src="@/assets/images/vb-animated-logo-light.gif", width='400px', max-width='400px', style='opacity:1;')

              .window-content
                //- Load trail cursor images otherwise they don't show on loadup
                div.init-cursor-images(v-if='$store.state.Customizations.activeCursor && $store.state.Customizations.activeCursor.data && $store.state.Customizations.activeCursor.data.options && $store.state.Customizations.activeCursor.data.options.images && $store.state.Customizations.activeCursor.data.options.images.length')
                  template(v-for='(image, index) in $store.state.Customizations.activeCursor.data.options.images')
                    img.debug-images(:src='image')
                .version-number v1.32
                template(v-if='userConnected')
                  icon-desktop(image='buster-icon.png', title='Desktop customizer', action='customization')
                  icon-desktop(image='links-icon-v1.png', title='Quick links', action='quicklinks')
                  icon-desktop(image='desktop-icon-v2.png', title='My (Infected) Computer', action='computer', :private='false')
                  icon-desktop(image='contacts-icon-v1.png', title="Buster's Friends", action='contacts', :private ='false')
                  //- icon-desktop(image='blender-icon-v1.png', title='My NFTs', action='collection', :private ='true')
                  //- icon-desktop(image='blender-icon-v1.png', title='Blender.exe', action='blender')
                  icon-desktop(image='game_434273.png', title='PopupFighter.exe', action='fighter', :private='false')
                  icon-desktop(image='game_401170.png', title='RiskyClick.exe', action='risky', :private='false')
                  icon-desktop(image='leaderboard-icon-v1.png', title='Leader boards', action='leaderboard', :private='false')
                  //- stat-calculator(type='burns', schemaName='popups', templateId='316428')

            .bottom-bar(:class='{"active-gradient" : ($store.state.Customizations.activeTheme && $store.state.Customizations.activeTheme.data && $store.state.Customizations.activeTheme.data.gradients)}')
              v-menu(v-model='menu', :close-on-content-click='true', top, offset-y, elevation='0', content-class='window-menu')
                template(v-slot:activator='{ on, attrs }')
                  v-btn(color='transparent', dark='', v-bind='attrs', v-on='on', style='height: 100%; width: 100px', tile)
                    v-img(:src="require('@/assets/images/virus-busters-icon-transparent.svg')", width='30px', height='40px', contain)

                v-card(elevation='0', tile, light)
                  div.vd-menu.w-100.tc.pa2.toolbars(style='height:80px', :class='{"active-gradient" : ($store.state.Customizations.activeTheme && $store.state.Customizations.activeTheme.data && $store.state.Customizations.activeTheme.data.gradients)}')
                    img(v-if='$vuetify.theme.dark', src="@/assets/images/virtual-desktop-logo-white.png", height='60px')
                    img(v-else, src="@/assets/images/virtual-desktop-logo-black.png", height='60px')

                  v-list
                    v-list-item(v-if='userConnected')
                      v-list-item-content
                        v-list-item-title.b {{profile}}
                        v-list-item-subtitle Virus Busters Employee
                      v-list-item-action
                        v-btn(@click='logout', icon)
                          v-icon mdi-power
                    v-list-item(v-else)
                      v-list-item-content
                        v-list-item-title.b Guest #
                          span {{Math.floor(Math.random() * (8000 - 1000 + 1)) + 1000}}
                        v-list-item-subtitle Visitor
                      v-list-item-action
                        v-btn(@click='WCWlogin', icon)
                          v-icon mdi-login
                  v-divider
                  v-list
                    v-list-item(@click='leaveComputer()')
                      v-list-item-title Go back to home page
              div.flex-grow-1
              date-widget(v-if='userConnected')
</template>

<style lang='sass'>
  @import '@/assets/styles/desktop/_windows.sass'
  @import '@/assets/styles/desktop/_crt.scss'
  @import '@/assets/styles/desktop/_cursorStyles.sass'
  // .aspect-ratio_4-3.computer__wrapper
    padding-bottom: 75%
    position: relative
    width: 100%
    height: 0
    .computer-frame
      position: absolute
      top: 0
      right: 0
      bottom: 0
      left: 0
      overflow: hidden
  #svg
    width: 100vw
    height: 100vh
    position: fixed
    top: 0
    left: 0
    z-index: 1000
    pointer-events: none
    #polyline
      z-index: 1000
      stroke-dasharray: 0
      stroke-width: 3
      stroke-linecap: square
      stroke: red
  .init-cursor-images
    position: absolute
    top: 0
    left: 0
    z-index: -10
    opacity: 0
    pointer-events: none
  .window-menu
    box-shadow: none !important
    border-radius: 4px 4px 0 0 !important
  .v-main__wrap
    background-color: black
  .desktop__wrapper
    background-color: black
    background-image: url('~@/assets/images/office-bg-test.jpg')
    background-size: cover
  .vd-menu
    &.active-gradient
      background: linear-gradient(90deg, var(--v-accent-base) 0%, var(--v-secondary-base) 100%)
  .desktop-page
    overflow: hidden
    background-color: var(--v-primary-base)
    position: relative
    &.default-wallpaper
      background-color: #FBCCAC
    &.screen-off
      #cursorCanvas
        display: none
    .screen-off__overlay
      z-index: 4500
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background-color: black
      cursor: default !important
    .transition-screen
      z-index: 4499
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background-color: var(--v-secondary-base)
      .transition-screen__content
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        text-align: center
        height: 100%
        width: 100%
        padding: 20px
        img
          object-fit: contain

        .transition-title
          margin-top: 20px
          font-family: $pixel-font
          font-size: 20px
          color: white
    .temp-windows__wrapper
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      &::after
        content: ''
        z-index: 5001
        pointer-events: none
        box-shadow: inset 11px 11px 71px -10px rgb(0 0 0 / 50%)
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
    .bottom-bar
      height: 50px
      width: 100%
      background-color: var(--v-secondary-base)
      display: flex
      z-index: 100
      &.active-gradient
        background: linear-gradient(90deg, var(--v-accent-base) 0%, var(--v-secondary-base) 100%)
      .date-wrapper
        display: flex
        flex-direction: column
        align-items: center
        justify-content: center
        text-align: center
        padding-right: 20px
    .window__wrapper
      height: 100%
      width: 100%
      flex-grow: 1
      overflow-y: auto
      transition: all 0.15s ease-in
      .window-content
        height: 100%
        width: 100%
        padding: 10px
        position: relative
        z-index: 10
        overflow: hidden
        display: flex
        flex-direction: column
        flex-wrap: wrap
        align-content: flex-start
        .version-number
          position: absolute
          bottom: 10px
          right: 10px
          font-size: 15px
          opacity: 0.5
      .wallpaper-content
        z-index: 0
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: calc(100% - 48px)
        display: flex
        align-items: center
        justify-content: center
        // .top-wallpaper-gradient
        //   opacity: 0.5
        //   background: linear-gradient(70deg, rgba(188,102,53,0) 10%, rgba(241,163,49,0) 28%, rgba(255,254,181,1) 33%, rgba(255,255,255,1) 34%, rgba(255,254,181,1) 35%, rgba(241,163,49,0) 40%, rgba(255,205,92,0) 48%, rgba(234,155,50,0) 57%, rgba(197,112,53,0) 67%, rgba(241,163,49,0) 85%, rgba(188,102,53,0) 100%)
        //   background-size: 200% 200% !important
        //   position: absolute
        //   top: 0
        //   left: 0
        //   width: 100%
        //   height: 100%
        //   z-index: 9999999 !important
        //   &.animated-gradient
        //     // background-size: 400% 400%
        //     -webkit-animation: gradientMovement 20s ease infinite
        //     -moz-animation: gradientMovement 20s ease infinite
        //     animation: gradientMovement 5s ease infinite
        //     height: 100vh
        .wallpaper-gradient
          background-size: 200% 200% !important
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
          background: linear-gradient(-45deg, var(--v-accent-base) 0%, var(--v-secondary-base) 100%)
          &.animated-gradient
            // background-size: 400% 400%
            -webkit-animation: gradientMovement 40s ease infinite
            -moz-animation: gradientMovement 40s ease infinite
            animation: gradientMovement 40s ease infinite
            height: 100vh
        .pattern-image
          background-color: transparent !important
          border-color: transparent !important
          width: 100%
          height: 100%
          position: absolute
          top: 0
          left: 0
          z-index: 999998
          background-repeat: repeat
          background-size: 20%
          opacity: 0.25
        .wallpaper-image
          width: 100%
          height: 100%
          position: absolute
          top: 0
          left: 0
          z-index: 999999
          background-position: center
          background-size: cover
          &.mosaic-background
            background-repeat: repeat
            background-size: 40%
          &.covering-background
            background-size: cover !important
            background-position: center
          &.centered-background
            background-size: 70%
            background-position: center

        .v-image
          max-width: 350px
  @keyframes gradientMovement
    0%
      background-position:50% 0%
    50%
      background-position:0% 50%
    100%
      background-position:50% 0%
</style>
