<script>
export default {
  name: 'WindowBar',
  components: {
  },
  props: {
    title: { required: true, type: String, default: 'Unknown window' }
  },
  data () {
    return {
    }
  },
  mixins: [],
  mounted () {
  },
  computed: {
  },
  methods: {
    closeWindow () {
      this.$emit('closeWindow')
    }
  }
}
</script>
<template lang='pug'>
  div.window-top-bar#window-top-bar(:class='{"active-gradient" : ($store.state.Customizations.activeTheme && $store.state.Customizations.activeTheme.data.gradients)}')
    div.window-title(:class='{"dark-style" : ($store.state.Customizations.activeTheme && $store.state.Customizations.activeTheme.data.darkBar)}') {{title}}
    div.flex-grow-1
    v-btn.close-button.secondary--text(@click='closeWindow', tile, color='accent', fab, depressed) X
</template>
<style lang='sass'>
</style>
