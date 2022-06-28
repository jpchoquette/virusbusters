// import * as Waxjs from '@waxio/waxjs/dist'
// import { sortBy } from 'lodash'

export default {
  data () {
    return {
      wallets: null,
      walletsSoftware: null,
      rigOwners: [],
      softwareOwners: [],
      virusTypes: null,
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
  computed: {
    userTools: {
      set (val) { this.$store.commit('Work/setUserTools', val) },
      get () { return this.$store.state.Work.userTools }
    }
  },
  methods: {
    async fetchUserTools () {
      // this.resetData()
      this.loading = true
      try {
        Promise.all([
          fetch('https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=virusbusters&schema_name=work.tool&template_data.type=Rig&owner=' + this.$store.state.User.userProfile + '&burned=false&page=1&limit=100&order=desc&sort=asset_id', this.$store.state.App.globalHeader),
          fetch('https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=virusbusters&schema_name=work.tool&template_data.type=Software&owner=' + this.$store.state.User.userProfile + '&burned=false&page=1&order=desc&sort=asset_id', this.$store.state.App.globalHeader)
        ]).then(async ([rig, soft]) => {
          const a = await rig.json()
          const b = await soft.json()
          // return a.data.concat(b.data)
          const userNfts = {
            rigs: a.data,
            softwares: b.data
          }
          return userNfts
        })
          .then((response) => {
            console.log('response', response)
            this.userTools = response
            this.loading = false
          }).catch((err) => {
            console.log(err)
          })
      } catch (e) {
        console.log('error', e)
      }
    },
    async fetchVirusTypes () {
      // this.resetData()
      this.loading = true
      try {
        Promise.all([
          fetch('https://wax.api.atomicassets.io/atomicassets/v1/templates?collection_name=virusbusters&schema_name=work.file&template_data.type=Virus&page=1&limit=100&order=desc&sort=created', this.$store.state.App.globalHeader)
        ]).then(async ([virus]) => {
          const a = await virus.json()
          // const b = await soft.json()
          // return a.data.concat(b.data)
          const viruses = a.data
          return viruses
        })
          .then((response) => {
            console.log('response', response)
            this.virusTypes = response
            this.loading = false
          }).catch((err) => {
            console.log(err)
          })
      } catch (e) {
        console.log('error', e)
      }
    }
  }
}
