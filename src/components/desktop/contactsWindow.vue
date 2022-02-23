<script>
// import WaxLogin from '@/mixins/waxLogin.js'
import VueResizable from 'vue-resizable'
export default {
  name: 'ContactsWindow',
  components: {
    VueResizable
  },
  data () {
    return {
      detailedView: false,
      activeCollection: null,
      collections: [
        {
          title: 'cryptomonKeys',
          signature: 'collabs/cryptomonkeys-signature.png',
          icon: 'collabs/cryptomonkeys-icon.png',
          date: '2021-02-17',
          type: 'Collection',
          links: [
            {
              title: 'cryptomonKeys Website',
              url: 'https://cryptomonkeys.cc/',
              image: 'collabs/cryptomonkeys-icon.png'
            },
            {
              title: 'Atomic Hub Collection Page',
              url: 'https://wax.atomichub.io/explorer/collection/crptomonkeys',
              image: 'atomic-hub-icon.png'
            },
            {
              title: 'Twitter',
              url: 'https://twitter.com/Crypt0monKeys',
              image: 'twitter-logo.svg'
            },
            {
              title: 'Discord',
              url: 'https://chat.cryptomonkeys.cc/',
              image: this.$vuetify.theme.dark ? 'icons/discord-icon.svg' : 'icons/discord-icon-black.svg'
            }
          ]
        }
      ]
    }
  },
  // mixins: [WaxLogin],
  mounted () {
  },
  computed: {
    activeWindow: {
      set (val) { this.$store.commit('Desktop/setActiveWindow', val) },
      get () { return this.$store.state.Desktop.activeWindow }
    },
    contactsWindow: {
      set (val) { this.$store.commit('Desktop/setContactsWindow', val) },
      get () { return this.$store.state.Desktop.contactsWindow }
    }
  },
  methods: {
    closeWindow () {
      this.contactsWindow = false
    },
    openLink (link) {
      window.open(link, '_blank')
    },
    toggleCollection (index) {
      if (index >= 0) {
        this.activeCollection = this.collections[index]
        this.detailedView = true
      } else {
        this.activeCollection = null
        this.detailedView = false
      }
    }
  }
}
</script>
<template lang='pug'>
  vue-resizable(:top="$store.state.App.mobileTemplate ? '10%' : '20%'", :left="$store.state.App.mobileTemplate ? '10%' : '40%'", :width="$store.state.App.mobileTemplate ? '80vw' : '350px'", :height="$store.state.App.mobileTemplate ? '70vh' : '350px'", :min-height="250", :min-width="300", drag-selector=".window-top-bar", :class='{"active-window" : $store.state.Desktop.activeWindow === "contacts"}')
    div.customization-window.desktop-window(:class='{"active-window" : $store.state.Desktop.activeWindow === "contacts"}', @mousedown='activeWindow = "contacts"')
      //- LOGIN WAX
      div.window-top-bar(:class='{"active-gradient" : ($store.state.Customizations.activeTheme && $store.state.Customizations.activeTheme.data.gradients)}')
        div.window-title Buster's Friends
        div.flex-grow-1
        v-btn.close-button.secondary--text(@click='closeWindow', tile, color='accent', fab, depressed) X
      div.window-content
        div.collections_wrapper(v-if='!detailedView')
          //- span Allo
          template(v-for='(col, index) in collections')
            div.collection-icon(@click='toggleCollection(index)')
              v-img.collection-image(:src="require('@/assets/images/' + col.icon)", width='50px', height='50px', contain, style='max-width: 50px')
              div.collection-title {{col.title}}
          template(v-for='(col, index) in 2')
            div.collection-icon(@click='')
              div.fallback-image()
                span ?
              //- v-img.collection-image(:src="require('@/assets/images/' + col.icon)", width='50px', height='50px', contain, style='max-width: 50px')
              div.collection-title Coming soon!
        div.collection_wrapper(v-else-if='detailedView && activeCollection')
          div.header__wrapper
            v-btn(@click='toggleCollection()', outlined) < All contacts
            //- div.header-title Cursors!
          //- v-btn(@click='toggleCollection()') All contacts
          div.quicklinks__wrapper
            div.collection-header
              v-img(:src="require('@/assets/images/' + activeCollection.signature)", width='100%', height='100px', contain, style='max-width: 300px', alt='activeCollection.title')

              //- div {{activeCollection.title}}
            v-list(color='transparent')
              template(v-for='(link, index) in activeCollection.links')
                v-list-item.pointer(@click='openLink(link.url)')
                  v-list-item-content
                    div.row-wrapper
                      div.first-row
                        v-img.mr2(:src="require('@/assets/images/' + link.image)", width='20px', height='20px', contain, style='max-width: 30px')
                        span.link-content(:class='link.classes ? link.classes : null') {{link.title}}
                      div.second-row {{link.date}}
                      div.third-row {{link.type}}
                  v-list-item-action
                    v-icon mdi-open-in-new
</template>
<style lang='sass'>
  .customization-window.desktop-window
    .collections_wrapper
      display: flex
      flex-wrap: wrap
      .collection-icon
        display: flex
        flex-direction: column
        justify-content: center
        align-items: center
        width: 120px
        height: 100%
        text-align: center
        position: relative
        padding: 5px
        .fallback-image
          display: flex
          flex-direction: column
          align-items: center
          justify-content: center
          height: 50px
          width: 50px
          font-size: 30px
          font-family: $display-font
          line-height: 1
        .collection-image
          height: 50px
          max-height: 50px !important
        .collection-title
          margin-top: 5px
          word-break: break-word
          line-height: 1.15
          font-size: 14px
        &::after
          content: ''
          position: absolute
          top: 0
          left: 0
          width: 100%
          height: 100%
          opacity: 0
          border: solid 1px black
          background-color: rgba(0,0,0,0.15)
        &:hover
          &::after
            opacity: 1

    .collection-header
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      // ---
    .collection_wrapper
      .quicklinks__wrapper
        display: flex
        flex-direction: column
        min-width: 300px
        .v-list-item
          padding: 0
          min-height: 36px
          .v-list-item__content
            padding: 8px 0
        .row-wrapper
          display: flex
          align-items: center
          font-size: 14px
          &.headers
            font-size: 12px
            padding-bottom: 10px
            border-bottom: solid 1px black
            font-weight: bold
          .first-row
            min-width: 300px
            flex-grow: 1
            display: flex
          .second-row
            min-width: 100px
          .third-row
            min-width: 80px

</style>
