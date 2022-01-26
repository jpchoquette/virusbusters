<script>
export default {
  name: 'StatCalculator',
  props: {
    type: { required: true, type: String, default: 'burns' },
    schemaName: { required: true, type: String, default: '' },
    templateId: { required: false, type: String, default: '' }
  },
  data () {
    return {
      baseValue: 0,
      loadingStat: true
    }
  },
  mounted () {
    this.checkStat()
  },
  methods: {
    checkStat () {
      this.loadingStat = true
      if (this.type === 'burns') {
        const baseUrl = 'https://wax.api.atomicassets.io/atomicassets/v1/burns?collection_name=virusbusters&schema_name='
        let templateId = ''
        if (this.templateId) {
          templateId = '&template_id=' + this.templateId
        }
        const constructedQuery = baseUrl + this.schemaName + templateId + '&page=1&limit=100&order=desc'
        console.log('built', constructedQuery)
        this.fetchSpecificNFTs(constructedQuery)
      }
    },
    fetchSpecificNFTs (query, type) {
      fetch(query, {
        headers: {
          accept: '*/*',
          'accept-language': 'en-US,en;q=0.9',
          'cache-control': 'no-cache',
          'content-type': 'application/json',
          pragma: 'no-cache',
          'sec-fetch-dest': 'empty',
          'sec-fetch-mode': 'cors',
          'sec-fetch-site': 'cross-site',
          'sec-gpc': '1'
        },
        referrer: 'https://wax.atomichub.io/',
        referrerPolicy: 'strict-origin-when-cross-origin',
        body: null,
        method: 'GET',
        mode: 'cors',
        credentials: 'omit'
      })
        .then(response => response.json())
        .then(data => {
          // console.log('owned busters', data)
          // this.ownedBusterTemplates = data.data
          console.log('data ' + this.type, data)
          if (this.type === 'burns') {
            let counter = 0
            for (let i = 0; i < data.data.length; i++) {
              counter += parseInt(data.data[i].assets)
            }
            this.baseValue = counter
          }
          this.loadingStat = false
        })
    }
  }
}
</script>
<template lang='pug'>
  .burn-count
    div(v-if='loadingStat') Loading
    p(v-else) {{baseValue}}
</template>
<style lang='sass'>
  // .burn-count
    // font-size: 20px
</style>
