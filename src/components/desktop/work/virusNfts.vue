<script>
import WindowsPaths from '@/mixins/windowsPaths.js'
import VirusDetails from '@/components/desktop/work/virusDetails'

export default {
  name: 'VirusNfts',
  components: {
    VirusDetails
  },
  props: {
    // activeWindow: { required: true, type: Object },
    // currentWindow: { required: false, type: Object, default: () => {}},
    currentPath: { required: false, type: Object, default: () => {} },
    windowId: { required: true, type: String }
  },
  data () {
    return {
      viruses: [
        {
          title: 'Spyware',
          rarity: 'Low Danger',
          detailsPath: {
            title: 'Spyware',
            routeName: 'spyware',
            type: 'Route',
            level: 2
          }
        },
        {
          title: 'Snail Loader',
          rarity: 'Low Danger',
          detailsPath: {
            title: 'Snail Loader',
            routeName: 'snail-loader',
            type: 'Route',
            level: 2
          }
        },
        {
          title: 'Bloater',
          rarity: 'Moderate Danger',
          detailsPath: {
            title: 'Bloater',
            routeName: 'bloater',
            type: 'Route',
            level: 2
          }
        },
        {
          title: 'Folder Worm',
          rarity: 'High Danger',
          detailsPath: {
            title: 'Folder Worm',
            routeName: 'folder-worm',
            type: 'Route',
            level: 2
          }
        },
        {
          title: 'Cursor Tracker',
          rarity: 'Critical Danger',
          detailsPath: {
            title: 'Cursor Tracker',
            routeName: 'cursor-tracker',
            type: 'Route',
            level: 2
          }
        }
      ]
    }
  },
  mixins: [WindowsPaths],
  mounted () {
  },
  computed: {
  },
  methods: {
  }
}
</script>
<template lang='pug'>
  .window-content
    template(v-if='currentPath.level === 1')
      .nfts__wrapper
        .nft-card(v-for='(virus,index) in viruses', @click='updateRoute(windowId, virus.detailsPath)')
          div.nft-preview()
          .nft-content
            span.nft-title {{virus.title}}
            div.nft-rarity {{virus.rarity}}
    template(v-else-if='currentPath.level === 2')
      //- pre {{currentPath}}
      virus-details(:id='currentPath.routeName')
      //- pre {{currentWindow}}
    //- div.header__wrapper
      //- v-btn(@click='$emit("goBack")', outlined) <
      div.header-title Viruses
</template>
<style lang='sass'>
  .nfts__wrapper
    display: flex
    flex-wrap: wrap
    .nft-card
      padding: 10px
      display: flex
      flex-direction: column
      .nft-preview
        width: 120px
        height: 160px
        background-color: grey
      .nft-content
        font-family: $code-font
        text-align: center
        padding: 5px
        .nft-title
          font-size: 16px
          font-weight: bold
        .nft-rarity
          font-size: 12px
</style>
