export default {
  data () {
    return {
    }
  },
  computed: {
    // profile: {
    //   set (val) { this.$store.commit('User/setUserProfile', val) },
    //   get () { return this.$store.state.User.userProfile }
    // },
    userConnected: {
      set (val) { this.$store.commit('User/setUserConnected', val) },
      get () { return this.$store.state.User.userConnected }
    },
    activeWallpaper: {
      set (val) { this.$store.commit('Customizations/setActiveWallpaper', val) },
      get () { return this.$store.state.Customizations.activeWallpaper }
    },
    activeCursor: {
      set (val) { this.$store.commit('Customizations/setActiveCursor', val) },
      get () { return this.$store.state.Customizations.activeCursor }
    }
  },
  mounted () {
  },
  watch: {
  },
  methods: {
    validatePreferences () {
      const globalPreferences = JSON.parse(localStorage.getItem('users'))
      const userIndex = globalPreferences.findIndex(user => user.profile === this.$store.state.User.userProfile)
      if (globalPreferences[userIndex] && globalPreferences[userIndex].preferences && globalPreferences[userIndex].preferences.wallpaper) {
        this.activeWallpaper = globalPreferences[userIndex].preferences.wallpaper
      } else {
        this.activeWallpaper = null
      }
    },
    updatePreferences (preference, data) {
      const globalPreferences = JSON.parse(localStorage.getItem('users'))
      const userIndex = globalPreferences.findIndex(user => user.profile === this.$store.state.User.userProfile)
      const currentUser = globalPreferences[userIndex]
      if (preference === 'wallpaper') {
        currentUser.preferences.wallpaper = data
        globalPreferences.splice(userIndex, 1, currentUser)
        this.activeWallpaper = data
        localStorage.setItem('users', JSON.stringify(globalPreferences))
      } else if (preference === 'cursor') {
        console.log('on update le cursor')
        currentUser.preferences.cursor = data
        globalPreferences.splice(userIndex, 1, currentUser)
        this.activeCursor = data
        console.log('activeCursor', this.activeCursor)
        // localStorage.setItem('users', JSON.stringify(globalPreferences))
      } else {
        console.log('to do')
      }
    },
    resetUserPreferences () {
      const globalPreferences = JSON.parse(localStorage.getItem('users'))
      const userIndex = globalPreferences.findIndex(user => user.profile === this.$store.state.User.userProfile)
      const currentUser = globalPreferences[userIndex]
      const resetPreferences = {
        cursor: null,
        wallpaper: null,
        theme: null
      }
      currentUser.preferences = resetPreferences
      globalPreferences.splice(userIndex, 1, currentUser)
      localStorage.setItem('users', JSON.stringify(globalPreferences))
      this.activeWallpaper = null
    }
  }
}
