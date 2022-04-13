<script>
// import FeedbackNotification from '../components/shared/feedbackNotification'
import BotBuster from '@/mixins/botBuster.js'

export default {
  name: 'Whitelist',
  components: {
    // FeedbackNotification,
  },
  mixins: [BotBuster],
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
      const copyText = document.getElementById(id)
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
  h1.tc Bot buster tool
  div.bot-buster-wrap
    v-alert(color='secondary', dark='', icon='mdi-help', border='left', dense)
      div If your list comes from Sheets/Excel, use this formula to get a comma separated list
      code.mv2 =TEXTJOIN(",", TRUE, $E2:$E)
      div.i.f7 (Replace $E2:$E by your column)
    div.flex

      div.w-100
        div.b.mb2.f3.green--text 1. Base Whitelist (comma separated)
        textarea.w-100(v-model='whitelist', type='text', style='background-color:#dfffd6')
      div.pa2
      div.w-100
        div.b.mb2.f3.red--text 2. Blacklist (comma separated)
        textarea.w-100(v-model='blacklist', type='text', style='background-color:#ffdbdb')
    v-btn.mv3(@click='compareLists', :disabled='!whitelist', rounded, large, color='red', block, :dark='!!whitelist')
      span.f4 Parse list
    div.flex(style='min-height: 400px;', v-if='filteredWhitelist')

      div.w-100.h-100
        div.b.mb2.f3 Filtered whitelist (comma separated)
        textarea.w-100.h-100(type='text', id='filteredWhitelist', :value='filteredWhitelist', readonly)
        v-btn(@click='copyContent("filteredWhitelist")', block, rounded, :disabled='!filteredWhitelist', outlined) Copy List
      div.pa2
      div.w-100.h-100
        div.b.mb2.f3 Filtered whitelist (neftyblocks ready)
        textarea.w-100.h-100(type='text', id='neftyWhitelist', :value='neftyWhitelist', readonly)
        v-btn(@click='copyContent("neftyWhitelist")', block, rounded, :disabled='!neftyWhitelist', outlined) Copy List
</template>

<style lang='sass'>
  // @import '@/assets/styles/desktop/_windows.sass'
  .admin__wrapper
    height: 100%
    padding: 20px
    h2
      font-family: $pixel-font
    h1
      font-family: $display-font
    .bot-buster-wrap
      padding: 20px
      textarea
        background-color: white
        padding: 10px
        margin-bottom: 5px
        min-height: 300px
</style>
