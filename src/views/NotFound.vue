<script>
// import FeedbackNotification from '../components/shared/feedbackNotification'

export default {
  name: 'Desktop',
  components: {
  },
  mixins: [],
  data () {
    return {
      menu: false,
      mobileView: false
    }
  },
  computed: {
    mobileTemplate: {
      get () { return this.$store.state.App.mobileTemplate },
      set (val) { this.$store.commit('App/setMobileTemplate', val) }
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
    }
  },
  mounted () {
  },
  methods: {
    leaveComputer () {
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
      .desktop-page.screen.error-page(id='screenContent')
        div.not-found__content
          h1 Something went wrong :(
          div It seems like this page does not exist.
          div.mt3
            v-btn.mh2(to='/', color='yellow', tile) Go to home page
            v-btn.mh2(to='/desktop', color='yellow', tile) Go to Virtual Desktop
</template>

<style lang='sass'>
  @import '@/assets/styles/desktop/_crt.scss'
  .desktop__wrapper
    .computer-frame
      .crt-wrapper
        .desktop-page.error-page
          background-color: var(--v-bluescreen-base)
          display: flex
          flex-direction: column
          justify-content: center
          align-items: center
          .not-found__content
            padding: 20px
            text-align: center
            font-size: 20px
            color: white
            font-family: $code-font
</style>
