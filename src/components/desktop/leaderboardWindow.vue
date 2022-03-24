<script>
import Scoreboard from '@/components/desktop/scoreboard'
import VirusSpinner from '@/components/shared/virusSpinner'
import ScoreboardFetch from '@/mixins/scoreboardFetch.js'
import VueResizable from 'vue-resizable'
import WindowBar from '@/components/shared/windowBar.vue'

export default {
  name: 'LeaderboardWindow',
  components: {
    VueResizable,
    Scoreboard,
    VirusSpinner,
    WindowBar
  },
  data () {
    return {
      leaderboardMenu: true,
      activeBoard: null,
      activeLeaderboardData: null,
      leaderboards: [
        {
          title: 'Popup Fighter Leaderboard',
          shorthand: 'popupfight',
          url: 'https://neftyblocks.com/c/virusbusters',
          type: 'jsonbin',
          dataId: '61ff373af77b236211ed7386',
          icon: '🏆',
          image: 'nefty-blocks-logo-small.svg',
          sortable: false,
          disabled: false,
          scoreType: 'points',
          sortingOrder: 'desc'
        },
        {
          title: 'Risky Click Leaderboard',
          shorthand: 'riskyclick',
          url: 'https://neftyblocks.com/c/virusbusters',
          type: 'jsonbin',
          // debug risky bin: 61ff00504ce71361b8cfa8c9
          // main risky bin: 61feb52369b72261be5137da
          dataId: '61feb52369b72261be5137da',
          icon: '🏆',
          image: 'nefty-blocks-logo-small.svg',
          sortable: true,
          disabled: true,
          scoreType: 'time',
          sortingOrder: 'asc'
        },
        {
          title: 'Burned Pop-Ups Leaderboard',
          shorthand: 'burnedpops',
          url: 'https://neftyblocks.com/c/virusbusters',
          type: 'atomicassets',
          dataId: null,
          query: 'https://wax.api.atomicassets.io/atomicassets/v1/transfers?recipient=blenderizerx&memo=350919&collection_name=virusbusters&collection_whitelist=virusbusters&limit=100&order=desc&sort=created',
          icon: '🔥',
          image: 'nefty-blocks-logo-small.svg',
          sortable: false,
          disabled: false,
          scoreType: 'points',
          sortingOrder: 'desc',
          cta: ''
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
        if (board.type === 'jsonbin') {
          this.fetchCustomLeaderboard(board.dataId)
        } else if (board.type === 'atomicassets') {
          this.fetchAtomicLeaderboard(board.query, 1, [])
        }
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
      window-bar(title='Leaderboards', @closeWindow='closeWindow')
      div.window-content(style='margin:0;padding:0;')
        div
          div.quicklinks__wrapper.h-100.w-100(v-if='leaderboardMenu')
            div.intro-text
              div.b View the different leaderboards over here!
              div.f6 More leaderboards coming soon!
            //- v-btn(@click='testSnack()')
            div.tc.b.mb2.mt4 Available leaderboards
            v-list(color='transparent', light)
              template(v-for='(board, index) in leaderboards')
                v-list-item.pointer(@click='toggleBoard(board)')
                  v-list-item-content
                    div.row-wrapper
                      div.first-row
                        div.mr2(v-if='board.icon') {{board.icon}}
                        v-img.mr2(v-else-if='board.image', :src="require('@/assets/images/' + board.image)", width='20px', height='20px', contain, style='max-width: 30px')
                        span.link-content(:class='board.classes ? board.classes : null') {{board.title}}
          div(v-else)
            div.tc.pt3
              v-btn.tc(@click='leaveBoard()',outlined) < All Leaderboards

            div.pa3.w-100.tc.flex.flex-column.items-center(v-if='loading')
              div.tc.mb3.f4.i.mt4 Loading leaderboard, please wait...
              virus-spinner
            div(v-else-if='!loading && activeBoard')
              template(v-if='parsedScoreboard && activeBoard.type === "jsonbin"')
                scoreboard(:board='activeBoard', :data='parsedScoreboard', :entries='sortedEntries', :loading='loading')
                div.i.mt3.f6.tc.mb3 !!! Work in progress - Game scores may be wiped out !!!
              div(v-else-if='activeBoard.type === "atomicassets"')
                scoreboard(:board='activeBoard', :entries='sortedEntries', :loading='loading')
</template>
<style lang='sass'>
.scoreboard-window.desktop-window
  .quicklinks__wrapper
    display: flex
    flex-direction: column
    min-width: 300px
    max-width: 500px
    margin: 0 auto
    padding-bottom: 20px
    .intro-text
      font-size: 20px
      text-align: center
      padding: 20px
    .v-list-item
      padding: 0
      min-height: 50px
      background-color: white
      &:not(:last-child)
        border-bottom: solid 1px var(--v-secondary-base)
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
