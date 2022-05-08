// import * as Waxjs from '@waxio/waxjs/dist'
// import { sortedUniqBy } from 'lodash'

export default {
  data () {
    return {
      // wax: null
      filteringInput: 'comma',
      filteringInputBlacklist: 'comma',
      filteringOutput: 'comma',
      blacklist: null,
      whitelist: null,
      whitelistArray: [],
      filteredWhitelist: null
      // neftyWhitelist: null
    }
  },
  mounted () {
  },
  computed: {
    neftyWhitelist () {
      if (this.filteredWhitelist) {
        return this.filteredWhitelist.join(',\n')
      } else {
        return null
      }
    },
    lineBreakWhitelist () {
      if (this.filteredWhitelist) {
        return this.filteredWhitelist.join('\n')
      } else {
        return null
      }
    },
    commaWhitelist () {
      if (this.filteredWhitelist) {
        return this.filteredWhitelist.toString()
      } else {
        return null
      }
    },
    outputWhitelist () {
      if (this.filteringOutput === 'comma') {
        return this.commaWhitelist
      } else if (this.filteringOutput === 'linebreak') {
        return this.lineBreakWhitelist
      } else if (this.filteringOutput === 'nefty') {
        return this.neftyWhitelist
      }
    }
  },
  methods: {
    // sortWallets () {
    //   const tempWallets = this.wallets
    //   this.loading = true
    //   tempWallets.forEach((wall, index) => {
    //     for (let z = 0; z < wall.qty; z++) {
    //       console.log('check rig no:', z, ' for:', wall.wallet)
    //       for (let i = 0; i < this.templatesPools.length; i++) {
    //         const found = wall.assets.findIndex(asset => {
    //           // console.log('ids comparés:', asset.template.template_id, this.templatesPools[i].templateId, asset.template.template_id === this.templatesPools[i].templateId, wall.wallet)
    //           return asset.template.template_id === this.templatesPools[i].templateId
    //         })
    //         if (found >= 0) {
    //           // console.log('found!', this.templatesPools[i].templateId, 'priority:', this.templatesPools[i].priority, 'wallet:', wall.wallet)
    //           // console.log('walletbeforesplice:', wallet)
    //           wall.assets.splice(found, 1)
    //           // console.log('newWalletvalues:', wallet)
    //           this.templatesPools[i].validWallets.push(wall.wallet)
    //           break
    //         } else {
    //           continue
    //         }
    //       }
    //     }
    //   })
    //   this.loading = false
    // }
    compareLists () {
      if (this.whitelist) {
        let parsedWhitelist = null
        let parsedBlacklist = null

        if (this.filteringInput === 'comma') {
          const stringWhitelist = this.whitelist.replace(/\s+/g, '').trim()
          parsedWhitelist = stringWhitelist.split(',')
        } else if (this.filteringInput === 'linebreak') {
          parsedWhitelist = this.whitelist.match(/\S+/g)
        }
        if (this.blacklist) {
          if (this.filteringInput === 'comma') {
            const stringBlacklist = this.blacklist.replace(/\s+/g, '').trim()
            parsedBlacklist = stringBlacklist.split(',')
          } else if (this.filteringInput === 'linebreak') {
            parsedBlacklist = this.blacklist.match(/\S+/g)
          }
          const baseList = parsedWhitelist.filter(val => !parsedBlacklist.includes(val))
          this.filteredWhitelist = [...new Set(baseList)]
        } else {
          this.filteredWhitelist = [...new Set(parsedWhitelist)]
        }

        // console.log('parsed', parsedBlacklist, parsedWhitelist)
        // this.filteredWhitelist = parsedWhitelist.filter(val => !parsedBlacklist.includes(val))
        // this.neftyWhitelist = this.filteredWhitelist.join(',\n')
      } else {
        window.alert('Please add wallets in both fields and make sure they are comma separated.')
      }
    },
    removeFromList (id) {
      const tempArray = this.filteredWhitelist
      console.log('on va remvoe cet element la', id)
      tempArray.splice(id, 1)
      this.filteredWhitelist = tempArray
      console.log('this.filteredWhitelist', this.filteredWhitelist)
      // this.filteredWhitelist
    }
  }
}
