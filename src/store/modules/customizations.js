// import VueCookies from 'vue-cookies'
const state = {
  userCustomizations: [],
  activeWallpaper: null,
  activeCursor: null,
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
        decay: 200
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
    },
    {
      template_id: '12347',
      name: 'Golden cursor',
      rarity: '',
      type: 'dust',
      options: {
        colors: ['#ffec27', '#ffa300', '#000000'],
        chars: ['.'],
        randomColors: true,
        randomChars: false,
        distance: 80,
        velocity: 2,
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAASNJREFUWIW9l10OgyAMxwfZYeYd5uM8tD7qHfQ27mWQiqX0izUxMWLpjz8FSnhU7PN6n7W25dhCrU1qt46owD1gLs5Y8Hlf8/s0jO4gVQAYGDMMRgORHSTBKRAphBnAChLLD5rgmB83maPk5x4QNwX+DXEB0MpvgXBXQAoRveafA4ECWAJQOyPXMoBm/ud9NUM8Td4/SxDUuVHbmELKAUqBaRib7ZRRu2K3VcAJLgKgRlmqsxxbSE+r3y4KSJZ2BuBks0QF9mEEZbIuKQ1EwH5slWGe1RIKwDENBAbSLEqhI6WUBARCxFoD9l1TdGKQcCDiDjUqJINqpMGoanlPCNVGVE6FZfmarlWtm1Rp2AlpvmRqKypTDlgh4BS6XbO5EGX+fAFinL3TpLmq4gAAAABJRU5ErkJggg=='
      }
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
  },
  setActiveCursor (state, payload) {
    state.activeCursor = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
