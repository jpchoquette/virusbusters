<script>
export default {
  name: 'App',
  data: () => ({
  }),
  computed: {
    mobileTemplate: {
      get () { return this.$store.state.App.mobileTemplate },
      set (val) { this.$store.commit('App/setMobileTemplate', val) }
    },
    windowSize: {
      get () { return this.$store.state.App.windowSize },
      set (val) { this.$store.commit('App/setWindowSize', val) }
    }
  },
  async mounted () {
    window.addEventListener('resize', this.handleResize)
    this.$nextTick(() => {
      this.handleResize()
    })
  },
  destroyed () {
    window.removeEventListener('resize', this.handleResize)
  },
  methods: {
    handleResize () {
      if (this.windowSize.width !== window.innerWidth || this.windowSize.height !== window.innerHeight) {
        this.windowSize.width = window.innerWidth
        this.windowSize.height = window.innerHeight
        if (this.windowSize.width < 901) {
          this.mobileTemplate = true
        } else {
          this.mobileTemplate = false
        }
        const vh = window.innerHeight * 0.01
        document.documentElement.style.setProperty('--vh', `${vh}px`)
      }
    }
  }
}
</script>

<template lang='pug'>
v-app(dark)
  v-main
    router-view
</template>
<style lang='sass'>
  @import './assets/styles/base/_fonts.sass'
  *
    cursor: url('/base-cursor.png'),default
  a, a *, button, button *, .pointer, .pointer *, .v-list-item.v-list-item--link, .v-list-item.v-list-item--link *
    cursor: url(/pointer-cursor.png),pointer
  .infected-section-cursor, .infected-section-cursor *
    cursor: url(/base-cursor-infected.png),default
  .infected-section-cursor
    a, a *, button, button *, .v-list-item--link, .v-list-item--link *
      cursor: url(/pointer-cursor-infected.png),pointer
  body
    height: -webkit-fill-available
  html
    background-color: var(--v-secondary-base)
    height: -webkit-fill-available
</style>
<style>
  @import './assets/styles/vendors/locomotiveScroll.css'
</style>
