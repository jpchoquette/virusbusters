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
    settingsWindow: {
      set (val) { this.$store.commit('Desktop/setSettingsWindow', val) },
      get () { return this.$store.state.Desktop.settingsWindow }
    }
  },
  methods: {
    closeWindow () {
      this.settingsWindow = false
    }
  }
}
</script>
<template lang='pug'>
  vue-resizable(top="200", left="400", :width="600", :height="450", :min-height="250", :min-width="300", drag-selector=".window-top-bar", :class='{"active-window" : $store.state.Desktop.activeWindow === "settings"}')
    .settings-window.desktop-window(:class='{"active-window" : $store.state.Desktop.activeWindow === "settings"}', @mousedown='activeWindow = "settings"')
      div.window-top-bar(:class='{"active-gradient" : ($store.state.Customizations.activeTheme && $store.state.Customizations.activeTheme.data.gradients)}')
        div.window-title Settings
        div.flex-grow-1
        v-btn.black--text(@click='closeWindow', tile, color='accent', fab, depressed) X
      div.window-content
        div(v-for='(n,index) in 100') Allo les pogos
</template>
<style lang='sass'>
  .settings-window.desktop-window
    // top: calc(30% - 150px)
    // left: calc(30% - 250px)

</style>
