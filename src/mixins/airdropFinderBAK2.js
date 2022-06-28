// import * as Waxjs from '@waxio/waxjs/dist'
import { sortBy } from 'lodash'

export default {
  data () {
    return {
      // wax: null
      test: null,
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
      this.wallets = []
      this.rigOwners = []
      this.filteredRigOwners = []
      this.softwareOwners = []
      this.filteredSoftwareOwners = []
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
            // this.softwareOwners.forEach((wallet, ind) => {
            //   const found = this.filteredWallets.findIndex(wall => {
            //     return wall.wallet === wallet
            //   })
            //   if (found >= 0) {
            //     this.filteredWallets[found].qty++
            //     console.log('existing wallet, changin qty:', wallet, this.filteredWallets[found].qty)
            //   } else {
            //     console.log('new wallet, adding:', wallet)
            //     const tempWallet = {
            //       index: ind,
            //       wallet: wallet,
            //       qty: 1,
            //       assets: []
            //     }
            //     this.filteredWallets.push(tempWallet)
            //   }
            // })
            this.wallets = sortBy(this.filteredWallets, [function (o) { return o.wallet }])

            this.loading = false
          }).catch((err) => {
            console.log(err)
          })
      } catch (e) {
        console.log('error', e)
      }
    },
    async fetchWallets () {
      this.filteredWallets = []
      this.wallets = []
      console.log('on commence le fetch')
      this.loading = true
      try {
        Promise.all([
          fetch('https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=virusbusters&schema_name=work.tool&template_data.type=Rig&burned=false&page=1&limit=100&order=desc&sort=asset_id', this.$store.state.App.globalHeader)
          // fetch('https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=virusbusters&schema_name=work.tool&template_id=513142&burned=false&page=1&limit=100&order=desc&sort=asset_id', this.$store.state.App.globalHeader)
        ]).then(async ([aa]) => {
          const a = await aa.json()
          // const b = await bb.json()
          // return a.data.concat(b.data)
          return a.data
        })
          .then((response) => {
            console.log('response', response)
            const parsedWallets = []
            console.log('on parse')
            response.forEach(wallet => {
              parsedWallets.push(wallet.owner)
            })
            parsedWallets.forEach((wallet, ind) => {
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
                  assets: []
                }
                this.filteredWallets.push(tempWallet)
              }
            })
            this.wallets = sortBy(this.filteredWallets, [function (o) { return o.wallet }])
            // if (this.wallets) {
            //   this.wallets.forEach(wallet => {
            //     // this.fetchUsersSoftwares(wallet)
            //   })
            // }
            this.loading = false
          }).catch((err) => {
            console.log(err)
          })
      } catch (e) {
        console.log('error', e)
      }
    },
    async fetchSoftwares () {
      this.filteredSoftwareWallets = []
      this.walletsSoftware = []
      console.log('on commence le fetch')
      this.loading = true
      try {
        Promise.all([
          fetch('https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=virusbusters&schema_name=work.tool&template_data.type=Software&burned=false&page=1&order=desc&sort=asset_id', this.$store.state.App.globalHeader)
          // fetch('https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=virusbusters&schema_name=work.tool&template_id=513149&burned=false&page=1&limit=100&order=desc&sort=asset_id', this.$store.state.App.globalHeader)
          // fetch('https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=virusbusters&schema_name=work.tool&template_id=513142&burned=false&page=1&limit=100&order=desc&sort=asset_id', this.$store.state.App.globalHeader)
        ]).then(async ([aa]) => {
          const a = await aa.json()
          // const b = await bb.json()
          return a.data
        })
          .then((response) => {
            console.log('response', response)
            const softwaresList = []
            console.log('on parse')
            response.forEach(software => {
              softwaresList.push(software)
            })
            console.log('softwareList', softwaresList)
            softwaresList.forEach((software, ind) => {
              const found = this.filteredSoftwareWallets.findIndex(wall => {
                return wall.wallet === software.owner
              })
              if (found >= 0) {
                this.filteredSoftwareWallets[found].qty++
                console.log('existing software wallet, changin qty:', software, this.filteredSoftwareWallets[found].qty)
              } else {
                console.log('new software wallet, adding:', software)
                const tempSoftware = {
                  index: ind,
                  wallet: software.owner,
                  type: this.getSoftwareType(software.template.template_id),
                  qty: 1,
                  assets: []
                }
                this.filteredSoftwareWallets.push(tempSoftware)
              }
            })
            this.walletsSoftware = sortBy(this.filteredSoftwareWallets, [function (o) { return o.wallet }])
            // if (this.walletsSoftware) {
            //   this.walletsSoftware.forEach(wallet => {
            //     // this.fetchUsersSoftwares(wallet)
            //   })
            // }
            this.loading = false
          }).catch((err) => {
            console.log(err)
          })
      } catch (e) {
        console.log('error', e)
      }
    },
    launchDispatcher () {
      if (this.wallets) {
        this.wallets.forEach(wallet => {
          setTimeout(() => {
            this.fetchUsersSoftwares(wallet)
            console.log('wallet', wallet)
          }, 200)
        })
        // this.sortWallets()
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
    // async fetchUsersSoftwares (wallet) {
    //   this.loading = true
    //   try {
    //     fetch('https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=virusbusters&schema_name=work.tool&burned=false&owner=' + wallet.wallet + '&page=1&limit=100&order=desc&sort=asset_id', this.$store.state.App.globalHeader)
    //       .then(response => response.json())
    //       .then(data => {
    //         console.log('data.data', wallet.wallet, data.data ? 'on a du date' : 'on a pas de data??')
    //         wallet.assets = data.data
    //       })
    //   } catch (e) {
    //     console.log('error', e)
    //   }
    // },
    sortWallets () {
      const tempWallets = this.wallets
      this.loading = true
      tempWallets.forEach((wall, index) => {
        for (let z = 0; z < wall.qty; z++) {
          // console.log('check rig no:', z, ' for:', wall.wallet)
          for (let i = 0; i < this.templatesPools.length; i++) {
            // console.log('wall', wall, wall.assets, this.templatesPools[i])
            if (wall && wall.assets) {
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
                console.log('not found', wall.wallet)
                continue
              }
            } else {
              console.log('no assets dectected', wall.wallet)
            }
          }
        }
      })
      this.loading = false
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
        console.log('No softwareowners?')
        return null
      }
    }
  }
}
