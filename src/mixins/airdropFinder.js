// import * as Waxjs from '@waxio/waxjs/dist'
import { sortBy } from 'lodash'

export default {
  data () {
    return {
      wallets: null,
      walletsSoftware: null,
      rigOwners: [],
      softwareOwners: [],
      loading: false,
      filteredWallets: [],
      filteredSoftwareWallets: [],
      rigTemplateIds: ['513144', '513142'],
      templatesPools: [
        {
          color: 'green',
          templateId: '513149',
          priority: 4,
          validWallets: []
        },
        {
          color: 'yellow',
          templateId: '526129',
          priority: 3,
          validWallets: []
        },
        {
          color: 'red',
          templateId: '526130',
          priority: 2,
          validWallets: []
        },
        {
          color: 'purple',
          templateId: '526131',
          priority: 1,
          validWallets: []
        }
      ],
      softwareTemplates: [
        {
          color: 'green',
          templateId: '513149',
          priority: 4
        },
        {
          color: 'yellow',
          templateId: '526129',
          priority: 3
        },
        {
          color: 'red',
          templateId: '526130',
          priority: 2
        },
        {
          color: 'purple',
          templateId: '526131',
          priority: 1
        }
      ]
    }
  },
  mounted () {
  },
  methods: {
    async fetchNfts () {
      this.resetData()
      this.loading = true
      try {
        Promise.all([
          fetch('https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=virusbusters&schema_name=work.tool&template_data.type=Rig&burned=false&page=1&limit=100&order=desc&sort=asset_id', this.$store.state.App.globalHeader),
          fetch('https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=virusbusters&schema_name=work.tool&template_data.type=Software&burned=false&page=1&order=desc&sort=asset_id', this.$store.state.App.globalHeader)
          // fetch('https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=virusbusters&schema_name=work.tool&template_id=513142&burned=false&page=1&limit=100&order=desc&sort=asset_id', this.$store.state.App.globalHeader)
        ]).then(async ([rig, soft]) => {
          const a = await rig.json()
          const b = await soft.json()
          // return a.data.concat(b.data)
          const nfts = {
            rigs: a.data,
            softwares: b.data
          }
          return nfts
        })
          .then((response) => {
            console.log('response', response)
            this.softwareOwners = response.softwares
            response.rigs.forEach(wallet => {
              this.rigOwners.push(wallet.owner)
            })
            this.rigOwners.forEach((wallet, ind) => {
              const found = this.filteredWallets.findIndex(wall => {
                return wall.wallet === wallet
              })
              if (found >= 0) {
                this.filteredWallets[found].qty++
                console.log('existing wallet, changin qty:', wallet, this.filteredWallets[found].qty)
              } else {
                console.log('new wallet, adding:', wallet)
                const tempWallet = {
                  index: ind,
                  wallet: wallet,
                  qty: 1,
                  softwares: this.getUserSoftwares(wallet),
                  assets: []
                }
                this.filteredWallets.push(tempWallet)
              }
            })
            this.wallets = sortBy(this.filteredWallets, [function (o) { return o.wallet }])
            this.loading = false
          }).catch((err) => {
            console.log(err)
          })
      } catch (e) {
        console.log('error', e)
      }
    },
    analyzeAirdrop () {
      if (this.wallets && !this.loading) {
        this.wallets.forEach(wall => {
          const tempSoftwareList = wall.softwares
          for (let z = wall.qty; z > 0; z--) {
            let found = tempSoftwareList.findIndex(soft => soft.template.immutable_data.rarity === 'Legendary')
            if (found >= 0) {
              console.log('FOUND!', found)
              this.templatesPools[3].validWallets.push(wall.wallet)
              tempSoftwareList.splice(found, 1)
              console.log('tempsoftwareList', tempSoftwareList)
              continue
            } else {
              console.log('No Legendary found, on continue')
              found = tempSoftwareList.findIndex(soft => soft.template.immutable_data.rarity === 'Rare')
              if (found >= 0) {
                this.templatesPools[2].validWallets.push(wall.wallet)
                tempSoftwareList.splice(found, 1)
              } else {
                console.log('No Rare found, on continue')
                found = tempSoftwareList.findIndex(soft => soft.template.immutable_data.rarity === 'Uncommon')
                if (found >= 0) {
                  this.templatesPools[1].validWallets.push(wall.wallet)
                  tempSoftwareList.splice(found, 1)
                } else {
                  console.log('No Uncommon found, on continue')
                  found = tempSoftwareList.findIndex(soft => soft.template.immutable_data.rarity === 'Common')
                  if (found >= 0) {
                    this.templatesPools[0].validWallets.push(wall.wallet)
                    tempSoftwareList.splice(found, 1)
                  } else {
                    console.log('No Common found')
                    break
                  }
                }
              }
            }
          }
        })
      }
    },
    getSoftwareType (id) {
      const found = this.softwareTemplates.findIndex(soft => {
        return soft.templateId === id
      })
      return this.softwareTemplates[found]
    },
    getUserSoftwares (wallet) {
      if (this.softwareOwners && this.softwareOwners.length) {
        // console.log('this.softwaresOwners', this.softwareOwners)
        return this.softwareOwners.filter(software => {
          return software.owner === wallet
        })
      } else {
        console.log('No software owners?')
        return null
      }
    },
    resetData () {
      this.wallets = null
      this.walletsSoftware = null
      this.rigOwners = []
      this.softwareOwners = []
      this.filteredWallets = []
      this.filteredSoftwareWallets = []
      this.templatesPools = [
        {
          color: 'green',
          templateId: '513149',
          priority: 4,
          validWallets: []
        },
        {
          color: 'yellow',
          templateId: '526129',
          priority: 3,
          validWallets: []
        },
        {
          color: 'red',
          templateId: '526130',
          priority: 2,
          validWallets: []
        },
        {
          color: 'purple',
          templateId: '526131',
          priority: 1,
          validWallets: []
        }
      ]
    }
  }
}
