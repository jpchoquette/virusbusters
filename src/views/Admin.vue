<script>
// import FeedbackNotification from '../components/shared/feedbackNotification'
import AirdropFinder from '@/mixins/airdropFinder.js'

export default {
  name: 'Admin',
  components: {
    // FeedbackNotification,
  },
  mixins: [AirdropFinder],
  data () {
    return {
      // showLogin: true,
    }
  },
  computed: {
    mobileTemplate: {
      get () { return this.$store.state.App.mobileTemplate },
      set (val) { this.$store.commit('App/setMobileTemplate', val) }
    },
    totalNfts () {
      let count = 0
      if (this.wallets && this.wallets.length) {
        this.wallets.forEach(wall => {
          count = count + wall.qty
        })
      }
      return count
    }
  },
  watch: {
  },
  mounted () {
  },
  methods: {
    leavePage () {
      // this.logout()
      window.location.href = '/'
    },
    copyContent (id) {
      console.log('id', id)
      /* Get the text field */
      const copyText = document.getElementById('pool-wallets-' + id)
      console.log('copytext', copyText)
      /* Select the text field */
      copyText.select()
      copyText.setSelectionRange(0, 99999) /* For mobile devices */
      /* Copy the text inside the text field */
      navigator.clipboard.writeText(copyText.value)
      /* Alert the copied text */
      alert('Copied the text: ' + copyText.value)
    },
    getUrl (wallet) {
      return 'https://wax.atomichub.io/profile/' + wallet + '?collection_name=virusbusters&order=desc&sort=transferred#inventory'
    }
  }
}
</script>

<template lang='pug'>
.admin__wrapper.light
  v-btn(@click='leavePage()') Go back to website
  h1 Admin page
  h2 Rigs wallets finder tool
  div.b.red--text(v-if='loading') LOADING
  //- v-btn(@click='loadUsers()') Retrieve rig owners
  div.response__wrapper
    div.wallets__wrapper
      v-btn.mb3(@click='fetchWallets()', large, block, rounded, :disabled='loading') Retrieve rig owners wallets
      div.pa2.secondary.white--text
        h2 WALLETS OWNING RIGS
      div(v-if='wallets')
        div.pa2.secondary.darken-2.mb3.white--text
          div.b.i Unique wallets: {{wallets.length}}
          div.b.i Total rigs :{{totalNfts}}
        ul
          li.mb1.code(v-for='(wallet, index) in wallets')
            a.secondary--text.no-underline(:href='getUrl(wallet.wallet)', target='_blank') {{wallet.wallet}}
              span.b (x{{wallet.qty}})
            //- ol
              li(v-for='(asset, ind) in wallet.assets')
                div {{asset.template.template_id}}
    div.pools__wrapper
      v-btn.mb3(@click='sortWallets()', :disabled='!wallets || loading', large, block, rounded, color='accent') Create software pools (WAIT FOR WALLETS TO LOAD!)
      div.pa2.secondary.white--text
        h2 FOLDERS DISTRIBUTION
      div.pa2.secondary.darken-2.mb3.white--text
        div.b.i Valid wallets: TODO
        div.b.i
          a.white--text(href='https://wax.drop.bountyblok.io/drop', target='_blank') Boutyblok website

      template(v-for='(pool, indd) in templatesPools')
        div.pool.w-100(:style='{borderColor: pool.color}')
          div.b() Template id: {{pool.templateId}}
          div.b.red--text.mb3 Priority: {{pool.priority}}
          hr
          div.b Wallets ({{pool.validWallets.length}})
          textarea.w-100(type='text', :id='"pool-wallets-" + indd', :value='pool.validWallets', readonly)
          v-btn(@click='copyContent(indd)', block, rounded, :disabled='pool.validWallets.length <= 0', outlined) Copy wallets
          //- pre {{pool.validWallets}}
</template>

<style lang='sass'>
  // @import '@/assets/styles/desktop/_windows.sass'
  .admin__wrapper
    height: 100%
    padding: 20px
    h1
      margin-top: 0
    .response__wrapper
      display: flex
      flex-wrap: wrap
      .wallets__wrapper
        padding: 20px
        min-width: 300px
        width: 30%
        flex-grow: 1
      .pools__wrapper
        padding: 20px
        // width: calc(100% - 300px)
        flex-grow: 1
        .pool
          border: solid 4px black
          margin: 10px 0
          padding: 10px
          border-radius: 10px
          background-color: white
          textarea
            background-color: lightgrey
            padding: 10px
            margin-bottom: 5px
</style>
