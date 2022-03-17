<script>
// import WindowsPaths from '@/mixins/windowsPaths.js'

export default {
  name: 'ContentHints',
  components: {
  },
  props: {
    // activeWindow: { required: true, type: Object }
  },
  data () {
    return {
      currentStatus: {
        type: 'info',
        color: 'light darken-3',
        icon: 'mdi-help',
        description: 'This block will explain to you what you can do here. To learn more, refer to our guide over here.'
      }
    }
  },
  // mixins: [WindowsPaths],
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
</template>
<style lang='sass' scoped>
</style>
