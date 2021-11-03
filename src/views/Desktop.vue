<script>
import TextPattern from '../components/shared/textPattern'
import LoginWindow from '../components/desktop/loginWindow'
import IconDesktop from '../components/desktop/iconDesktop'
import CustomizationWindow from '../components/desktop/customizationWindow'
import SettingsWindow from '../components/desktop/settingsWindow'
import QuickLinksWindow from '../components/desktop/quickLinksWindow'
import CollectionWindow from '../components/desktop/collectionWindow'
import BlenderWindow from '../components/desktop/blenderWindow'

import WaxLogin from '@/mixins/waxLogin.js'

export default {
  name: 'Desktop',
  components: {
    TextPattern,
    LoginWindow,
    IconDesktop,
    CustomizationWindow,
    SettingsWindow,
    QuickLinksWindow,
    CollectionWindow,
    BlenderWindow
  },
  mixins: [WaxLogin],
  data () {
    return {
      showLogin: true,
      menu: false,
      screenOn: false
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
    },
    checkScreenState () {
      if (this.$cookies.get('screen')) {
        return this.$cookies.get('screen')
      } else {
        return this.screenOn
      }
    }
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
        this.setTimeout(() => {
          this.startClock()
          this.checkDate()
        }, 1000)
      } else {
        this.showLogin = true
      }
    }
  },
  mounted () {
  },
  methods: {
    startClock () {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      const today = new Date()
      const date = today.toLocaleDateString('en-US', options)
      const h = today.getHours()
      let m = today.getMinutes()
      // let s = today.getSeconds()
      m = this.checkTime(m)
      // s = this.checkTime(s)
      // document.getElementById('userClock').innerHTML = h + ':' + m + ':' + s
      document.getElementById('userClock').innerHTML = h + ':' + m
      document.getElementById('userDate').innerHTML = date

      setTimeout(this.startClock, 1000)
    },
    checkTime (i) {
      if (i < 10) { i = '0' + i }
      return i
    },
    toggleScreen () {
      // console.log('todo', this.screenOn, this.$cookies.get('screen'), this.checkScreenState)
      this.screenOn = !this.screenOn
      this.menu = false
      // this.$cookies.set('screen', this.screenOn, 604800)
    }
  }
}
</script>

<template lang='pug'>
.computer-frame
  .post-it-yellow
    img(src="@/assets/images/postits/postit-yellow-1.png", width='200px', max-width='200px')
  .post-it-pink
    img(src="@/assets/images/postits/postit-pink-1.png", width='200px', max-width='200px')
  .frame-buttons
    button(@click='toggleScreen()') I/O
  .crt-wrapper
    transition(name='custom-classes-transition', enter-active-class='animate__animated animate__fadeIn animate__faster', leave-active-class='animate__animated animate__fadeOut animate__faster', mode='out-in')

      .desktop-page.screen(v-if='screenOn')
        transition(name='custom-classes-transition', enter-active-class='animate__animated animate__fadeIn', leave-active-class='animate__animated animate__fadeOut', mode='out-in')

          login-window.crt(v-if='showLogin')
          div(v-else, style='display: flex; flex-direction: column; height: 100%;')
            //- .top-bar
            .temp-windows__wrapper
              settings-window(v-if='settingsWindow')
              customization-window(v-if='customizationWindow')
              quick-links-window(v-if='quickLinksWindow')
              collection-window(v-if='collectionWindow')
              blender-window(v-if='blenderWindow')
            .window__wrapper(:style='{backgroundColor:selectedBusterTemplate ? selectedBusterTemplate.extra.background : "transparent"}')
              div.wallpaper-content
                text-pattern(v-if='selectedBusterTemplate', :data='selectedBusterTemplate.data.immutable_data.name', color='#7e2753', :opacity='0.15', :angle='-20', :qtyPerLine='1')
                transition(name='custom-classes-transition', enter-active-class='animate__animated animate__zoomIn', leave-active-class='animate__animated animate__zoomOut', mode='out-in')
                  div(v-if='selectedBusterTemplate', :key='selectedBusterTemplate.data.template_id')
                    //- v-img(:src="require('@/assets/images/buster/buster_' + selectedBusterTemplate.data.template_id + '.gif')", width='350px', :key='selectedBusterTemplate.data.template_id')
                    v-img(:src="require('@/assets/images/buster/buster_' + $cookies.get('buster').data.template_id + '.gif')", width='350px', :key="$cookies.get('buster').data.template_id")

                    //- pre {{$cookies.get('buster').data.template_id}}

                  img(v-else, src="@/assets/images/vb-animated-logo-light.gif", width='400px', max-width='400px', style='opacity:1;')

              .window-content
                .version-number v1.0
                template(v-if='userConnected')
                  //- icon-desktop(image='blender-icon-v1.png', title='My settings', action='settings')
                  icon-desktop(image='buster-icon.png', title='Wallpapers', action='customization')
                  icon-desktop(image='links-icon-v1.png', title='Quick links', action='quicklinks')
                  icon-desktop(image='blender-icon-v1.png', title='My NFTs', action='collection', :private ='true')
                  icon-desktop(image='blender-icon-v1.png', title='Blender.exe', action='blender')

            .bottom-bar
              //- v-btn.h-100.w-100(tile, icon) Menu
              v-menu(v-model='menu', :close-on-content-click='true', top, offset-y, elevation='0')
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
              div.date-wrapper
                div.white--text.b(id='userClock')
                div.white--text.f7(id='userDate')
</template>

<style lang='sass'>
  @import '@/assets/styles/desktop/_windows.sass'
  @import '@/assets/styles/desktop/_crt.scss'
  .v-main__wrap
    background-color: black
  .desktop-page
    // width: 100vw
    // height: 100vh
    overflow: hidden
    // display: flex
    // flex-direction: column
    background-color: var(--v-primary-base)
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
        z-index: 99999
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
      z-index: 100000
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
