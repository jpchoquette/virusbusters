import Vue from 'vue'
import Vuex from 'vuex'
import User from './modules/user'
import App from './modules/app'
Vue.use(Vuex)

export default new Vuex.Store({
  modules: {
    User,
    App
  }
})
