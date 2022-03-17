<script>
import WindowsPaths from '@/mixins/windowsPaths.js'
import ShopItemsDetails from '@/components/desktop/work/shopItemsDetails'
import StatCalculator from '@/components/shared/statCalculator'

export default {
  name: 'ShopItems',
  components: {
    ShopItemsDetails,
    StatCalculator
  },
  props: {
    // activeWindow: { required: true, type: Object },
    // currentWindow: { required: false, type: Object, default: () => {}},
    currentPath: { required: false, type: Object, default: () => {} },
    windowId: { required: true, type: String }
  },
  data () {
    return {
      items: [
        {
          title: 'Easy task',
          rarity: 'Common',
          price: '3',
          detailsPath: {
            title: 'Easy Task',
            routeName: 'task-easy',
            type: 'Route',
            level: 2
          }
        },
        {
          title: 'Buster Model A',
          rarity: 'Rare',
          price: '20',
          detailsPath: {
            title: 'Buster Model A',
            routeName: 'buster-model-a',
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
  .sub-window__content
    div.coins-count__wrapper
      v-alert(color='green', dark='', icon='mdi-help', border='left', dense)
        div My Virtual Coins total:
          stat-calculator(type='coins', schemaName='popups', templateId='316428', :user='true')

    template(v-if='currentPath.level === 1')
      .nfts__wrapper
        .nft-card(v-for='(item,index) in items', @click='updateRoute(windowId, item.detailsPath)')
          div.nft-preview()
            //- div.owned-qty
             span x210
            v-img(:src="require('@/assets/images/placeholders/task-static.png')", contain)
          .nft-content
            div.price-chip {{item.price}} Coins NFTs
            span.nft-title {{item.title}}
            div.nft-rarity {{item.rarity}}
    template(v-else-if='currentPath.level === 2')
      //- pre {{currentPath}}
      shop-items-details(:id='currentPath.routeName')
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
      position: relative
      &::before
        content: ''
        background-color: rgba(0,0,0,0.15)
        position: absolute
        top: 0
        left: 0
        width: 100%
        height: 100%
        opacity: 0
      &:hover
        &::before
          opacity: 1
      .nft-preview
        width: 140px
        height: 170px
        position: relative
        // background-color: grey
        .owned-qty
          position: absolute
          top: -10px
          right: 10px
          height: 40px
          width: 40px
          font-size: 14px
          font-weight: bold
          background-color: var(--v-secondary-base)
          color: white
          border-radius: 20px
          z-index: 10
          display: flex
          align-items: center
          text-align: center
          justify-content: center
          transform: rotate(-15deg)
      .nft-content
        position: relative
        text-align: center
        padding: 5px
        .price-chip
          padding: 2px
          border: solid 1px var(--v-success-lighten2)
          background-color: var(--v-success-base)
          color: white
          font-weight: bold
          border-radius: 15px
          font-size: 12px
          margin-bottom: 5px
        .nft-title
          font-size: 16px
          font-weight: bold
        .nft-rarity
          font-family: $code-font
          font-size: 12px
</style>
