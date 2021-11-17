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
    },
    activeTheme: {
      set (val) { this.$store.commit('Customizations/setActiveTheme', val) },
      get () { return this.$store.state.Customizations.activeTheme }
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
      if (globalPreferences[userIndex] && globalPreferences[userIndex].preferences) {
        if (globalPreferences[userIndex].preferences.wallpaper) {
          this.activeWallpaper = globalPreferences[userIndex].preferences.wallpaper
        } else {
          this.activeWallpaper = null
        }
        if (globalPreferences[userIndex].preferences.cursor) {
          this.activeCursor = globalPreferences[userIndex].preferences.cursor
        } else {
          this.activeCursor = null
        }
        if (globalPreferences[userIndex].preferences.theme) {
          this.activeTheme = globalPreferences[userIndex].preferences.theme
        } else {
          this.activeTheme = null
        }
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
        currentUser.preferences.cursor = data
        globalPreferences.splice(userIndex, 1, currentUser)
        this.activeCursor = data
        // console.log('activeCursor', this.activeCursor)
        localStorage.setItem('users', JSON.stringify(globalPreferences))
      } else if (preference === 'theme') {
        currentUser.preferences.theme = data
        globalPreferences.splice(userIndex, 1, currentUser)
        this.activeTheme = data
        // console.log('activeTheme', this.activeTheme)
        localStorage.setItem('users', JSON.stringify(globalPreferences))
      } else {
        console.log('to do - preference does not exist', preference)
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
      this.activeCursor = null
      this.activeTheme = null
    }
  }
}
