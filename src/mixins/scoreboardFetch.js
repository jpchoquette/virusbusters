import { orderBy } from 'lodash'
export default {
  name: 'scoreboardFetch',
  components: {
  },
  data () {
    return {
      parsedScoreboard: null,
      sortedEntries: null,
      loading: false
    }
  },
  mounted () {
  },
  computed: {
  },
  methods: {
    fetchCustomLeaderboard (dataId) {
      this.loading = true
      console.log('Fetching leaderboard infos...')
      const req = new XMLHttpRequest()
      req.onreadystatechange = () => {
        if (req.readyState === XMLHttpRequest.DONE) {
          const tempData = req.responseText
          this.parsedScoreboard = JSON.parse(tempData).record
          this.sortedEntries = orderBy(this.parsedScoreboard.entries, ['score'], ['desc'])
          this.loading = false
        }
      }
      req.open('GET', 'https://api.jsonbin.io/v3/b/' + dataId, true)
      req.setRequestHeader('X-Master-Key', '$2b$10$LPV.o8jEECsT.Gy.0wkRNOYj//DS1t1FICmeZ9ZY54sCNoox8HRNG')
      req.send()
    },
    fetchAtomicLeaderboard () {
      console.log('todo')
    }
  }
}
