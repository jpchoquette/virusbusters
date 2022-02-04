<script>
export default {
  name: 'feedbackNotification',
  props: {
    desktopStyle: { required: false, type: Boolean, default: true }
  },
  computed: {
    snackBarState: {
      get () { return this.$store.state.App.showSnackbarGlobal },
      set (val) { this.$store.commit('App/setShowSnackbarGlobal', val) }
    },
    snackBarStateContent: {
      get () { return this.$store.state.App.snackbarGlobalContent },
      set (val) { this.$store.commit('App/setSnackbarGlobalContent', val) }
    }
  },
  watch: {
  }
}
</script>

<template lang="pug">
  .feedback-snackbar(:class='{"desktop-style" : desktopStyle}')
    v-snackbar(:color='snackBarStateContent.color', bottom, right, v-model='snackBarState', :timeout='5000', absolute, outlined, text, light, max-width='300')
      div.flex.items-center.secondary--text(v-if='snackBarStateContent')
        div.mr2(v-if='snackBarStateContent.icon') {{snackBarStateContent.icon}}
        div
          div.b
            div.f7.i(v-if='snackBarStateContent.type === "success"') Success
            div.f7.i(v-else-if='snackBarStateContent.type === "error"') Error
            div.f7.i(v-else-if='snackBarStateContent.type === "highscore"') New highscore!
          div.f6(v-if='snackBarStateContent.description') {{snackBarStateContent.description}}
      template(v-slot:action='{ attrs }')
        v-btn(icon, small, v-bind='attrs', @click='snackBarState = false')
          v-icon mdi-close-circle
</template>

<style lang='sass'>
  .feedback-snackbar
    .v-snack
      z-index: 1000
      bottom: 45px
</style>
