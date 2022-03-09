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
    //- div VIRUS DETAIL!

    div.image__wrapper
      div.image
    div.content__wrapper
      pre {{id}}
      div.element-title
        | Spyware
      div.element-rarity
        | Minor Threat
      div.element-description
        | Minor threat detected: This file is possibly collecting private data
      div.element-actions__wrapper
        v-btn(@click='goToMarket()') View on the market
        //- v-btn(@click='blendNft()') Blend Virus
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
    width: calc(90% - 200px)
    .element-title
      font-size: 20px
      font-family: $display-font
</style>
