// import VueCookies from 'vue-cookies'
const state = {
  userCustomizations: [],
  activeWallpaper: null,
  activeCursor: null,
  activeTheme: null,
  cursorStyles: [
    // {
    //   // cursorImage
    //   template_id: '12344',
    //   name: 'Ghost',
    //   rarity: '',
    //   type: 'ghost',
    //   options: {
    //     image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAASNJREFUWIW9l10OgyAMxwfZYeYd5uM8tD7qHfQ27mWQiqX0izUxMWLpjz8FSnhU7PN6n7W25dhCrU1qt46owD1gLs5Y8Hlf8/s0jO4gVQAYGDMMRgORHSTBKRAphBnAChLLD5rgmB83maPk5x4QNwX+DXEB0MpvgXBXQAoRveafA4ECWAJQOyPXMoBm/ud9NUM8Td4/SxDUuVHbmELKAUqBaRib7ZRRu2K3VcAJLgKgRlmqsxxbSE+r3y4KSJZ2BuBks0QF9mEEZbIuKQ1EwH5slWGe1RIKwDENBAbSLEqhI6WUBARCxFoD9l1TdGKQcCDiDjUqJINqpMGoanlPCNVGVE6FZfmarlWtm1Rp2AlpvmRqKypTDlgh4BS6XbO5EGX+fAFinL3TpLmq4gAAAABJRU5ErkJggg==',
    //     decay: 20
    //   }
    // },
    {
      template_id: '00000001',
      name: 'Infected cursor',
      public: true,
      type: 'base',
      customCursor: true,
      class: 'cursor-infected',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAdJJREFUWIW1lr9uwjAQxj+HCsaKqTOdYOtUlrIUNVs78Qp9Kl6BqWMiusCSTt3IBHMnxJhIER1SW3biP+c4/aSIODa+35199jEY9DJ9upr60nzP5Pbz5FEZ+3n6YiBKDLQZtKkqSgxGw9Y3KgRzGU+yjXiP5yvjRMlhBwBY3s8xGA3JEIwbT/Ix4ulZa1gnGUY2vj1mXhBRVZRIso2XcaAOs2w8ni2wPd3Vv8dM9LsUDUZDa2ipSg47xNOzAKIqak1E8J6rKkrEs4UCAdRLQQZoppSvqqJUDPL1549LDACueL0CqENIjcDtO5aTH9G0GbM5qQAIXdZWw81xy4c3Zcj2+6O1r0wQ4hxI8rHZqE42yD9RICJ+Dshp2IdxgLah1SxwTXxZK2P6SN8b/iJoid7x/8TzlVfqGgFCxCNhuzeMm1DcBRYvXF66lsKWhq2TsG+5DjoygPUqbkQnzfeMP655/yUCPsWNAKCklE8UqBDKZRSa110gtCWZqwzzqZa4nHeBi7QPCB2I0nCV4rZI+YDIEJGpQ/e9S/Gig5Qd8Z6wSxS45GhwZzqVY31CdDqImksRkr5BBalu0/pcWmm+Z0EAJgiKgvZAKIS8hL0A+EA0988vLQwHs4Qq7J4AAAAASUVORK5CYII='
    },
    {
      template_id: '12347',
      disabled: true,
      name: 'Golden cursor',
      rarity: '',
      type: 'dust',
      customCursor: true,
      class: 'cursor-golden',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAcdJREFUWIXdl7FOw0AMhv9UYmxZWSuGrqgSYQPRTF2QIuVVWHkNXgIJqQtTKzGSAboyoL4DHRnKEDlxLvadkzQM/FLVNOnd/8V2bCUCgMU0PoBps8sj/JEi11zTUFAlwHq7wv31be3i+/d4cKgaAFZnAICn5xhvX3txQQiqLVgd4OcGePksIUgajBXIBxUBRRGut6vijALB5QOyQHGYEgBoRoGkgfSBIggZAOgEYQUimM0uj0aNqyevxfdyVjudpTmyNDcDXJ2Py49kThoRibiLA0EgbUUg3Jw8axFILu4Gg3j8qI75DTdTAFRpOBKEZq4DGGWB4OaSSoBg9xKiEIJw71zyaERArAMDhAsS6gsqQCm3DgIQkvl8ssd8UhwvpvFBmrzdamA58xam++wTBIH0B+AgHggOokE0ikJsyyE5bZtE7dutB96K/QBAbwgC0SD6pYDLU5xZmotz4bgABBHoF+5MEJuPNQ3J5SnU/ykpSR6qsS6PY6PIHGDNi/cOIRKuOdAxBdzcCiGZdwJwzflmGoRmDig1AMh14DPnzUVbYxpGmnzm7m+KRMgcMEaAT8jQ2JYGjm9Nq82sbzx8Xe/XN22M/hv9AlwGE9WQ3nqRAAAAAElFTkSuQmCC',
      options: {
        colors: ['#ffec27', '#ffa300', '#fff'],
        chars: ['+', '+', '+'],
        randomColors: false,
        randomChars: false,
        fontStyle: '20px Red Hat Text',
        distance: 80,
        gravity: 0.01
      }
    },
    {
      template_id: '00000002',
      disabled: true,
      name: 'Mad Buster Cursor',
      rarity: '',
      type: 'dust',
      customCursor: true,
      class: 'cursor-mad-buster',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAe1JREFUWIXFVz1PAkEQfUvooVQ6GmoSDD8A6oOKYEKBjfEnUBIbE/6CVBQmohVSS6xJTIylDbGS0vsFZ3Husl+zt3uAvuSyCzs7783O7FwO+GcwAGhVm4m+sNqsWaAv7iNoX5FPnt+exJ/teodyrhMYwkOFFOQf7XrHRu4SY2DY7/rw2gX8gknHn3BCzbHxPx9n84Vh4yWAR77arBUDPaKsCHOdwGqzZvwBgAQRxqjtReQrxCiUBNFuGoCLfgGz+QLDflcZbRw+AoLIaedLkodDKUIp+kODDMh2Cw4SfeooErXQQMlqw7QNByM3idJ0jFFj1/hwC+DGZEpGg3Sc3DnJJL9i/opv1kBZ2BThgO7IEDUagE3Oyf22ABooK63aKoBvtAkQ0VOk8TadlC6ddhy2IkwRT5HEW+WxEo7uyTUCDFLqnSkQO0ongsyKm5cQcuVkdQHySygIyimYx892k6V9QTiSO2E8VRddkRI3gvNY6wlZKdAjySjAPKCLUMcRyAHH2/AWn7jCe+7OKPUAo/BkGCmgDPeBy6d3CngvaFWbxujkzhRHoIdTPOIrAfxf03KkcgpcJ0Degh4qeMCZF7GF1BtkCnqoBDvLA69WnBNeHybHFOB1o7IE6FFQfSH0OzJ8o1ZgxvffMfrHn+AHJXOmdOwnim0AAAAASUVORK5CYII=',
      options: {
        colors: ['#422136', '#000'],
        chars: ['!', '@', '#', '$', '%', '?', '&', '&'],
        randomColors: false,
        randomChars: false,
        fontStyle: '30px DayDream',
        distance: 100,
        gravity: 0.02
      }
    },
    {
      template_id: '12346',
      disabled: true,
      name: 'Glitched Cursor',
      rarity: '',
      type: 'ghost',
      customCursor: true,
      class: 'cursor-glitched',
      image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAmpJREFUWIW9V7Fu2zAQfQzawothGHDhDp5TQR9QLzK6WNqqxVk75is86yvyC87iUfES2Et+QHU7a4jRAIFgIEM7sANFhqQoUo6lvknkUXxPd8c7iqAGoRfQOtvdfkfqbK539X2sG70FJvL0YSWeo+nV/xGQJ1tki1ix+bdrAEA2PwAAyOATedcFebofApy8uBH2yXTGHl52QPwIAGhVQFNESQAkLBQXXRKR/AByjGvtoRfQ1nJATj6edJyc9gpmGF0CACLvWbx3lgdsx02Q99fA+3tBDrAcESLbFlD5+v761Ti4VhcXNx0k4d+vjLgH9uUWkGN8ngBTRSQjgD59phhdAsXrvL8ZI+OD8mg2Kpddg/A4uur7Sci/0HD+QZlKd79BRj8rHJ3VgbvNH2UcBR+N65w5EHoBTZc7Nvj+TcyLum4ouRxkE0P3hA6nB0Qn08iz+QHZi+TRwXX1mEHthG8SoJMrKBsK9wYXQo6xUoJtIkQIaPGonAp/My43VF0s5sF6e4qhEMHDQXsF/Ps9W1S2XqcAHdkiNsbVuHZ+YBeNYsUE2uuPAlJpInIcSwHR9EpkNe2vlVuNjlOPMwG0TrYfKuRcgJh/+sXmpGOVPqxEaCbL2UmCKkkYec8VchfkNXmyRZ5sxTj0AmrtmnyRi8SUybo4mZjD5RFl4LqK63bbxbNOgC7ios5gmm+SYNkixo/pVBGpQ/6QyjFsoynRyRj+rVymWfhM+dT4D8fkbra5uVboPyB1HNZSLL84Wc4q8W0Djdyte0JHppVb3dU2DzSOt+mE6GJcGX+WABua/g1zyKI6+TFpSg4A/wAqjRawOPlTNwAAAABJRU5ErkJggg==',
      options: {
        image: 'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAAAXNSR0IArs4c6QAAAmpJREFUWIW9V7Fu2zAQfQzawothGHDhDp5TQR9QLzK6WNqqxVk75is86yvyC87iUfES2Et+QHU7a4jRAIFgIEM7sANFhqQoUo6lvknkUXxPd8c7iqAGoRfQOtvdfkfqbK539X2sG70FJvL0YSWeo+nV/xGQJ1tki1ix+bdrAEA2PwAAyOATedcFebofApy8uBH2yXTGHl52QPwIAGhVQFNESQAkLBQXXRKR/AByjGvtoRfQ1nJATj6edJyc9gpmGF0CACLvWbx3lgdsx02Q99fA+3tBDrAcESLbFlD5+v761Ti4VhcXNx0k4d+vjLgH9uUWkGN8ngBTRSQjgD59phhdAsXrvL8ZI+OD8mg2Kpddg/A4uur7Sci/0HD+QZlKd79BRj8rHJ3VgbvNH2UcBR+N65w5EHoBTZc7Nvj+TcyLum4ouRxkE0P3hA6nB0Qn08iz+QHZi+TRwXX1mEHthG8SoJMrKBsK9wYXQo6xUoJtIkQIaPGonAp/My43VF0s5sF6e4qhEMHDQXsF/Ps9W1S2XqcAHdkiNsbVuHZ+YBeNYsUE2uuPAlJpInIcSwHR9EpkNe2vlVuNjlOPMwG0TrYfKuRcgJh/+sXmpGOVPqxEaCbL2UmCKkkYec8VchfkNXmyRZ5sxTj0AmrtmnyRi8SUybo4mZjD5RFl4LqK63bbxbNOgC7ios5gmm+SYNkixo/pVBGpQ/6QyjFsoynRyRj+rVymWfhM+dT4D8fkbra5uVboPyB1HNZSLL84Wc4q8W0Djdyte0JHppVb3dU2DzSOt+mE6GJcGX+WABua/g1zyKI6+TFpSg4A/wAqjRawOPlTNwAAAABJRU5ErkJggg==',
        decay: 100
      }
    }
  ],
  // ------------------------------------------------------------ Themes
  themeStyles: [
    {
      template_id: '0000011',
      name: 'Official theme 1',
      gradients: false,
      darkMode: false,
      public: true,
      colors: {
        primary: '#29adff',
        tertiary: '#3171d8',
        secondary: '#7e2753',
        light: '#FFF1E8',
        accent: '#29adff',
        toolbars: '#ff004d',
        grey: '#c2c3c7'
      }
    },
    {
      template_id: '0000012',
      name: 'Official theme dark',
      gradients: false,
      darkMode: true,
      public: true,
      colors: {
        primary: '#7e2753',
        tertiary: '#7e2753',
        secondary: '#7e2753',
        light: '#7e2753',
        accent: '#29adff',
        toolbars: '#29adff',
        grey: '#c2c3c7'
      }
    },
    {
      template_id: '0000013',
      name: 'Golden theme',
      gradients: true,
      darkMode: false,
      disabled: true,
      colors: {
        primary: '#3171d8',
        tertiary: '#3171d8',
        secondary: '#742f29',
        light: '#fff5ce',
        accent: '#ffa300',
        toolbars: '#ab5236',
        grey: '#c2c3c7'
      }
    },
    {
      template_id: '000014',
      name: 'Glitched theme',
      gradients: false,
      darkMode: true,
      disabled: true,
      colors: {
        primary: '#0000AA',
        tertiary: '#0000AA',
        secondary: '#0000AA',
        light: '#0000AA',
        accent: '#ffec27',
        toolbars: '#0000AA',
        grey: '#c2c3c7'
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
  },
  setActiveTheme (state, payload) {
    state.activeTheme = payload
  }
}

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
}
