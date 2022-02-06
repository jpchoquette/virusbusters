import { orderBy } from 'lodash'
export default {
  name: 'scoreboardCalcDeep',
  components: {
  },
  data () {
    return {
      wallet: null,
      score: null,
      size: null,
      difficulty: null,
      parsedScoreboard: null,
      sortedEntries: null,
      // RISKY CLICK DEBUG
      // currentBin: '61ff00504ce71361b8cfa8c9'
      // RISKY CLICK PROD
      currentBin: '61feb52369b72261be5137da'
    }
  },
  mounted () {
  },
  computed: {
  },
  watch: {
  },
  methods: {
    sendScoreboardData (score, size, difficulty) {
      // console.log('score data sent', score)
      this.score = score
      this.size = size.id
      this.difficulty = difficulty.id
      this.fetchScoreboard()
      // console.log('params', this.score, this.size, this.difficulty)
    },
    fetchScoreboard () {
      const req = new XMLHttpRequest()
      req.onreadystatechange = () => {
        if (req.readyState === XMLHttpRequest.DONE) {
          // console.log(req.responseText)
          this.parsedScoreboard = JSON.parse(req.responseText).record
          const tempEntries = this.parsedScoreboard.tables[this.size].tables[this.difficulty].entries
          this.sortedEntries = orderBy(tempEntries, ['score'], ['asc'])
          setTimeout(() => {
            this.verifyHighscore()
          }, 1000)
        }
      }
      req.open('GET', 'https://api.jsonbin.io/v3/b/' + this.currentBin, true)
      req.setRequestHeader('X-Master-Key', '$2b$10$LPV.o8jEECsT.Gy.0wkRNOYj//DS1t1FICmeZ9ZY54sCNoox8HRNG')
      req.send()
    },
    verifyHighscore () {
      // console.log('verify', this.score, this.parsedScoreboard)
      if (this.score > 0 && this.sortedEntries && this.sortedEntries.length) {
        const found = this.sortedEntries.findIndex(ent => ent.wallet === this.$store.state.User.userProfile)
        if (found >= 0) {
          if (this.sortedEntries[found].score > this.score) {
            this.updateScoreboard('update', this.score, found)
          } else {
            console.log('This is not a highscore, sorry!')
          }
        } else {
          const lowestScore = this.sortedEntries.reduce(function (prev, curr) {
            return prev.score > curr.score ? prev : curr
          })
          if (this.sortedEntries.length < 50) {
            this.updateScoreboard('new', this.score)
          } else if (this.score < lowestScore.score) {
            this.updateScoreboard('replace', this.score)
          }
        }
      }
    },
    updateScoreboard (type, score, indexToReplace) {
      const tempScoreboard = this.parsedScoreboard
      tempScoreboard.tables[this.size].tables[this.difficulty].entries = this.sortedEntries
      if (score) {
        if (type === 'new') {
          console.log('First registered score for ' + this.$store.state.User.userProfile + ': ' + score)
          const entry = {
            wallet: this.$store.state.User.userProfile,
            score: score
          }
          tempScoreboard.tables[this.size].tables[this.difficulty].entries.push(entry)
        } else if (type === 'update') {
          console.log('New high score for ' + this.$store.state.User.userProfile + ': ' + score)
          tempScoreboard.tables[this.size].tables[this.difficulty].entries[indexToReplace].score = score
        } else if (type === 'replace') {
          console.log('New score for ' + this.$store.state.User.userProfile + ': ' + score)
          tempScoreboard.tables[this.size].tables[this.difficulty].entries[tempScoreboard.entries.length - 1] = {
            wallet: this.$store.state.User.userProfile,
            score: score
          }
        }
        tempScoreboard.tables[this.size].tables[this.difficulty].entries = orderBy(tempScoreboard.tables[this.size].tables[this.difficulty].entries, ['score'], ['asc'])

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
        // console.log('Scoreboard has been updated', tempScoreboard, tempScoreboard.tables[this.size].tables[this.difficulty])
        // We push a notification
        this.$store.commit('App/setShowSnackbarGlobal', true)
        this.$store.commit('App/setSnackbarGlobalContent', { type: 'highscore', title: 'New highscore!', color: '#ffaa00', icon: '🏆', description: 'Congrats! Your score for Risky Click has been added to the leaderboard' })
      } else {
        console.log('Score for user could not be found :(')
      }
    }
  }
}
