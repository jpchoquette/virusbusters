const state = {
  windowSize: {
    width: 0,
    height: 0
  },
  mobileTemplate: false,
  showSnackbarGlobal: false,
  snackbarGlobalContent: {
    title: 'Default notification',
    description: 'A description',
    color: '#23a300',
    icon: '✔️',
    timeout: 4000,
    type: 'success'
  }
}

const getters = {}

const actions = {}

const mutations = {
  setWindowSize (state, payload) {
    state.windowSize = payload
  },
  setMobileTemplate (state, payload) {
    state.mobileTemplate = payload
  },
  setShowSnackbarGlobal (state, payload) {
    state.showSnackbarGlobal = payload
  },
  setSnackbarGlobalContent (state, payload) {
    state.snackbarGlobalContent = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
