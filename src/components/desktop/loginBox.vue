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
  .login-box()
    //- LOGIN WAX
    template(v-if='$store.state.User.userConnected')
      div.tc.relative.mb3.b() Welcome, {{profile ? profile : "broken login :("}}
      v-btn(@click='logout') Close session
    template(v-else)
      div.modal-title Welcome!
      div.tc.relative.mb3() Please login to continue...
      v-btn(v-if='$store.state.User.userConnected', @click='logout') Logout
      v-btn(v-else, @click='login') Login
</template>
<style lang='sass'>
  .login-box
    z-index: 100
    position: absolute
    top: calc(50% - 150px)
    left: calc(50% - 250px)
    width: 500px
    height: 300px
    background-color: var(--v-light-base)
    padding: 20px
    border-radius: 4px
    display: flex
    flex-direction: column
    align-items: center
    justify-content: center
    box-shadow: $box-shadow-large
    .modal-title
      font-size: 30px
      font-family: $display-font
      margin-bottom: 20px
</style>
