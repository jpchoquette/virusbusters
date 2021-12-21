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
      ownedTemplates: [],
      templatesBlacklist: ['363838']
    }
  },
  computed: {
    profile: {
      set (val) { this.$store.commit('User/setUserProfile', val) },
      get () { return this.$store.state.User.userProfile }
    },
    accountType: {
      set (val) { this.$store.commit('User/setAccountType', val) },
      get () { return this.$store.state.User.accountType }
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
    },
    ownedCursorTemplates: {
      set (val) { this.$store.commit('Buster/setOwnedCursorTemplates', val) },
      get () { return this.$store.state.Buster.ownedCursorTemplates }
    },
    ownedThemeTemplates: {
      set (val) { this.$store.commit('Buster/setOwnedThemeTemplates', val) },
      get () { return this.$store.state.Buster.ownedThemeTemplates }
    },
    ownedWallpaperTemplates: {
      set (val) { this.$store.commit('Buster/setOwnedWallpaperTemplates', val) },
      get () { return this.$store.state.Buster.ownedWallpaperTemplates }
    },
    ownedGameTemplates: {
      set (val) { this.$store.commit('Buster/setOwnedGameTemplates', val) },
      get () { return this.$store.state.Buster.ownedGameTemplates }
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
          // this.fetchBustersNFTs()
          this.fetchOwnedBustersNFTs()
          this.fetchOwnedCustomizationsNFTs()
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
        console.log(`Logged in as ${session.auth.actor}`)
        const userAccount = session.auth.actor.toString()
        this.loggedIn(userAccount)
        this.accountType = 'anchor'
      } catch (e) {
        console.log(e)
        this.accountType = null
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
        this.loggedIn(userAccount)
        this.accountType = 'wcw'
      } catch (e) {
        this.profile = null
        this.accountType = null
      }
    },
    loggedIn (userId) {
      this.profile = userId
      this.userConnected = true
      if (localStorage.getItem('users') !== null) {
        const rawData = localStorage.getItem('users')
        const userBase = JSON.parse(rawData)
        const found = userBase.findIndex(user => user.profile === this.profile)
        if (found === -1) {
          const newUser = {
            profile: this.profile,
            preferences: {
              cursor: null,
              wallpaper: null,
              theme: null
            }
          }
          userBase.push(newUser)
          localStorage.setItem('users', JSON.stringify(userBase))
        }
      } else {
        const newUsers = [
          {
            profile: this.profile,
            preferences: {
              cursor: null,
              wallpaper: null,
              theme: null
            }
          }
        ]
        localStorage.setItem('users', JSON.stringify(newUsers))
      }
      // console.log('this.wax', this.wax)
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
      this.accountType = null
      this.userConnected = false
      this.profile = null
      this.busterTemplates = null
      this.wax = null
      // this.$cookies.remove('buster')
    },
    // async fetchBustersNFTs () {
    //   fetch('https://wax.api.atomicassets.io/atomicassets/v1/templates?limit=200&page=1&collection_name=virusbusters&owner=' + this.profile + '&schema_name=buster.heads', {
    //     headers: {
    //       accept: '*/*',
    //       'accept-language': 'en-US,en;q=0.9',
    //       'cache-control': 'no-cache',
    //       'content-type': 'application/json',
    //       pragma: 'no-cache',
    //       'sec-fetch-dest': 'empty',
    //       'sec-fetch-mode': 'cors',
    //       'sec-fetch-site': 'cross-site',
    //       'sec-gpc': '1'
    //     },
    //     referrer: 'https://wax.atomichub.io/',
    //     referrerPolicy: 'strict-origin-when-cross-origin',
    //     body: null,
    //     method: 'GET',
    //     mode: 'cors',
    //     credentials: 'omit'
    //   })
    //     .then(response => response.json())
    //     .then(data => {
    //       const tempTemplates = data.data
    //       this.templatesBlacklist.forEach(template => {
    //         const foundIndex = tempTemplates.findIndex(elem => elem.template_id === template)
    //         if (foundIndex > -1) {
    //           tempTemplates.splice(foundIndex, 1)
    //         }
    //       })
    //       // this.busterTemplates = tempTemplates
    //       this.ownedWallpaperTemplates.busters = tempTemplates
    //       console.log('newTemplkates', this.busterTemplates)
    //     })
    // },
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
          // this.ownedBusterTemplates = data.data
          this.ownedWallpaperTemplates.busters = data.data
        })
    },
    fetchOwnedCustomizationsNFTs () {
      fetch('https://wax.api.atomicassets.io/atomicassets/v1/assets?limit=200&page=1&collection_name=virusbusters&owner=' + this.profile + '&schema_name=virtual.desk', {
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
          // console.log('owned customizations', data.data)
          const tempCustomizationTemplates = data.data
          const cursors = []
          const themes = []
          const wallpapers = []
          const games = []
          tempCustomizationTemplates.forEach(template => {
            if (template.template.immutable_data.type === 'Cursor') {
              // console.log('On a un cursor', template)
              cursors.push(template)
            } else if (template.template.immutable_data.type === 'Theme') {
              // console.log('On a un theme', template)
              themes.push(template)
            } else if (template.template.immutable_data.type === 'Wallpaper') {
              // console.log('On a un wallpaper', template)
              wallpapers.push(template)
            } else if (template.template.immutable_data.type === 'Game') {
              // console.log('On a un wallpaper', template)
              games.push(template)
            }
          })
          this.ownedCursorTemplates = cursors
          this.ownedThemeTemplates = themes
          this.ownedWallpaperTemplates.wallpapers = wallpapers
          this.ownedGameTemplates = games
        })
    }
  }
}
