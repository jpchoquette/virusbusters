<script>
export default {
  name: 'StatCalculator',
  props: {
    type: { required: true, type: String, default: 'burns' },
    schemaName: { required: true, type: String, default: '' },
    templateId: { required: false, type: String, default: '' },
    user: { required: false, type: Boolean, default: false }
  },
  data () {
    return {
      baseValue: 0,
      loadingStat: true,
      coinTemplates: [
        {
          id: '328537',
          weight: 1
        },
        {
          id: '316443',
          weight: 5
        },
        {
          id: '316442',
          weight: 10
        }
      ]
    }
  },
  mounted () {
    this.checkStat()
  },
  methods: {
    checkStat () {
      this.loadingStat = true
      this.baseValue = 0
      let userUrl = ''
      if (this.user) {
        userUrl = '&owner=' + this.$store.state.User.userProfile
      }
      if (this.type === 'burns') {
        const baseUrl = 'https://wax.api.atomicassets.io/atomicassets/v1/burns?collection_name=virusbusters&schema_name='
        let templateId = ''
        if (this.templateId) {
          templateId = '&template_id=' + this.templateId
        }
        const constructedQuery = baseUrl + this.schemaName + templateId + userUrl + '&page=1&limit=100&order=desc'
        this.fetchSpecificNFTs(constructedQuery)
      } else if (this.type === 'coins') {
        const baseUrl = 'https://wax.api.atomicassets.io/atomicassets/v1/assets?collection_name=virusbusters&schema_name='
        this.coinTemplates.forEach((coin, index) => {
          let templateId = ''
          templateId = '&template_id=' + coin.id
          const constructedQuery = baseUrl + this.schemaName + templateId + userUrl + '&page=1&limit=100&order=desc'
          this.fetchSpecificNFTs(constructedQuery, coin.weight)
        })
      }
    },
    fetchSpecificNFTs (query, weight) {
      console.log('query', query)
      fetch(query, this.$store.state.App.globalHeader)
        .then(response => response.json())
        .then(data => {
          if (this.type === 'burns') {
            let counter = 0
            for (let i = 0; i < data.data.length; i++) {
              counter += parseInt(data.data[i].assets)
            }
            this.baseValue = counter
          } else if (this.type === 'coins') {
            let counter = 0
            for (let i = 0; i < data.data.length; i++) {
              counter++
            }
            if (weight) {
              this.baseValue = this.baseValue + (counter * weight)
            } else {
              this.baseValue = this.baseValue + counter
            }
          }
          this.loadingStat = false
        })
    }
  }
}
</script>
<template lang='pug'>
  .value-count
    div(v-if='loadingStat') Loading
    div(v-else-if='baseValue') {{baseValue}}
    div(v-else) N/A
</template>
<style lang='sass'>
  // .burn-count
    // font-size: 20px
</style>
