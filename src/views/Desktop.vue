<script>
import TextPattern from '../components/shared/textPattern'
import DateWidget from '../components/desktop/dateWidget'
import LoginWindow from '../components/desktop/loginWindow'
import IconDesktop from '../components/desktop/iconDesktop'
import CustomizationWindow from '../components/desktop/customizationWindow'
import SettingsWindow from '../components/desktop/settingsWindow'
import QuickLinksWindow from '../components/desktop/quickLinksWindow'
import CollectionWindow from '../components/desktop/collectionWindow'
import BlenderWindow from '../components/desktop/blenderWindow'
import PopupFighterWindow from '../components/desktop/popupFighterWindow'

import WaxLogin from '@/mixins/waxLogin.js'
import UpdatePreferences from '@/mixins/updatePreferences.js'

export default {
  name: 'Desktop',
  components: {
    TextPattern,
    DateWidget,
    LoginWindow,
    IconDesktop,
    CustomizationWindow,
    SettingsWindow,
    QuickLinksWindow,
    CollectionWindow,
    BlenderWindow,
    PopupFighterWindow
  },
  mixins: [WaxLogin, UpdatePreferences],
  data () {
    return {
      showLogin: true,
      menu: false,
      screenOn: false,
      mobileView: false,
      wpOwnership: false
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
    // checkScreenState () {
    //   if (this.$cookies.get('screen')) {
    //     return this.$cookies.get('screen')
    //   } else {
    //     return this.screenOn
    //   }
    // }
  },
  watch: {
    '$route.name': {
      immediate: true,
      handler (newVal) {
        // console.log('route change', newVal)
        if (newVal === 'Desktop') {
          document.documentElement.setAttribute('style', 'overflow-y:hidden !important')
        } else {
          document.documentElement.setAttribute('style', 'overflow-y:auto !important')
        }
      }
    },
    userConnected (newVal) {
      if (newVal) {
        this.showLogin = false
        this.menu = false
        // this.checkWallpaperOwnership()
        // setTimeout(() => {
        //   this.checkWallpaperOwnership()
        // }, 2000)
        this.validatePreferences()
      } else {
        this.showLogin = true
      }
    },
    '$store.state.App.windowSize': {
      immediate: true,
      deep: true,
      handler (newVal) {
        if (newVal) {
          // console.log('newVal', newVal.width, newVal.height)
          if (newVal.width < 901 || newVal.height < 701) {
            this.mobileView = true
            this.screenState = false
          } else {
            this.mobileView = false
          }
        } else {
          this.mobileView = false
        }
      }
    }
  },
  mounted () {
    this.retrieveScreenState()
    // this.checkWallpaperOwnership()
  },
  methods: {
    retrieveScreenState () {
      const screen = this.$cookies.get('screen')
      if (screen === 'true' || screen === true) {
        this.screenState = true
      } else {
        this.screenState = false
      }
    },
    toggleScreen () {
      this.screenState = !this.screenState
      this.menu = false
      this.$cookies.set('screen', this.screenState, 604800)
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
        button(@click='toggleScreen()') I/O
    .crt-wrapper
      .desktop-page.screen
        transition(name='custom-classes-transition', enter-active-class='animate__animated animate__fadeIn animate__faster', leave-active-class='animate__animated animate__fadeOut animate__faster', mode='out-in')
          .screen-off__overlay(v-if='!screenState && !mobileView')
        transition(name='custom-classes-transition', enter-active-class='animate__animated animate__fadeIn', leave-active-class='animate__animated animate__fadeOut', mode='out-in')

          login-window.crt(v-if='showLogin')
          div(v-else, style='display: flex; flex-direction: column; height: 100%;')
            //- .top-bar
            .temp-windows__wrapper
              settings-window(v-if='$store.state.Desktop.settingsWindow')
              customization-window(v-if='$store.state.Desktop.customizationWindow', @resetPrefs='resetUserPreferences()')
              quick-links-window(v-if='$store.state.Desktop.quickLinksWindow')
              collection-window(v-if='$store.state.Desktop.collectionWindow')
              blender-window(v-if='$store.state.Desktop.blenderWindow')
              popup-fighter-window(v-if='$store.state.Desktop.popupFighterWindow')

            .window__wrapper(:style='{backgroundColor: ($store.state.Customizations.activeWallpaper && $store.state.Customizations.activeWallpaper.extra) ? $store.state.Customizations.activeWallpaper.extra.background : "transparent"}')
              div.wallpaper-content
                //- pre {{$store.state.Customizations.activeWallpaper}} wallpapers
                template(v-if='$store.state.Customizations.activeWallpaper && $store.state.Customizations.activeWallpaper.data')
                  text-pattern(:data='$store.state.Customizations.activeWallpaper.data.immutable_data.name', color='#7e2753', :opacity='0.15', :angle='-20', :qtyPerLine='2')
                  transition(name='custom-classes-transition', enter-active-class='animate__animated animate__zoomIn', leave-active-class='animate__animated animate__zoomOut', mode='out-in')
                    v-img(:src="require('@/assets/images/buster/buster_' + $store.state.Customizations.activeWallpaper.data.template_id + '.gif')", width='350px', :key="$store.state.Customizations.activeWallpaper.data.template_id")
                img(v-else, src="@/assets/images/vb-animated-logo-light.gif", width='400px', max-width='400px', style='opacity:1;')

              .window-content
                //- pre {{JSON.parse($cookies.get('users'))}}
                .version-number v1.02
                template(v-if='userConnected')
                  //- icon-desktop(image='blender-icon-v1.png', title='My settings', action='settings')
                  icon-desktop(image='buster-icon.png', title='Desktop customizer', action='customization')
                  icon-desktop(image='links-icon-v1.png', title='Quick links', action='quicklinks')
                  icon-desktop(image='blender-icon-v1.png', title='My NFTs', action='collection', :private ='true')
                  icon-desktop(image='blender-icon-v1.png', title='Blender.exe', action='blender')
                  icon-desktop(image='blender-icon-v1.png', title='PopupFighter.exe', action='fighter', :private='true')

            .bottom-bar
              //- v-btn.h-100.w-100(tile, icon) Menu
              v-menu(v-model='menu', :close-on-content-click='true', top, offset-y, elevation='0', content-class='window-menu')
                template(v-slot:activator='{ on, attrs }')
                  v-btn(color='accent', dark='', v-bind='attrs', v-on='on', style='height: 100%; width: 100px', tile)
                    v-img(:src="require('@/assets/images/virus-busters-icon.svg')", width='30px', height='40px', contain)

                v-card(elevation='0', tile)
                  v-list
                    v-list-item(v-if='userConnected')
                      //- v-list-item-avatar
                        img(src='https://cdn.vuetifyjs.com/images/john.jpg', alt='John')
                      v-list-item-content
                        v-list-item-title.b {{profile}}
                        v-list-item-subtitle Virus Busters Employee
                      v-list-item-action
                        v-btn(@click='logout', icon)
                          v-icon mdi-power
                    v-list-item(v-else)
                      //- v-list-item-avatar
                        img(src='https://cdn.vuetifyjs.com/images/john.jpg', alt='John')
                      v-list-item-content
                        v-list-item-title.b Guest #
                          span {{Math.floor(Math.random() * (8000 - 1000 + 1)) + 1000}}
                        v-list-item-subtitle Visitor
                      v-list-item-action
                        v-btn(@click='login', icon)
                          v-icon mdi-login
                  v-divider
                  v-list
                    v-list-item(to='/')
                      v-list-item-title Go back to home page
              div.flex-grow-1
              date-widget(v-if='userConnected')
</template>

<style lang='sass'>
  @import '@/assets/styles/desktop/_windows.sass'
  @import '@/assets/styles/desktop/_crt.scss'
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
  .window-menu
    box-shadow: none !important
    border-radius: 4px 4px 0 0 !important
  .v-main__wrap
    background-color: black
  .desktop__wrapper
    background-color: black
    background-image: url('~@/assets/images/office-bg-test.jpg')
    background-size: cover
  .desktop-page
    // width: 100vw
    // height: 100vh
    overflow: hidden
    // display: flex
    // flex-direction: column
    background-color: var(--v-primary-base)
    position: relative
    .screen-off__overlay
      z-index: 4500
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background-color: black
    .temp-windows__wrapper
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      // box-shadow: inset 11px 11px 71px -10px rgb(0 0 0 / 50%)
      // background-color: #3171d8
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

      .date-wrapper
        display: flex
        // width: 200px
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
        height: 100%
        display: flex
        align-items: center
        justify-content: center
        .v-image
          max-width: 350px
</style>
