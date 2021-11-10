// import VueCookies from 'vue-cookies'
const state = {
  userCustomizations: [],
  activeWallpaper: {},
  cursorStyles: [
    // Cursor 1
    {
      template_id: '12344',
      name: 'Test Cursor 1',
      rarity: '',
      type: 'ghost',
      options: {
        colors: ['#ff145b', '#e8af20', '#ffe902'],
        chars: ['S', 'a', 'l', 'u', 't', '!', '!', '!'],
        randomColors: false,
        randomChars: false,
        distance: 200
      }
    },
    {
      template_id: '12345',
      name: 'Test Cursor 2',
      rarity: '',
      type: 'dust',
      options: {
        colors: ['#fcccac'],
        chars: ['!', '@', '#', '$', '%', '?', '&', '&'],
        randomColors: false,
        randomChars: false,
        distance: 200,
        velocity: 2
      }
    },
    {
      template_id: '12346',
      name: 'Test Cursor 3',
      rarity: '',
      type: 'base'
    }
  ]
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
  setActiveWallpaper (state, payload) {
    state.activeWallpaper = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
