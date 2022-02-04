// import VueCookies from 'vue-cookies'
const state = {
  currentScore: null
}

const getters = {}

const actions = {
}

const mutations = {
  setCurrentScore (state, payload) {
    state.currentScore = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
