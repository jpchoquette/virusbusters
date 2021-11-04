<script>

export default {
  name: 'DateWidget',
  components: {
  },
  data () {
    return {
    }
  },
  created () {
    // console.log('COMPONENT CREATED')
    setTimeout(() => {
      this.startClock()
    }, 1000)
  },
  computed: {
    activeWindow: {
      set (val) { this.$store.commit('Desktop/setActiveWindow', val) },
      get () { return this.$store.state.Desktop.activeWindow }
    },
    settingsWindow: {
      set (val) { this.$store.commit('Desktop/setSettingsWindow', val) },
      get () { return this.$store.state.Desktop.settingsWindow }
    }
  },
  methods: {
    startClock () {
      const options = { year: 'numeric', month: 'short', day: 'numeric' }
      const today = new Date()
      const date = today.toLocaleDateString('en-US', options)
      const h = today.getHours()
      let m = today.getMinutes()
      // let s = today.getSeconds()
      m = this.checkTime(m)
      // s = this.checkTime(s)
      // document.getElementById('userClock').innerHTML = h + ':' + m + ':' + s
      document.getElementById('userClock').innerHTML = h + ':' + m
      document.getElementById('userDate').innerHTML = date
      setTimeout(this.startClock, 1000)
    },
    checkTime (i) {
      if (i < 10) { i = '0' + i }
      return i
    }
  }
}
</script>
<template lang='pug'>
  div.date-wrapper()
    div.white--text.b(id='userClock')
    div.white--text.f7(id='userDate')
</template>
<style lang='sass'>
</style>
