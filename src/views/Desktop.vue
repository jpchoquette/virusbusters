<script>
import TextPattern from '../components/shared/textPattern'
import LoginBox from '../components/desktop/loginBox'
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
    LoginBox,
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
      menu: false
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
    }
  },
  watch: {
    '$route.name': {
      immediate: true,
      handler (newVal) {
        console.log('route change', newVal)
        if (newVal === 'Desktop') {
          document.documentElement.setAttribute('style', 'overflow-y:hidden !important')
        } else {
          document.documentElement.setAttribute('style', 'overflow-y:auto !important')
        }
      }
    },
    userConnected (newVal) {
      this.showLogin = false
    }
  },
  mounted () {
    this.startClock()
    this.checkDate()
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
    }
  }
}
</script>

<template lang='pug'>
  .desktop-page
    //- .top-bar
    .temp-windows__wrapper
      login-box(v-if='showLogin')
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
            v-img(:src="require('@/assets/images/buster/buster_' + selectedBusterTemplate.data.template_id + '.gif')", width='350px', :key='selectedBusterTemplate.data.template_id')
          img(v-else, src="@/assets/images/vb-animated-logo-light.gif", width='400px', max-width='400px', style='opacity:1;')

        //- pre {{selectedBusterTemplate}}
      //- div.wallpaper-content(v-else)
        img(src="@/assets/images/virus-busters-logo.svg", width='100%', style='opacity:0.25;')

      .window-content
        .version-number v1.0
        template(v-if='userConnected')
          //- icon-desktop(image='@/assets/images/virus-busters-logo.svg', title='My settings', action='settings')
          icon-desktop(image='@/assets/images/virus-busters-logo.svg', title='Customization', action='customization')
          icon-desktop(image='@/assets/images/virus-busters-logo.svg', title='Quick links', action='quicklinks')
          icon-desktop(image='@/assets/images/virus-busters-logo.svg', title='My NFTs', action='collection')
          icon-desktop(image='@/assets/images/virus-busters-logo.svg', title='Blender.exe', action='blender')

        //- template
          //- test section
          span connected? {{userConnected}}
          div profile {{profile}}
          //- pre() templates {{busterTemplates}}
          div.avatar-window
            div(v-for='(buster, index) in busterTemplates')
              //- pre {{buster.template.template_id}}
              //- v-img(:src="require('@/assets/images/buster/buster_' + buster.template.template_id + '.gif')", width='300px')
              v-btn(@click='selectBuster(index, buster.template.template_id)') {{buster.template.immutable_data.name}}
          v-btn(@click='selectBuster(null)') clear avatar

    .bottom-bar
      //- v-btn.h-100.w-100(tile, icon) Menu
      v-menu(v-model='menu', :close-on-content-click='false', top, offset-y, elevation='0')
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
  .desktop-page
    width: 100vw
    height: 100vh
    overflow: hidden
    display: flex
    flex-direction: column
    background-color: var(--v-primary-base)
    .temp-windows__wrapper
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      // background-color: #3171d8
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
