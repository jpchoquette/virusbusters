export default {
  data () {
    return {
      dark: false,
      defaultColors: {
        primary: '#fcccac',
        tertiary: '#ffa300',
        secondary: '#7e2753',
        light: '#FFF1E8',
        accent: '#ff004d',
        bluescreen: '#0000AA',
        toolbars: '#29adff',
        grey: '#c2c3c7'
      }
    }
  },
  methods: {
    setTheme (options, type) {
      // console.log('set theme - todo', options, this.$vuetify.theme.themes)
      // this.$vuetify.theme.themes.light.primary = options.colors.primary
      this.$vuetify.theme.themes.light.secondary = options.colors.secondary
      this.$vuetify.theme.themes.light.tertiary = options.colors.tertiary
      this.$vuetify.theme.themes.light.light = options.colors.light
      this.$vuetify.theme.themes.light.accent = options.colors.accent
      this.$vuetify.theme.themes.light.toolbars = options.colors.toolbars
      // dark
      this.$vuetify.theme.themes.dark.secondary = options.colors.secondary
      this.$vuetify.theme.themes.dark.tertiary = options.colors.tertiary
      this.$vuetify.theme.themes.dark.light = options.colors.light
      this.$vuetify.theme.themes.dark.accent = options.colors.accent
      this.$vuetify.theme.themes.dark.toolbars = options.colors.toolbars

      this.$vuetify.theme.dark = options.darkMode
      // console.log('dark theme?', options, this.$vuetify.theme.dark)
    },
    clearTheme () {
      // console.log('clear theme - todo')
      // this.$vuetify.theme.themes.light.primary = this.defaultColors.primary
      this.$vuetify.theme.themes.light.secondary = this.defaultColors.secondary
      this.$vuetify.theme.themes.light.tertiary = this.defaultColors.tertiary
      this.$vuetify.theme.themes.light.light = this.defaultColors.light
      this.$vuetify.theme.themes.light.accent = this.defaultColors.accent
      this.$vuetify.theme.themes.light.toolbars = this.defaultColors.toolbars

      // dark
      this.$vuetify.theme.themes.dark.secondary = this.defaultColors.secondary
      this.$vuetify.theme.themes.dark.tertiary = this.defaultColors.tertiary
      this.$vuetify.theme.themes.dark.light = this.defaultColors.light
      this.$vuetify.theme.themes.dark.accent = this.defaultColors.accent
      this.$vuetify.theme.themes.dark.toolbars = this.defaultColors.toolbars
      this.$vuetify.theme.dark = false
    }
  }
}
