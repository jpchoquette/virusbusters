const state = {
  windowSize: {
    width: 0,
    height: 0
  },
  mobileTemplate: false
}

const getters = {}

const actions = {}

const mutations = {
  setWindowSize (state, payload) {
    state.windowSize = payload
  },
  setMobileTemplate (state, payload) {
    state.mobileTemplate = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
