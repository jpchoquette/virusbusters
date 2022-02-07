<script>
// import WaxLogin from '@/mixins/waxLogin.js'
export default {
  name: 'scoreboard',
  props: {
    entry: { required: true, type: Object },
    index: { required: true, type: Number },
    scoreType: { required: true, type: String }
  },
  components: {
  },
  data () {
    return {
    }
  },
  // mixins: [WaxLogin],
  mounted () {
    // this.fetchScoreboard()
  },
  computed: {
    parsedScore () {
      const score = this.entry.score ? this.entry.score : this.entry.value
      if (this.scoreType === 'time') {
        return new Date(score * 1000).toISOString().substr(11, 8)
      } else {
        return score
      }
    }
  },
  methods: {
  }
}
</script>
<template lang='pug'>
  div.entry(:class='{"active-user" : entry.wallet === $store.state.User.userProfile}')
    div.entry-position
      div(v-if='index === 0') 🥇
      div(v-else-if='index === 1') 🥈
      div(v-else-if='index === 2') 🥉
      div(v-else) {{index+1}}.
    div.entry-wallet {{entry.wallet}}
    div.flex-grow-1
    div.entry-score {{parsedScore}}
</template>

<style lang='sass'>
  .entry
    color: var(--v-secondary-base)
    display: flex
    align-items: baseline
    position: relative
    padding: 10px 20px
    border-bottom: solid 1px black
    background-color: white
    &.active-user
      // color: var(--v-accent-base)
      font-weight: bold
      &::before
        background-color: var(--v-accent-base)
        opacity: 0.15
    &:hover
      &::before
        opacity: 0.15
    &::before
      content: ''
      position: absolute
      top: 0
      left: 0
      width: 100%
      height: 100%
      background-color: var(--v-secondary-base)
      opacity: 0
      z-index: 0
    .entry-position
      position: relative
      display: flex
      padding-right: 10px
      div
        font-size: 20px
        width: 40px
        text-align: center
    .entry-wallet
      position: relative
      font-size: 16px
    .entry-score
      position: relative
      font-size: 20px
      font-weight: bold
      font-family: monospace
    .dividing-line
      position: relative
      margin: 0 20px
      flex-grow: 1
      border-bottom: solid 1px white
      height: 1px
</style>
