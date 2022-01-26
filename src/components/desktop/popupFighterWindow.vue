<script>
import Minesweeper from '@/components/desktop/games/minesweeper'

// import WaxLogin from '@/mixins/waxLogin.js'
import VueResizable from 'vue-resizable'
export default {
  name: 'BlenderWindow',
  components: {
    VueResizable,
    Minesweeper
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
    },
    checkOwnership (id) {
      if (this.$store.state.User.userProfile === 'virusbusters') {
        // virusbuster wallet used to debug nfts preview
        return true
      } else {
        // console.log('this.$store.state.Buster.ownedGameTemplates', this.$store.state.Buster.ownedGameTemplates)
        const ownedTemplate = this.$store.state.Buster.ownedGameTemplates.findIndex((temp) => temp.template.template_id === id)
        return ownedTemplate >= 0
      }
    },
    goToMarket (id) {
      window.open('https://wax.atomichub.io/market?collection_name=virusbusters&schema_name=virtual.desk&template_id=' + id, '_blank')
    }
  }
}
</script>
<template lang='pug'>
  vue-resizable(:top="$store.state.App.mobileTemplate ? '10%' : '10%'", :left="$store.state.App.mobileTemplate ? '10%' : '45%'", :width="$store.state.App.mobileTemplate ? '80vw' : '500px'", :height="$store.state.App.mobileTemplate ? '70vh' : '500px'", drag-selector=".window-top-bar", :class='{"active-window" : $store.state.Desktop.activeWindow === "fighter"}')
    div.program-window.desktop-window(:class='{"active-window" : $store.state.Desktop.activeWindow === "fighter"}', @mousedown='activeWindow = "fighter"')
      div.window-top-bar(:class='{"active-gradient" : ($store.state.Customizations.activeTheme && $store.state.Customizations.activeTheme.data.gradients)}')
        div.window-title RiskyClick.exe
        div.flex-grow-1
        v-btn.close-button.secondary--text(@click='closeWindow', tile, color='accent', fab, depressed) X
      div.window-content
        div.collection__wrapper.h-100.w-100
          minesweeper(v-if='checkOwnership("401170")')
          //- div(v-else)
          .empty-content__wrapper(v-else)
            .title-placeholder.white--text Oh no!
            .description-placeholder.white--text
              p It looks like you don't own this game :(
              p
                | You can head over to
                a.mh1(href='https://discord.gg/vKWRKtsDCX', target='_blank') Discord
                | to find out how to get it, or purchase directly on
                a.mh1.underline(@click='goToMarket("401170")') Atomic Hub
                |.
          //- .empty-content__wrapper
            .title-placeholder.white--text W4RN1NG!
            .description-placeholder Program corrupted.
</template>
<style lang='sass'>

</style>
