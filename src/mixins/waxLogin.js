import * as Waxjs from '@waxio/waxjs/dist'
import AnchorLink from 'anchor-link'
import AnchorLinkBrowserTransport from 'anchor-link-browser-transport'
const transport = new AnchorLinkBrowserTransport()
const link = new AnchorLink({
  transport,
  chains: [
    {
      chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
      nodeUrl: 'https://wax.greymass.com'
    }
  ]
})
export default {
  data () {
    return {
      wax: null,
      ownedTemplates: []
    }
  },
  computed: {
    profile: {
      set (val) { this.$store.commit('User/setUserProfile', val) },
      get () { return this.$store.state.User.userProfile }
    },
    userConnected: {
      set (val) { this.$store.commit('User/setUserConnected', val) },
      get () { return this.$store.state.User.userConnected }
    },
    userTemplates: {
      set (val) { this.$store.commit('User/setUserTemplates', val) },
      get () { return this.$store.state.User.userTemplates }
    },
    busterTemplates: {
      set (val) { this.$store.commit('Buster/setBusterTemplates', val) },
      get () { return this.$store.state.Buster.busterTemplates }
    },
    ownedBusterTemplates: {
      set (val) { this.$store.commit('Buster/setOwnedBusterTemplates', val) },
      get () { return this.$store.state.Buster.ownedBusterTemplates }
    }
  },
  mounted () {
    this.wax = new Waxjs.WaxJS({
      rpcEndpoint: 'https://wax.greymass.com'
    })
    // automatically check for credentials
    this.autoLogin()
  },
  watch: {
    '$store.state.User.userConnected': {
      immediate: true,
      handler (newVal) {
        if (newVal) {
          // console.log('Userconnected - From watcher')
          this.fetchBustersNFTs()
          this.fetchOwnedBustersNFTs()
        } else {
          // console.log('User not connected')
        }
      }
    }
  },
  methods: {
    // checks if autologin is available
    async autoLogin () {
      const isAutoLoginAvailable = await this.wax.isAutoLoginAvailable()
      if (isAutoLoginAvailable) {
        const userAccount = this.wax.userAccount
        this.profile = userAccount
        this.userConnected = true
        // const pubKeys = this.wax.pubKeys
        // const str = 'AutoLogin enabled for account: ' + userAccount + '<br/>Active: ' + pubKeys[0] + '<br/>Owner: ' + pubKeys[1]
        // document.getElementById('autologin').insertAdjacentHTML('beforeend', str)
      } else {
        this.profile = null
        this.userConnected = false
        // document.getElementById('autologin').insertAdjacentHTML('beforeend', 'Not auto-logged in')
      }
    },
    // normal login. Triggers a popup for non-whitelisted dapps
    async anchorLogin () {
      try {
        console.log('Login with ANCHOR')
        // Perform the login, which returns the users identity
        const identity = await link.login('mydapp')
        // Save the session within your application for future use
        const { session } = identity
        console.log(`Logged in as ${session.auth}`)
        const userAccount = session.auth.actor
        this.loggedIn(userAccount)
      } catch (e) {
        console.log(e)
      }
    },
    async login () {
      if (!this.wax) {
        this.wax = new Waxjs.WaxJS({
          rpcEndpoint: 'https://wax.greymass.com'
        })
      }
      console.log('Login with WCW')
      try {
        // if autologged in, this simply returns the userAccount w/no popup
        const userAccount = await this.wax.login()
        // const pubKeys = this.wax.pubKeys
        // this.profile = userAccount
        // this.userConnected = true
        this.loggedIn(userAccount)
        // const str = 'Account: ' + userAccount + '<br/>Active: ' + pubKeys[0] + '<br/>Owner: ' + pubKeys[1]
        // document.getElementById('loginresponse').insertAdjacentHTML('beforeend', str)
      } catch (e) {
        this.profile = null
        this.userConnected = true
        // document.getElementById('loginresponse').append(e.message)
      }
      console.log('profile', this.profile)
    },
    loggedIn (userAccount) {
      this.profile = userAccount
      this.userConnected = true
    },
    async sign () {
      if (!this.wax.api) {
        alert('Please log in to continue')
      }
      try {
        const result = await this.wax.api.transact({
          actions: [{
            account: 'eosio',
            name: 'delegatebw',
            authorization: [{
              actor: this.wax.userAccount,
              permission: 'active'
            }],
            data: {
              from: this.wax.userAccount,
              receiver: this.wax.userAccount,
              stake_net_quantity: '0.00000001 WAX',
              stake_cpu_quantity: '0.00000000 WAX',
              transfer: false,
              memo: 'This is a WaxJS/Cloud Wallet Demo.'
            }
          }]
        },
        {
          blocksBehind: 3,
          expireSeconds: 30
        })
        document.getElementById('response').append(JSON.stringify(result, null, 2))
      } catch (e) {
        document.getElementById('response').append(e.message)
      }
    },
    logout () {
      // Cookie à faire
      // setCookie('wax-address', '');
      this.userConnected = false
      this.profile = null
      this.busterTemplates = null
      this.wax = null
      this.$cookies.remove('buster')
    },
    async fetchBustersNFTs () {
      fetch('https://wax.api.atomicassets.io/atomicassets/v1/templates?limit=200&page=1&collection_name=virusbusters&schema_name=buster.heads', {
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
        .then(data => {
          this.busterTemplates = data.data
        })
    },
    fetchOwnedBustersNFTs () {
      fetch('https://wax.api.atomicassets.io/atomicassets/v1/assets?limit=200&page=1&collection_name=virusbusters&owner=' + this.profile + '&schema_name=buster.heads', {
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
        .then(data => {
          // console.log('owned busters', data)
          this.ownedBusterTemplates = data.data
        })
    }
  }
}
