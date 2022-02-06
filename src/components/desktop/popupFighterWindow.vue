<script>
import Scoreboard from '@/components/desktop/scoreboard'
import ScoreboardCalcSimple from '@/mixins/scoreboardCalcSimple.js'
import VueResizable from 'vue-resizable'
export default {
  name: 'PopupFighter',
  components: {
    VueResizable,
    Scoreboard
  },
  data () {
    return {
    }
  },
  mixins: [ScoreboardCalcSimple],
  mounted () {
    window.addEventListener('message', this.receiveMessage)
  },
  beforeDestroy () {
    window.removeEventListener('message', this.receiveMessage)
  },
  computed: {
    activeWindow: {
      set (val) { this.$store.commit('Desktop/setActiveWindow', val) },
      get () { return this.$store.state.Desktop.activeWindow }
    },
    popupFighterWindow: {
      set (val) { this.$store.commit('Desktop/setPopupFighterWindow', val) },
      get () { return this.$store.state.Desktop.popupFighterWindow }
    },
    currentScore: {
      set (val) { this.$store.commit('Games/setCurrentScore', val) },
      get () { return this.$store.state.Games.currentScore }
    }
  },
  methods: {
    receiveMessage (event) {
      if (event.origin === 'https://v6p9d9t4.ssl.hwcdn.net') {
        if (event && event.data && event.data.message) {
          console.log('Score captured from minigame:', event.data.message.score)
          this.currentScore = event.data.message.score
          this.sendScoreboardData('fighter', event.data.message.score)
        }
      }
    },
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
  vue-resizable(:top="$store.state.App.mobileTemplate ? '2.5%' : '10%'", :left="$store.state.App.mobileTemplate ? '2.5%' : '20%'", :width="$store.state.App.mobileTemplate ? '95vw' : '650px'", :height="$store.state.App.mobileTemplate ? '90vh' : '562px'" ,drag-selector=".window-top-bar", :class='{"active-window" : $store.state.Desktop.activeWindow === "fighter"}')
    div.program-window.desktop-window(:class='{"active-window" : $store.state.Desktop.activeWindow === "fighter"}', @mousedown='activeWindow = "fighter"')
      div.window-top-bar(:class='{"active-gradient" : ($store.state.Customizations.activeTheme && $store.state.Customizations.activeTheme.data.gradients)}')
        div.window-title PopupFighter.exe
        div.flex-grow-1
        v-btn.close-button.secondary--text(@click='closeWindow', tile, color='accent', fab, depressed) X
      div.window-content(style='margin:0;padding:0;background-color:#222;')
        div.collection__wrapper.h-100.w-100
          div.h-100(v-if='checkOwnership("434273")', style='margin:0 auto;')
            // debug version
            //- <iframe id='popupgame' frameborder="0" src="//v6p9d9t4.ssl.hwcdn.net/html/5202935/index.html" allowfullscreen="" :width="$store.state.App.mobileTemplate ? '320px' : '500px'" :height="$store.state.App.mobileTemplate ? '100%' : '100%'"></iframe>
            // live version
            <iframe id='popupgame' frameborder="0" src="//v6p9d9t4.ssl.hwcdn.net/html/5202492/index.html" allowfullscreen="" :width="$store.state.App.mobileTemplate ? '320px' : '500px'" :height="$store.state.App.mobileTemplate ? '100%' : '100%'"></iframe>

          .empty-content__wrapper(v-else)
            .title-placeholder.white--text Oh no!
            .description-placeholder.white--text
              p It looks like you don't own this game :(

              p
                | You can head over to
                a.mh1.underline(href='https://neftyblocks.com/c/virusbusters/drops/97156', target='_blank') Neftyblocks
                | to buy the game.
              p
                | For more infos, join us on
                a.mh1(href='https://discord.gg/vKWRKtsDCX', target='_blank') Discord
                |.
</template>
<style lang='sass'>
.collection__wrapper
  iframe
    width: 100%
    padding-top: 20px
</style>
