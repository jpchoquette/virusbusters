// import VueCookies from 'vue-cookies'
const state = {
  userConnected: false,
  userProfile: null,
  userTemplates: [],
  accountType: null
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
  setUserProfile (state, payload) {
    state.userProfile = payload
  },
  setUserConnected (state, payload) {
    state.userConnected = payload
  },
  setUserTemplates (state, payload) {
    state.userTemplates = payload
  },
  setAccountType (state, payload) {
    state.accountType = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
