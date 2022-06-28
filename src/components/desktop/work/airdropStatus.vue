<script>
// import WindowsPaths from '@/mixins/windowsPaths.js'

export default {
  name: 'AirdropStatus',
  components: {
  },
  props: {
    // activeWindow: { required: true, type: Object },
    // windowId: { required: true, type: String }
  },
  data () {
    return {
      currentStatus: {
        type: 'error',
        color: 'red',
        icon: 'mdi-alert',
        description: 'You are missing components to receive weekly airdrops. Go check in Computer Status for more infos'
      },
      userToolNfts: []
    }
  },
  watch: {
    '$store.state.Work.userTools': {
      deep: true,
      immediate: true,
      handler (newVal) {
        console.log('on watch', newVal)
        if (newVal && (newVal.rigs && newVal.rigs.length) && (newVal.softwares && newVal.softwares.length)) {
          this.currentStatus = {
            type: 'success',
            color: 'green',
            icon: 'mdi-check',
            description: "You're all set to receive airdrops! Check out the Computer Status tab for more details."
          }
        } else {
          this.currentStatus = {
            type: 'error',
            color: 'red',
            icon: 'mdi-alert',
            description: 'You are missing components to receive weekly airdrops. Go check in Computer Status for more infos'
          }
        }
      }
    }
  },
  mounted () {
  },
  computed: {
  },
  methods: {
  }
}
</script>
<template lang='pug'>
  .airdrop-status__banner
    v-alert(:color='currentStatus.color', dark='', :icon='currentStatus.icon', border='left', dense)
      | {{currentStatus.description}}
      //- pre {{$store.state.Work.userTools}}
</template>
<style lang='sass' scoped>
</style>
