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
    getUrl (wallet, origin) {
      let url = null
      if (origin === 'detective') {
        url = 'https://waxdetective.io/network/transfers?accounts=' + wallet + '&excludedAccounts=&excludedCategories=system'
      } else {
        url = 'https://wax.atomichub.io/profile/' + wallet
      }
      if (url) {
        window.open(url, '_blank')
      }
    }
  }
}
</script>

<template lang='pug'>
.admin__wrapper.light.secondary--text
  //- v-btn.tc(@click='leavePage()') Virus Busters Website
  //- div
  //- v-img(:src="require('@/assets/images/vb-animated-logo-light.gif')", width='200px')

  h1.tc WAX Whitelist manager
  div.bot-buster-wrap
    //- v-alert(color='white', icon='mdi-help', border='left', dense)
      div If your list comes from Sheets/Excel, use this formula to get a comma separated list
      div
        code.mv2 =TEXTJOIN(",", TRUE, $E2:$E)
      div.i.f7 (Replace $E2:$E by your column range)
    div.flex

      div.pa2
      div.input-field

        div.field-banner.secondary.white--text 1. Base Whitelist
        .section-subheader
          div What type of list are you pasting?
          v-radio-group(v-model='filteringInput', row, hide-details, dense, style='margin-top:5px')
            v-radio(label='Comma Separated', value='comma', color='red')
            v-radio(label='Line/space separated', value='linebreak', color='red')
        textarea.w-100(v-model='whitelist', type='text', style='background-color:#f3f3f3')
      div.pa2
      div.input-field
        div.field-banner.red.white--text 2. Blacklist
        .section-subheader
          div What type of list are you pasting?

          v-radio-group(v-model='filteringInputBlacklist', row, hide-details, dense, style='margin-top:5px')
            v-radio(label='Comma Separated', value='comma', color='red')
            v-radio(label='Line/space separated', value='linebreak', color='red')
        textarea.w-100(v-model='blacklist', type='text', style='background-color:#ffdbdb')
    v-btn.mv3(@click='compareLists', :disabled='!whitelist', rounded, x-large, color='black', block, :dark='!!whitelist')
      span.f4 Generate new list
    v-divider.mv4
    template(v-if='filteredWhitelist')
      v-alert(color='green', icon='mdi-help', border='left', dense, border-color)
        div Hooray! List generated!
        code.mv2 {{filteredWhitelist.length}} wallets whitelisted
      div.result-section-wrapper(style='min-height: 400px;')
        .result-section
          .section-header.secondary.white--text
            div.b.mb2.f3 Inspector
            div.f6.i To check individual wallets
          div.inspector-wrapper
            div.w-100(v-for='(account, index) in filteredWhitelist', style='background-color:#f3f3f3')
              div.inspector-element
                div {{account}}
                div.flex-grow-1
                v-btn.mr1(@click='getUrl(account, "detective")', x-small, outlined) Wax Detective
                v-btn.mr1(@click='getUrl(account, "atomic")', x-small, outlined) Inventory
                v-btn(@click='removeFromList(index)', color='red', fab, dark, depressed, small)
                  v-icon mdi-trash-can-outline
        .result-section

          .section-header.green.white--text
            div.b.mb2.f3 Filtered whitelist
            div.f6.i To import in Sheets and others
          .section-subheader
            div What type of list do you want to copy?
            v-radio-group(v-model='filteringOutput', row, hide-details, dense, style='margin-top:5px')
              v-radio(label='Comma Separated', value='comma', color='red', hide-details)
              v-radio(label='Line separated', value='linebreak', color='red', hide-details)
              v-radio(label='Nefty Ready', value='nefty', color='red', hide-details)
          textarea.w-100.h-100(type='text', id='outputWhitelist', :value='outputWhitelist', readonly, style='background-color:#dfffd6')
          v-btn(@click='copyContent("outputWhitelist")', block, rounded, :disabled='!filteredWhitelist', outlined) Copy List
        //- .result-section
          .section-header
            div.b.mb2.f3 Filtered whitelist <br>(neftyblocks ready)
            div.f6.i.mb2 To add directly to Neftyblocks

          textarea.w-100.h-100(type='text', id='neftyWhitelist', :value='neftyWhitelist', readonly, style='background-color:#f3f3f3')
          v-btn(@click='copyContent("neftyWhitelist")', block, rounded, :disabled='!neftyWhitelist', outlined) Copy List
  v-footer(app, color='black', dark)
    div.flex-grow-1
    span.f7.i Made with love by Bakerboy - Contact me on
      a.mh1(href='https://discord.gg/vKWRKtsDCX', target='_blank') discord
      span for help!
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
      .input-field
        width: 100%
        .field-banner
          padding: 10px
          font-size: 20px
          border-radius: $border-radius-root $border-radius-root 0 0
      textarea
        background-color: white
        padding: 10px
        margin-bottom: 5px
        min-height: 200px
      .result-section-wrapper
        display: flex
        flex-wrap: wrap
      .section-subheader
        padding: 10px
        background-color: rgba(0,0,0,0.25)

      .result-section
        // width: 100%
        flex-grow: 1
        height: 100%
        padding: 10px
        // background-color: white
        .section-header
          padding: 10px
          font-size: 20px
          border-radius: $border-radius-root $border-radius-root 0 0
          background-color: lightgrey

        .inspector-wrapper
          .inspector-element
            padding: 10px
            border-bottom: solid 1px grey
            display: flex
            align-items: center
            &:hover
              background-color: #fefefe
</style>
