<script>
export default {
  name: 'LoadingBar',
  data () {
    return {
      scrollIns: null,
      loadingIndex: 0,
      activePhrase: 0,
      loadingPhrases: [
        'Revoking access',
        'Replacing files with viruses',
        'Uploading NFTs to the blockhain',
        'Destroying years of hard work'
      ]
    }
  },
  mounted () {
    this.initLoading()
  },
  methods: {
    initLoading () {
      if (this.loadingIndex < 21) {
        setTimeout(() => {
          this.loadingIndex++
          this.initLoading()
        }, Math.floor(Math.random() * (800 - 100 + 1)) + 100)
      } else {
        this.loadingIndex = 0
        if (this.activePhrase < 3) {
          this.activePhrase++
        } else {
          this.activePhrase = 0
        }
        this.initLoading()
      }
    }
  }
}
</script>
<template lang='pug'>
  .loading-bar.w-100
    p.f3.tc {{loadingPhrases[activePhrase]}}

    .bar
      .bar__loader(v-for='(n, index) in 21', :class='{"active-element" : loadingIndex >= index}')
</template>
<style lang='sass'>
  .loading-bar
    width: 700px
  .bar
    display: flex
    margin-top: 20px
    margin-right: auto
    margin-left: auto
    padding-top: 5px
    padding-bottom: 5px
    width: 70%
    height: 50px
    border: 2px solid black
    border-right-color: white
    border-bottom-color: white
    box-shadow: inset 1px 1px 2px black
  .bar__loader
    margin-left: 2px
    margin-right: 2px
    width: calc(100%/21)
    height: 100%
    &.active-element
      background-color: var(--v-bluescreen-base)
</style>
