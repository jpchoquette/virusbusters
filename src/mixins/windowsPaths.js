export default {
  data () {
    return {
    }
  },
  computed: {
    windowsRoutes: {
      set (val) { this.$store.commit('WindowsRoutes/setWindowsRoutes', val) },
      get () { return this.$store.state.WindowsRoutes.windowsRoutes }
    }
  },
  mounted () {
  },
  methods: {
    updateRoute (windowId, data) {
      const currentWindowIndex = this.windowsRoutes.findIndex(route => route.value === windowId)
      const currentPath = this.windowsRoutes[currentWindowIndex].activePath
      // console.log('currentPath', currentPath[currentPath.length - 1], data.level)
      if (currentPath && currentPath[currentPath.length - 1].level < data.level) {
        this.windowsRoutes[currentWindowIndex].activePath.push(data)
        // console.log('on upodate')
      } else {
        // console.log('deja au niveau ou plus haut')
      }
    },
    stepBack (windowId, level, currentLevel) {
      const currentWindowIndex = this.windowsRoutes.findIndex(route => route.value === windowId)
      if (currentWindowIndex >= 0 && currentLevel > 0) {
        const currentPath = this.windowsRoutes[currentWindowIndex].activePath
        // if (level)
        if (level >= 0 && currentLevel) {
          const levelDiff = (currentLevel + 1) - (level + 1)
          if (levelDiff === 1) {
            currentPath.pop()
            if (currentPath[currentPath.length - 1].level === 0) {
              // this.detailedView = false
            } else {
              // this.activeRoute = currentPath[currentPath.length - 1].routeName
            }
          } else {
            // console.log('currentPathBefore', currentPath)
            currentPath.splice(level + 1)
            // console.log('plus grand difference, a faire', levelDiff)
            // console.log('currentPath', currentPath)
          }
        } else {
          currentPath.pop()
          if (currentPath[currentPath.length - 1].level === 0) {
            this.detailedView = false
          } else {
            this.activeRoute = currentPath[currentPath.length - 1].routeName
          }
        }
      }
    }
  }
}
