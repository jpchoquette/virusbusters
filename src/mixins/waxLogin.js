import * as Waxjs from '@waxio/waxjs/dist'
import AnchorLink from 'anchor-link'
import AnchorLinkBrowserTransport from 'anchor-link-browser-transport'
// import { JsonRpc, Api } from 'eosjs'
import ScatterJS from '@scatterjs/core'
import ScatterEOS from '@scatterjs/eosjs2'
ScatterJS.plugins(new ScatterEOS())
// const rpc = new JsonRpc(network.fullhost())
// anchor
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
    // const lastUser = this.$cookies.get('lastUser')
    // const parsedAccountType = JSON.parse(accType)
    // console.log('checkcookie acc', lastUser.type)
    // if (lastUser && lastUser.type && lastUser.type === 'wcw') {
    //   // automatically check for credentials
    //   // console.log('on auto-login, on est a wcw')
    //   // this.WCWlogin(true)
    //   // console.log('autolog', isAutoLoginAvailable)
    //   this.autoLogin()
    // }
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
      } else {
        this.profile = null
        this.userConnected = false
      }
    },
    // normal login. Triggers a popup for non-whitelisted dapps
    async WCWlogin () {
      if (!this.wax) {
        this.wax = new Waxjs.WaxJS({
          rpcEndpoint: 'https://wax.greymass.com'
        })
      }
      console.log('Login with WCW')
      try {
        const userAccount = await this.wax.login()
        this.loggedIn(userAccount)
        const temp = {
          type: 'wcw',
          account: userAccount
        }
        this.setLastUser(temp)
      } catch (e) {
        this.profile = null
        this.accountType = null
      }
    },
    async scatterLogin () {
      const network = ScatterJS.Network.fromJson({
        blockchain: 'wax',
        chainId: '1064487b3cd1a897ce03ae5b6a865651747e2e152090f99c1d19d44e01aea5a4',
        host: 'https://wax.greymass.com',
        port: 443,
        protocol: 'https'
      })
      console.log('Login with Wombat/Scatter')
      ScatterJS.connect('VirusBusters', { network }).then(connected => {
        if (!connected) {
          return console.error('no scatter')
        } else {
          ScatterJS.login().then(id => {
            if (!id) {
              this.accountType = null
              return console.error('no identity')
            } else {
              const account = ScatterJS.account('eos')
              const userAccount = account.name
              this.profile = userAccount
              this.userConnected = true
              // console.log('account', account)
              // this.accountType = 'scatter'
              this.setAccountType('scatter')
              const temp = {
                type: 'anchor',
                account: userAccount
              }
              this.setLastUser(temp)
            }
          })
        }
      })
    },
    async anchorLogin () {
      try {
        console.log('Login with ANCHOR')
        // Perform the login, which returns the users identity
        const identity = await link.login('virusbusters')
        // Save the session within your application for future use
        const { session } = identity
        console.log(`Logged in as ${session.auth.actor}`)
        const userAccount = session.auth.actor.toString()
        this.loggedIn(userAccount)
        // this.accountType = 'anchor'
        const temp = {
          type: 'anchor',
          account: userAccount
        }
        this.setLastUser(temp)
      } catch (e) {
        console.log(e)
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
    },
    setLastUser (type) {
      // console.log('type', type)
      this.$cookies.set('lastUser', JSON.stringify(type), 604800)
    },
    logout () {
      // Cookie à faire
      // setCookie('wax-address', '');
      // this.accountType = null
      // console.log('logout')
      this.userConnected = false
      this.profile = null
      this.busterTemplates = null
      this.wax = null
      this.$cookies.remove('lastUser')
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
              // console.log('On a un game', template)
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
