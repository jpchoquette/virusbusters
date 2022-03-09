import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/user'
import App from './modules/app'
import Buster from './modules/buster'
import Desktop from './modules/desktop'
import Games from './modules/games'
import Customizations from './modules/customizations'
import WindowsRoutes from './modules/windowsRoutes'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    User,
    App,
    Buster,
    Desktop,
    Customizations,
    Games,
    WindowsRoutes
  }
})
