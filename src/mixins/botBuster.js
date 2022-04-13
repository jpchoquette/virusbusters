// import * as Waxjs from '@waxio/waxjs/dist'
// import { sortedUniqBy } from 'lodash'

export default {
  data () {
    return {
      // wax: null
      blacklist: null,
      whitelist: null,
      filteredWhitelist: null,
      neftyWhitelist: null
    }
  },
  mounted () {
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
        const parsedWhitelist = this.whitelist.split(',')
        if (this.blacklist) {
          const parsedBlacklist = this.blacklist.split(',')
          this.filteredWhitelist = parsedWhitelist.filter(val => !parsedBlacklist.includes(val))
        } else {
          this.filteredWhitelist = parsedWhitelist
        }
        // console.log('parsed', parsedBlacklist, parsedWhitelist)
        // this.filteredWhitelist = parsedWhitelist.filter(val => !parsedBlacklist.includes(val))
        this.neftyWhitelist = this.filteredWhitelist.join(',\n')
      } else {
        window.alert('Please add wallets to filter them out')
      }
    }
  }
}
