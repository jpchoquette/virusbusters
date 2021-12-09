import * as Waxjs from '@waxio/waxjs/dist'
// import AnchorLink from 'anchor-link'
// import AnchorLinkBrowserTransport from 'anchor-link-browser-transport'
// const transport = new AnchorLinkBrowserTransport()
// const link = new AnchorLink({
//   transport,
//   chains: [
//     {
//       chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
//       nodeUrl: 'https://wax.greymass.com'
//     }
//   ]
// })
export default {
  data () {
    return {
      wax: null,
      blendSuccess: false,
      blendError: false
    }
  },
  mounted () {
    this.wax = new Waxjs.WaxJS({
      rpcEndpoint: 'https://wax.greymass.com'
    })
    // console.log('this.wax', this.wax)
    this.checkUser()
  },
  methods: {
    async checkUser () {
      try {
        // if autologged in, this simply returns the userAccount w/no popup
        const userAccount = await this.wax.login()
        return userAccount
        // this.loggedIn(userAccount)
        // this.accountType = 'wcw'
      } catch (e) {
        console.log('return error', e)
        // this.profile = null
        // this.accountType = null
      }
    },
    async blendNfts (assetsToBlend, blendResult) {
      this.blendError = false
      this.blendSuccess = false
      this.errorMessage = null
      console.log('blending those:', this.$store.state.User.userProfile, assetsToBlend, blendResult)
      if (!this.$store.state.User.userProfile) {
        alert('Please log in to continue')
      }
      const actions = {
        account: 'atomicassets',
        name: 'transfer',
        authorization: [{
          actor: this.$store.state.User.userProfile,
          permission: 'active'
        }],
        data: {
          from: this.$store.state.User.userProfile,
          to: 'blenderizerx',
          asset_ids: assetsToBlend,
          memo: blendResult
        }
      }
      try {
        const result = await this.wax.api.transact({
          actions: [actions]
        }, {
          blocksBehind: 3,
          expireSeconds: 1200
        })
        console.log('result', result)
        this.blendSuccess = true
      } catch (e) {
        this.errorMessage = e
        this.blendError = true
        this.blendSuccess = false
      }
    }
  }
}
