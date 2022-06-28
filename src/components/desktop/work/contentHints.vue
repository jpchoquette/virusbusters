<script>
// import WindowsPaths from '@/mixins/windowsPaths.js'

export default {
  name: 'ContentHints',
  components: {
  },
  props: {
    activeWindow: { required: true, type: String }
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
  // Faire un watch sur le activewindow pour aficher le bon contenu d'aide.
  mounted () {
  },
  computed: {
  },
  watch: {
    activeWindow: {
      immediate: true,
      handler (newVal) {
        console.log('on watch', newVal)
        if (newVal === 'computer') {
          console.log('bababa')
          this.currentStatus = {
            type: 'info',
            color: 'light darken-3',
            icon: 'mdi-help',
            description: "Here's an overview of your devices and their status!"
          }
        }
      }
    }
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
