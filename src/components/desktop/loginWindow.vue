<script>
import WaxLogin from '@/mixins/waxLogin.js'

export default {
  name: 'LoginBox',
  data () {
    return {
    }
  },
  mixins: [WaxLogin],
  mounted () {
  },
  methods: {

  }
}
</script>
<template lang='pug'>
  .login-window()
    .temp-windows__wrapper
    //- LOGIN WAX
    //- template(v-if='$store.state.User.userConnected')
    //-   div.tc.relative.mb3.b() Welcome, {{profile ? profile : "broken login :("}}
    //-   v-btn(@click='logout') Close session
    //- template(v-else)
    img.bg-wallpaper(src='@/assets/images/test-bg-clouds.png')

    .login-box()
      img.mb3(src="@/assets/images/virtual-desktop-logo-black.png", width='300px', alt='Virtual Desktop Logo')
      //- div.modal-title Virtual Desktop
        div.modal-title-extra TRIAL
      div.tc.relative.mb3() Please login to continue...
      v-btn(v-if='$store.state.User.userConnected', @click='logout') Logout
      div(v-else, style='display: flex; flex-direction: column;')
        div.login-btn__wrapper
          v-btn.login-btn(@click='WCWlogin', large, color='black', dark)
            img(alt='Wax Logo', src="@/assets/images/wax-logo-white.png", width='50px')
            div.divider
            span Wax Cloud Wallet
          v-tooltip(bottom)
            template(v-slot:activator='{ on, attrs }')
              v-btn.ml2(small, fab, depressed, color='light darken-1', href='https://all-access.wax.io/', target='_blank', v-bind='attrs', v-on='on')
                span.f4 ?
            span Learn more
        div.login-btn__wrapper
          v-btn.login-btn(@click='anchorLogin', large, color='#3650a2', dark)
            img(alt='Anchor Logo', src="@/assets/images/anchor-logo.svg", width='30px')
            div.divider
            span Anchor Wallet
          v-tooltip(bottom)
            template(v-slot:activator='{ on, attrs }')
              v-btn.ml2(small, fab, depressed, color='light darken-1', href='https://greymass.com/en/anchor/', target='_blank', v-bind='attrs', v-on='on')
                span.f4 ?
            span Learn more
        div.login-btn__wrapper
          v-btn.login-btn(@click='scatterLogin', large, color='#5f4e81', dark)
            img(alt='Wombat Logo', src="@/assets/images/wombat-logo.png", width='30px')
            div.divider
            span Wombat Wallet
          v-tooltip(bottom)
            template(v-slot:activator='{ on, attrs }')
              v-btn.ml2(small, fab, depressed, color='light darken-1', href='https://getwombat.io/', target='_blank', v-bind='attrs', v-on='on')
                span.f4 ?
            span Learn more
            //- v-tooltip(bottom)
              template(v-slot:activator='{ on, attrs }')
                v-btn(fab, depressed, color='secondary', v-bind='attrs', v-on='on')
                  span 🚩
              span To toggle a flag on a tile, simply hold the left mouse button.
      div.accent--text.f6.i.tc.mt4 Trial expired #[span.b 10585] days ago. Please buy the full version.
      div.f7.mt1 v3.13.b (1996)
</template>
<style lang='sass'>
.login-window
  width: 100%
  height: 100%
  position: relative
  background-color: var(--v-accent-base)
  .bg-wallpaper
    position: absolute
    top: 0
    left: 0
    width: 100%
    height: 100%
  .login-box
    z-index: 100
    position: absolute
    top: calc(50% - 200px)
    left: calc(50% - 250px)
    width: 500px
    min-height: 400px
    background-color: var(--v-light-base)
    padding: 30px 20px
    border-radius: 4px
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    box-shadow: $box-shadow-large
    .modal-title
      font-size: 40px
      font-family: $pixel-font
      margin-bottom: 20px
      position: relative
      .modal-title-extra
        position: absolute
        top: 5px
        right: -20px
        font-size: 20px
        font-weight: bold
        color: var(--v-accent-base)
        transform: rotate(10deg)
    .login-btn__wrapper
      display: flex
      align-items: center
      margin-top: 14px
      .login-btn
        flex-grow: 1
        .divider
          height: 20px
          width: 1px
          margin: 5px 10px
          background-color: white
  @media all and (max-width: $medium)
    .login-box
      width: 90%
      left: calc(50% - 45%)

</style>
