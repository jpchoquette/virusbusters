<script>
export default {
  name: 'VirusDetails',
  components: {
  },
  props: {
    id: { required: true, type: String }
  },
  data () {
    return {
    }
  },
  mixins: [],
  mounted () {
  },
  computed: {
  },
  methods: {
    goToMarket (id) {
      // window.open('https://wax.atomichub.io/market?collection_name=virusbusters&schema_name=virtual.desk&template_id=' + id, '_blank')
      window.open('https://wax.atomichub.io/market?collection_name=virusbusters&schema_name=virtual.desk', '_blank')
    },
    goToInventory (id, schema) {
      let tempSchema = ''
      if (schema) {
        tempSchema = '&schema_name=' + schema
      }
      if (schema) {
        window.open('https://wax.atomichub.io/profile/' + this.$store.state.User.userProfile + '?collection_name=virusbusters' + tempSchema + '&order=desc&sort=transferred#inventory', '_blank')
      } else {
        window.open('https://wax.atomichub.io/profile/' + this.$store.state.User.userProfile + '?collection_name=virusbusters&order=desc&sort=transferred#inventory', '_blank')
      }
      // window.open('https://wax.atomichub.io/market?collection_name=virusbusters&schema_name=virtual.desk&template_id=' + id, '_blank')
    },
    blendNft (id) {
      // window.open('https://neftyblocks.com/c/virusbusters/blends' + id, '_blank')
      console.log('TODO')
      window.open('https://neftyblocks.com/c/virusbusters/blends', '_blank')
    }
  }
}
</script>
<template lang='pug'>
  .virus-detail
    div.image__wrapper
      v-img(:src="require('@/assets/images/placeholders/common-virus-static.png')", contain)
    div.content__wrapper
      //- pre {{id}}
      div.element-rarity
        | Minor Threat
      div.element-title
        | Spyware
      div.element-description
        | Minor threat detected: This file is possibly collecting private data
      div.element-actions__wrapper
        v-btn(@click='goToMarket()', block, outlined, rounded) View on the market
        v-btn(@click='goToInventory(null, "buster.head")', block, outlined, rounded) View in my inventory
        //- v-btn(@click='blendNft()') Blend Virus
      div.element-stats
        div.stat-info__wrapper
          div.stat-title Total burns
          div.stat-value 128
        div.stat-info__wrapper
          div.stat-title My burns
          div.stat-value 15
        div.stat-info__wrapper
          div.stat-title Computers Infected
          div.stat-value 48
</template>
<style lang='sass' scoped>
.virus-detail
  display: flex
  flex-wrap: wrap
  .image__wrapper
    width: 200px
    min-width: 150px
    height: 100%
    padding: 0
    .image
      width: 100%
      height: 200px
      background-color: red
  .content__wrapper
    min-width: 200px
    padding: 10px
    width: calc(100% - 200px)
    .element-rarity
      font-size: 14px
      // margin-bottom: 10px
    .element-title
      font-size: 24px
      font-family: $display-font
      margin-bottom: 10px
    .element-description
      font-style: italic
    .element-actions__wrapper
      margin-top: 14px
    .element-stats
      margin-top: 10px
      display: flex
      flex-wrap: wrap
      .stat-info__wrapper
        padding-right: 20px
        margin-bottom: 10px
        .stat-title
          font-size: 14px
        .stat-value
          font-family: $display-font
          font-size: 20px
</style>
