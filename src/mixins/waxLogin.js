import * as Waxjs from '@waxio/waxjs/dist'

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
          console.log('Userconnected - From watcher')
          this.fetchVirusBustersNFTs()
        } else {
          console.log('on est pas connected')
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
        this.userProfile = userAccount
        this.userConnected = true
        // const pubKeys = this.wax.pubKeys
        // const str = 'AutoLogin enabled for account: ' + userAccount + '<br/>Active: ' + pubKeys[0] + '<br/>Owner: ' + pubKeys[1]
        // document.getElementById('autologin').insertAdjacentHTML('beforeend', str)
      } else {
        this.userProfile = null
        this.userConnected = false
        // document.getElementById('autologin').insertAdjacentHTML('beforeend', 'Not auto-logged in')
      }
    },
    // normal login. Triggers a popup for non-whitelisted dapps
    async login () {
      if (!this.wax) {
        this.wax = new Waxjs.WaxJS({
          rpcEndpoint: 'https://wax.greymass.com'
        })
      }
      console.log('on essaie de se logger')
      try {
        // if autologged in, this simply returns the userAccount w/no popup
        const userAccount = await this.wax.login()
        // const pubKeys = this.wax.pubKeys
        this.userProfile = userAccount
        this.userConnected = true
        // const str = 'Account: ' + userAccount + '<br/>Active: ' + pubKeys[0] + '<br/>Owner: ' + pubKeys[1]
        // document.getElementById('loginresponse').insertAdjacentHTML('beforeend', str)
      } catch (e) {
        this.userProfile = null
        this.userConnected = true
        // document.getElementById('loginresponse').append(e.message)
      }
      console.log('profile', this.userProfile)
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
      // setCookie("wax-address", '');
      this.userConnected = false
      this.userProfile = null
      this.userTemplates = null
      this.wax = null
    },
    async fetchVirusBustersNFTs () {
      fetch('https://wax.api.atomicassets.io/atomicassets/v1/assets?limit=200&page=1&collection_name=coindodocard&owner=' + this.userProfile, {
        headers: {
          'Access-Control-Allow-Origin': '*',
          credentials: 'omit'
        }
      })
        .then(response => response.json())
        .then(data => {
          console.log('data salut', data)
          this.userTemplates = data.data
        })
    }
  }
}
