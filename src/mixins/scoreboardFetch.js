import { orderBy } from 'lodash'
export default {
  name: 'scoreboardFetch',
  components: {
  },
  data () {
    return {
      parsedScoreboard: null,
      sortedEntries: null
    }
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    fetchLeaderboard (dataId) {
      console.log('looking for leaderboard infos...')
      const req = new XMLHttpRequest()
      req.onreadystatechange = () => {
        if (req.readyState === XMLHttpRequest.DONE) {
          const tempData = req.responseText
          this.parsedScoreboard = JSON.parse(tempData).record
          this.sortedEntries = orderBy(this.parsedScoreboard.entries, ['score'], ['desc'])
          // console.log('this.sortedentries', this.sortedEntries)
          this.$emit('leaderboardData', this.sortedEntries)
        }
      }
      req.open('GET', 'https://api.jsonbin.io/v3/b/' + dataId, true)
      req.setRequestHeader('X-Master-Key', '$2b$10$LPV.o8jEECsT.Gy.0wkRNOYj//DS1t1FICmeZ9ZY54sCNoox8HRNG')
      req.send()
    }
  }
}
