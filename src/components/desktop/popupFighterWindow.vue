<script>
// import WaxLogin from '@/mixins/waxLogin.js'
import VueResizable from 'vue-resizable'
export default {
  name: 'BlenderWindow',
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
    popupFighterWindow: {
      set (val) { this.$store.commit('Desktop/setPopupFighterWindow', val) },
      get () { return this.$store.state.Desktop.popupFighterWindow }
    }
  },
  methods: {
    closeWindow () {
      this.popupFighterWindow = false
    }
  }
}
</script>
<template lang='pug'>
  vue-resizable(:top="$store.state.App.mobileTemplate ? '10%' : '40%'", :left="$store.state.App.mobileTemplate ? '10%' : '5%'", :width="$store.state.App.mobileTemplate ? '80vw' : '500px'", :height="$store.state.App.mobileTemplate ? '70vh' : '350px'", drag-selector=".window-top-bar", :class='{"active-window" : $store.state.Desktop.activeWindow === "fighter"}')
    div.program-window.desktop-window(:class='{"active-window" : $store.state.Desktop.activeWindow === "fighter"}', @mousedown='activeWindow = "fighter"')
      div.window-top-bar
        div.window-title PopupFighter.exe
        div.flex-grow-1
        v-btn.white--text(@click='closeWindow', tile, color='accent', fab, depressed) X
      div.window-content
        div.collection__wrapper.h-100.w-100
          .empty-content__wrapper
            .title-placeholder.white--text W4RN1NG!
            .description-placeholder Program corrupted.
</template>
<style lang='sass'>

</style>
