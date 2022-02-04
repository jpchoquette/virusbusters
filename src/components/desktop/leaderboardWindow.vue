<script>
import Scoreboard from '@/components/desktop/scoreboard'
import ScoreboardFetch from '@/mixins/scoreboardFetch.js'
import VueResizable from 'vue-resizable'
export default {
  name: 'LeaderboardWindow',
  components: {
    VueResizable,
    Scoreboard
  },
  data () {
    return {
      leaderboardMenu: true,
      activeBoard: null,
      activeLeaderboardData: null,
      leaderboards: [
        {
          title: 'Popup Fighter Leaderboard',
          url: 'https://neftyblocks.com/c/virusbusters',
          dataId: '61fc9df4f77b236211eb03a1',
          icon: '🏆',
          image: 'nefty-blocks-logo-small.svg',
          type: 'game'
        }
      ]
    }
  },
  mixins: [ScoreboardFetch],
  computed: {
    activeWindow: {
      set (val) { this.$store.commit('Desktop/setActiveWindow', val) },
      get () { return this.$store.state.Desktop.activeWindow }
    },
    leaderboardWindow: {
      set (val) { this.$store.commit('Desktop/setLeaderboardWindow', val) },
      get () { return this.$store.state.Desktop.leaderboardWindow }
    }
  },
  methods: {
    closeWindow () {
      this.leaderboardWindow = false
    },
    toggleBoard (board) {
      if (this.activeBoard !== board) {
        this.activeBoard = board
        this.fetchLeaderboard(board.dataId)
      }
      this.leaderboardMenu = false
    },
    leaveBoard () {
      this.leaderboardMenu = true
    },
    testSnack () {
      this.$store.commit('App/setShowSnackbarGlobal', true)
      this.$store.commit('App/setSnackbarGlobalContent', { type: 'highscore', title: 'New highscore!', color: '#ffaa00', icon: '🏆', description: 'Congrats! Your score for Popup Fighter has been added to the leaderboard' })
    }
  }
}
</script>
<template lang='pug'>
  vue-resizable(:top="$store.state.App.mobileTemplate ? '5%' : '10%'", :left="$store.state.App.mobileTemplate ? '2.5%' : '20%'", :width="$store.state.App.mobileTemplate ? '80vw' : '650px'", :height="$store.state.App.mobileTemplate ? '70vh' : '400px'" ,drag-selector=".window-top-bar", :class='{"active-window" : $store.state.Desktop.activeWindow === "leaderboard"}')
    div.scoreboard-window.desktop-window(:class='{"active-window" : $store.state.Desktop.activeWindow === "leaderboard"}', @mousedown='activeWindow = "leaderboard"')
      div.window-top-bar(:class='{"active-gradient" : ($store.state.Customizations.activeTheme && $store.state.Customizations.activeTheme.data.gradients)}')
        div.window-title Leaderboards
        div.flex-grow-1
        v-btn.close-button.secondary--text(@click='closeWindow', tile, color='accent', fab, depressed) X
      div.window-content(style='margin:0;padding:0;')
        div
          div.quicklinks__wrapper.h-100.w-100(v-if='leaderboardMenu')
            div.intro-text
              div.b View the different leaderboards over here!
              div Coming soon: Burned NFTs leaderboards
              div.i.mt3 This page is a work in progress
            // v-btn(@click='testSnack()')ç
            div.tc.b.mb2.mt4 Available leaderboards

            v-list(color='transparent', light)
              template(v-for='(board, index) in leaderboards')
                v-list-item.pointer(@click='toggleBoard(board)')
                  v-list-item-content
                    div.row-wrapper
                      div.first-row
                        div.mr2(v-if='board.icon') 🏆
                        v-img.mr2(v-else-if='board.image', :src="require('@/assets/images/' + board.image)", width='20px', height='20px', contain, style='max-width: 30px')
                        span.link-content(:class='board.classes ? board.classes : null') {{board.title}}
          div(v-else)
            div.tc.pt3
              v-btn.tc(@click='leaveBoard()',outlined) < All Leaderboards
            div(v-if='sortedEntries')
              scoreboard(:board='activeBoard', :data='sortedEntries')
            div.pa3.w-100.tc(v-else) Loading scoreboard, please wait...
          //- pre {{sortedEntries}}
</template>
<style lang='sass'>
.scoreboard-window.desktop-window
  .quicklinks__wrapper
    display: flex
    flex-direction: column
    min-width: 300px
    max-width: 500px
    margin: 0 auto
    .intro-text
      font-size: 20px
      text-align: center
      padding: 20px
    .v-list-item
      padding: 0
      min-height: 50px
      background-color: white
      .v-list-item__content
        padding: 8px 0
    .row-wrapper
      display: flex
      align-items: center
      font-size: 20px
      padding: 10px
      &.headers
        font-size: 20px
        padding-bottom: 10px
        border-bottom: solid 1px black
        font-weight: bold
      .first-row
        min-width: 300px
        flex-grow: 1
        display: flex
      .second-row
        min-width: 100px
      .third-row
        min-width: 80px
  @media all and (max-width:$medium)
    .quicklinks__wrapper
      .intro-text
        font-size: 16px
        text-align: center
        padding: 10px
</style>
