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
  },
  globalHeader: {
    headers: {
      accept: '*/*',
      'accept-language': 'en-US,en;q=0.9',
      'cache-control': 'no-cache',
      'content-type': 'application/json',
      pragma: 'no-cache',
      'sec-fetch-dest': 'empty',
      'sec-fetch-mode': 'cors',
      'sec-fetch-site': 'cross-site',
      'sec-gpc': '1'
    },
    referrer: 'https://wax.atomichub.io/',
    referrerPolicy: 'strict-origin-when-cross-origin',
    body: null,
    method: 'GET',
    mode: 'cors',
    credentials: 'omit'
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
