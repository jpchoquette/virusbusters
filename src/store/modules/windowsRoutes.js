const state = {
  windowsRoutes: [
    {
      name: 'Work Station',
      value: 'rigHubWindow',
      activePath: [
        {
          title: 'My work station',
          routeName: 'default',
          level: 0
        }
      ]
    },
    {
      name: 'Buster Friends',
      value: 'contactsWindow',
      activePath: [
        {
          title: "Buster's Friends",
          routeName: 'default',
          level: 0
        }
      ]
    }

  ]
}

const getters = {}

const actions = {}

const mutations = {
  setWindowsRoutes (state, payload) {
    state.windowsRoutes = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
