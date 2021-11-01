// import VueCookies from 'vue-cookies'
const state = {
  window: null,
  activeWindow: null,
  settingsWindow: false,
  customizationWindow: false,
  computersWindow: false,
  quickLinksWindow: false,
  collectionWindow: false,
  blenderWindow: false
}

const getters = {}

const actions = {
  // async fetchFavoris ({ commit, dispatch }) {
  //   try {
  //     await apolloClientV2.query({
  //       query: require('@/graphql/queries/v2/searchCommunFavoris.gql'),
  //       // variables: { filtre: { types: ['BOUTIQUE_ITEM'] } },
  //       fetchPolicy: 'network-only'
  //     }).then(({ data }) => {
  //       commit('initFavoris', data.searchCommunFavoris.resultat)
  //       commit('setFavTotal', data.searchCommunFavoris.total)
  //       dispatch('fetchMoreFav', 1)
  //     })
  //   } catch (e) {
  //     console.error('erreur lors de la récupération des favoris')
  //   }
  // },
}

const mutations = {
  setActiveWindow (state, payload) {
    state.activeWindow = payload
  },
  setSettingsWindow (state, payload) {
    state.settingsWindow = payload
  },
  setCustomizationWindow (state, payload) {
    state.customizationWindow = payload
  },
  setComputersWindow (state, payload) {
    state.computersWindow = payload
  },
  setQuickLinksWindow (state, payload) {
    state.quickLinksWindow = payload
  },
  setCollectionWindow (state, payload) {
    state.collectionWindow = payload
  },
  setBlenderWindow (state, payload) {
    state.blenderWindow = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
