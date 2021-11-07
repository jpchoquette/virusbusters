import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/user'
import App from './modules/app'
import Buster from './modules/buster'
import Desktop from './modules/desktop'
import Customizations from './modules/customizations'

Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    User,
    App,
    Buster,
    Desktop,
    Customizations
  }
})
