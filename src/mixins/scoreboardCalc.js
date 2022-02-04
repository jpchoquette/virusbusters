import { orderBy } from 'lodash'
export default {
  name: 'scoreboardCalc',
  components: {
  },
  data () {
    return {
      wallet: null,
      score: null,
      parsedScoreboard: null,
      sortedEntries: null
    }
  },
  mounted () {
    this.fetchScoreboard()
  },
  computed: {
    currentScore: {
      set (val) { this.$store.commit('Games/setCurrentScore', val) },
      get () { return this.$store.state.Games.currentScore }
    }
  },
  watch: {
    // currentScore (newVal) {
    //   if (newVal) {
    //     this.verifyHighscore()
    //   }
    // }
  },
  methods: {
    sendScoreboardData (game, score) {
      this.verifyHighscore(score)
    },
    fetchScoreboard (url) {
      const req = new XMLHttpRequest()
      req.onreadystatechange = () => {
        if (req.readyState === XMLHttpRequest.DONE) {
          const tempData = req.responseText
          this.parsedScoreboard = JSON.parse(tempData).record
          this.sortedEntries = orderBy(this.parsedScoreboard.entries, ['score'], ['desc'])
        }
      }
      req.open('GET', 'https://api.jsonbin.io/v3/b/61fc9df4f77b236211eb03a1', true)
      req.setRequestHeader('X-Master-Key', '$2b$10$LPV.o8jEECsT.Gy.0wkRNOYj//DS1t1FICmeZ9ZY54sCNoox8HRNG')
      req.send()
    },
    verifyHighscore (score) {
      if (score > 0 && this.parsedScoreboard && this.parsedScoreboard.entries) {
        const found = this.parsedScoreboard.entries.findIndex(ent => ent.wallet === this.$store.state.User.userProfile)
        if (found >= 0) {
          if (this.parsedScoreboard.entries[found].score < score) {
            this.updateScoreboard('update', score, found)
          }
        } else {
          const lowestScore = this.parsedScoreboard.entries.reduce(function (prev, curr) {
            return prev.score < curr.score ? prev : curr
          })
          if (this.parsedScoreboard.entries.length < 50) {
            this.updateScoreboard('new', score)
          } else if (score > lowestScore.score) {
            this.updateScoreboard('replace', score)
          }
        }
      }
    },
    updateScoreboard (type, score, indexToReplace) {
      const tempScoreboard = this.parsedScoreboard
      tempScoreboard.entries = this.sortedEntries
      // console.log('tempScoreboard', tempScoreboard)
      if (score) {
        if (type === 'new') {
          console.log('First registered score for ' + this.$store.state.User.userProfile + ': ' + score)
          const entry = {
            wallet: this.$store.state.User.userProfile,
            score: score
          }
          tempScoreboard.entries.push(entry)
        } else if (type === 'update') {
          console.log('New high score for ' + this.$store.state.User.userProfile + ': ' + score)
          // console.log('updatingval')
          tempScoreboard.entries[indexToReplace].score = score
        } else if (type === 'replace') {
          console.log('New score for ' + this.$store.state.User.userProfile + ': ' + score)
          // console.log('replacing lowest val')
          tempScoreboard.entries[tempScoreboard.entries.length - 1] = {
            wallet: this.$store.state.User.userProfile,
            score: score
          }
        }
        tempScoreboard.entries = orderBy(this.parsedScoreboard.entries, ['score'], ['desc'])

        const req = new XMLHttpRequest()
        req.onreadystatechange = () => {
          if (req.readyState === XMLHttpRequest.DONE) {
            // console.log(req.responseText)
            // this.scoreboardData = req.responseText
          }
        }
        req.open('PUT', 'https://api.jsonbin.io/v3/b/61fc9df4f77b236211eb03a1', true)
        req.setRequestHeader('Content-Type', 'application/json')
        req.setRequestHeader('X-Master-Key', '$2b$10$LPV.o8jEECsT.Gy.0wkRNOYj//DS1t1FICmeZ9ZY54sCNoox8HRNG')
        req.send(JSON.stringify(tempScoreboard))
        // req.send('{"sample": "Hello World"}')
        console.log('Scoreboard has been updated')
        // We push a notification
        this.$store.commit('App/setShowSnackbarGlobal', true)
        this.$store.commit('App/setSnackbarGlobalContent', { type: 'highscore', title: 'New highscore!', color: '#ffaa00', icon: '🏆', description: 'Congrats! Your score for Popup Fighter has been added to the leaderboard' })
      } else {
        console.log('Score for user could not be found :(')
      }
    }
  }
}
