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
    blenderWindow: {
      set (val) { this.$store.commit('Desktop/setBlenderWindow', val) },
      get () { return this.$store.state.Desktop.blenderWindow }
    }
  },
  methods: {
    closeWindow () {
      this.blenderWindow = false
    }
  }
}
</script>
<template lang='pug'>
  vue-resizable(:top="$store.state.App.mobileTemplate ? '10%' : '30%'", :left="$store.state.App.mobileTemplate ? '10%' : '30%'", :width="$store.state.App.mobileTemplate ? '80vw' : '300px'", :height="$store.state.App.mobileTemplate ? '70vh' : '400px'", :min-height="250", :min-width="250", drag-selector=".window-top-bar", :class='{"active-window" : $store.state.Desktop.activeWindow === "blender"}')
    div.program-window.desktop-window(:class='{"active-window" : $store.state.Desktop.activeWindow === "blender"}', @mousedown='activeWindow = "blender"')
      div.window-top-bar
        div.window-title Blender.exe
        div.flex-grow-1
        v-btn.white--text(@click='closeWindow', tile, color='accent', fab, depressed) X
      div.window-content
        div.collection__wrapper.h-100.w-100
          .empty-content__wrapper
            .title-placeholder.white--text WARNING!
            .description-placeholder This program is currently under maintenance. Please come back later.
</template>
<style lang='sass'>
  .program-window.desktop-window
    background-color: var(--v-toolbars-base)

</style>
