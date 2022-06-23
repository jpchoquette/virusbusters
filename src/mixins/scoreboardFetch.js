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
      loading: false,
      currentBoard: null,
      rarities: ['Common', 'Uncommon', 'Rare', 'Legendary'],
      tiers: ['Bronze', 'Silver', 'Gold']
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
    fetchAtomicLeaderboard (url, page, previousResponse, type) {
      console.log('current page check?:', page, previousResponse, type)
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
            return this.fetchAtomicLeaderboard(url, page, response, type)
          }
          const entries = []
          response.forEach(entry => {
            const found = entries.findIndex(e => e.owner === entry.owner)
            if (type === 'burns') {
              if (found >= 0) {
                entries[found].score = entries[found].score + 5
              } else {
                const newEntry = {
                  wallet: entry.owner,
                  score: 5
                }
                entries.push(newEntry)
              }
            } else if (type === 'trophies') {
              console.log('On est bien rentré ici', entry)
              const rarityMultipliers = [1, 2, 3, 4]
              const tierValue = [1, 5, 10]
              let activeRarity = null
              let activeTier = null
              let score = 0
              this.getNftData(entry)


              if (activeRarity && activeTier) {
                score = rarityMultipliers[activeRarity] * tierValue[activeTier]
                if (found >= 0) {
                  entries[found].score = entries[found].score + score
                } else {
                  const newEntry = {
                    wallet: entry.owner,
                    score: score
                  }
                  entries.push(newEntry)
                }
              }
            }
          })
          // get top 50
          const reducedList = entries.slice(0, 50)
          this.sortedEntries = orderBy(reducedList, ['score'], ['desc'])
          this.loading = false
        })
    },
    async getNftData (entry) {
      for (let i = 0; i < this.rarities.length; i++) {
        if (entry.data.rarity === this.rarities[i]) {
          console.log(this.rarities[i], ' trophy found')
          activeRarity = i
        }
      }
      for (let j = 0; j < this.tiers.length; j++) {
        if (entry.data.tier === this.tiers[j]) {
          console.log(this.tiers[j], ' trophy found')
          activeTier = j
        }
      }
      return
    }
  }
}
