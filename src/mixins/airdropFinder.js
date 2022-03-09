// import * as Waxjs from '@waxio/waxjs/dist'
// import { sortedUniqBy } from 'lodash'

export default {
  data () {
    return {
      // wax: null
      wallets: null,
      loading: false,
      rigTemplateId: '383212',
      templatesPools: [
        {
          color: 'purple',
          templateId: '396463',
          priority: 1,
          validWallets: []
        },
        {
          color: 'red',
          templateId: '400688',
          priority: 2,
          validWallets: []
        },
        {
          color: 'yellow',
          templateId: '391473',
          priority: 3,
          validWallets: []
        },
        {
          color: 'green',
          templateId: '402478',
          priority: 4,
          validWallets: []
        }
      ]
    }
  },
  mounted () {
  },
  methods: {
    async fetchWallets () {
      this.wallets = []
      console.log('on commence le fetch')
      this.loading = true
      try {
        const response = await this.fetchRigsOwners()
        const parsedWallets = await response
        const filteredWallets = []
        parsedWallets.forEach((wallet, ind) => {
          const found = filteredWallets.findIndex(wall => {
            return wall.wallet === wallet
          })
          if (found >= 0) {
            console.log('existing wallet, changin qty:', wallet)
            filteredWallets[found].qty++
          } else {
            console.log('new wallet, adding:', wallet)
            const tempWallet = {
              index: ind,
              wallet: wallet,
              qty: 1,
              assets: []
            }
            filteredWallets.push(tempWallet)
          }
        })
        this.wallets = filteredWallets
        if (this.wallets) {
          this.wallets.forEach(wallet => {
            this.fetchUsersSoftwares(wallet)
          })
        }
        this.loading = false
      } catch (e) {
        console.log('error', e)
      }
    },
    fetchRigsOwners () {
      return fetch('https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=virusbusters&schema_name=packs&template_id=' + this.rigTemplateId + '&burned=false&page=1&limit=100&order=desc&sort=asset_id', this.$store.state.App.globalHeader)
        .then(response => response.json())
        .then(data => {
          const parsedWallets = []
          console.log('on parse')
          data.data.forEach(wallet => {
            parsedWallets.push(wallet.owner)
          })
          return parsedWallets
        })
    },
    fetchUsersSoftwares (wallet) {
      this.loading = true
      fetch('https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=virusbusters&schema_name=packs&burned=false&owner=' + wallet.wallet + '&page=1&limit=100&order=desc&sort=asset_id', this.$store.state.App.globalHeader)
        .then(response => response.json())
        .then(data => {
          wallet.assets = data.data
        })
    },
    sortWallets () {
      const tempWallets = this.wallets
      this.loading = true
      tempWallets.forEach((wall, index) => {
        for (let z = 0; z < wall.qty; z++) {
          console.log('check rig no:', z, ' for:', wall.wallet)
          for (let i = 0; i < this.templatesPools.length; i++) {
            const found = wall.assets.findIndex(asset => {
              // console.log('ids comparés:', asset.template.template_id, this.templatesPools[i].templateId, asset.template.template_id === this.templatesPools[i].templateId, wall.wallet)
              return asset.template.template_id === this.templatesPools[i].templateId
            })
            if (found >= 0) {
              // console.log('found!', this.templatesPools[i].templateId, 'priority:', this.templatesPools[i].priority, 'wallet:', wall.wallet)
              // console.log('walletbeforesplice:', wallet)
              wall.assets.splice(found, 1)
              // console.log('newWalletvalues:', wallet)
              this.templatesPools[i].validWallets.push(wall.wallet)
              break
            } else {
              continue
            }
          }
        }
      })
      this.loading = false
    }
  }
}
