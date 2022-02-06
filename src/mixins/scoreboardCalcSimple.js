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
      sortedEntries: null,
      // Debug bin popup
      // currentBin: '61ff377af77b236211ed73b5'
      // Prod bin popup
      currentBin: '61ff373af77b236211ed7386'
    }
  },
  mounted () {
  },
  computed: {
    currentScore: {
      set (val) { this.$store.commit('Games/setCurrentScore', val) },
      get () { return this.$store.state.Games.currentScore }
    }
  },
  watch: {
  },
  methods: {
    sendScoreboardData (game, score) {
      // console.log('score data sent', score)
      this.fetchScoreboard(true)
      this.score = score
    },
    fetchScoreboard (update) {
      const req = new XMLHttpRequest()
      req.onreadystatechange = () => {
        if (req.readyState === XMLHttpRequest.DONE) {
          // console.log(req.responseText)
          if (update) {
            this.parsedScoreboard = JSON.parse(req.responseText).record
            this.sortedEntries = orderBy(this.parsedScoreboard.entries, ['score'], ['desc'])
            setTimeout(() => {
              this.verifyHighscore()
            }, 1000)
          }
        }
      }
      // debug bin: 61fd84b369b72261be502685
      // main bin: 61fc9df4f77b236211eb03a1
      req.open('GET', 'https://api.jsonbin.io/v3/b/' + this.currentBin, true)
      req.setRequestHeader('X-Master-Key', '$2b$10$LPV.o8jEECsT.Gy.0wkRNOYj//DS1t1FICmeZ9ZY54sCNoox8HRNG')
      req.send()
    },
    verifyHighscore () {
      // console.log('verify', this.score, this.parsedScoreboard)
      if (this.score > 0 && this.parsedScoreboard && this.parsedScoreboard.entries) {
        const found = this.parsedScoreboard.entries.findIndex(ent => ent.wallet === this.$store.state.User.userProfile)
        if (found >= 0) {
          if (this.parsedScoreboard.entries[found].score < this.score) {
            this.updateScoreboard('update', this.score, found)
          } else {
            console.log('This score is lower than you highscore, sorry!')
          }
        } else {
          const lowestScore = this.parsedScoreboard.entries.reduce(function (prev, curr) {
            return prev.score < curr.score ? prev : curr
          })
          if (this.parsedScoreboard.entries.length < 50) {
            this.updateScoreboard('new', this.score)
          } else if (this.score > lowestScore.score) {
            this.updateScoreboard('replace', this.score)
          }
        }
      }
    },
    updateScoreboard (type, score, indexToReplace) {
      const tempScoreboard = this.parsedScoreboard
      tempScoreboard.entries = this.sortedEntries
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
          tempScoreboard.entries[indexToReplace].score = score
        } else if (type === 'replace') {
          console.log('New score for ' + this.$store.state.User.userProfile + ': ' + score)
          tempScoreboard.entries[tempScoreboard.entries.length - 1] = {
            wallet: this.$store.state.User.userProfile,
            score: score
          }
        }
        tempScoreboard.entries = orderBy(tempScoreboard.entries, ['score'], ['desc'])

        const req = new XMLHttpRequest()
        req.onreadystatechange = () => {
          if (req.readyState === XMLHttpRequest.DONE) {
            // console.log(req.responseText)
            // this.scoreboardData = req.responseText
          }
        }
        req.open('PUT', 'https://api.jsonbin.io/v3/b/' + this.currentBin, true)
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
