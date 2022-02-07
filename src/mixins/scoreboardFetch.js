import { orderBy } from 'lodash'
export default {
  name: 'scoreboardFetch',
  components: {
  },
  data () {
    return {
      parsedScoreboard: null,
      sortedEntries: null,
      atomicStats: null,
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
    fetchAtomicLeaderboard (url, page, previousResponse) {
      this.loading = true
      fetch(url + '&page=' + page, {
        headers: {
          accept: '*/*',
          'accept-language': 'en-US,en;q=0.9',
          'cache-control': 'no-cache',
          'content-type': 'application/json',
          pragma: 'no-cache',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
          'sec-gpc': '1'
        },
        referrer: 'https://wax.atomichub.io/',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: null,
        method: 'GET',
        mode: 'cors',
        credentials: 'omit'
      })
        .then(response => response.json())
        .then(newResponse => {
          const response = [...previousResponse, ...newResponse.data] // Combine the two arrays
          if (newResponse.data.length !== 0) {
            page++
            return this.fetchAtomicLeaderboard(url, page, response)
          }
          const entries = []
          response.forEach(entry => {
            const found = entries.findIndex(e => e.wallet === entry.sender_name)
            if (found >= 0) {
              entries[found].score = entries[found].score + 5
            } else {
              const newEntry = {
                wallet: entry.sender_name,
                score: 5
              }
              entries.push(newEntry)
            }
          })
          // get top 50
          const reducedList = entries.slice(0, 50)
          this.sortedEntries = orderBy(reducedList, ['score'], ['desc'])
          this.loading = false
        })
    }
  }
}
