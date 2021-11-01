import Vue from 'vue'
import Vuetify from 'vuetify/lib'

// import colors from 'vuetify/lib/util/colors'

Vue.use(Vuetify)

export default new Vuetify({
  theme: {
    options: {
      customProperties: true
    },
    themes: {
      light: {
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
  }
})
