<script>
import { orderBy } from 'lodash'

import ScoreboardEntry from '@/components/shared/scoreboardEntry'
export default {
  name: 'scoreboard',
  props: {
    board: { required: true, type: Object },
    data: { required: false, type: Object },
    entries: { required: false, type: Array },
    loading: { required: false, type: Boolean, default: false }
  },
  components: {
    ScoreboardEntry
  },
  data () {
    return {
      selectedFilters: []
    }
  },
  mounted () {
  },
  watch: {
    board: {
      deep: true,
      immediate: true,
      handler (newVal) {
        if (newVal && newVal.sortable && this.data) {
          // console.log('got filters!', newVal.sortable)
          for (let i = 0; i < this.data.filters.length; i++) {
            const tempFiltervalue = {
              index: i,
              name: this.data.filters[i].name,
              value: this.data.filters[i].data[0].value
            }
            this.selectedFilters.push(tempFiltervalue)
          }
        }
      }
    }
  },
  computed: {
    filteredEntries () {
      if (this.selectedFilters) {
        if (this.selectedFilters.length === 2) {
          const scoreboard = this.data.tables[this.selectedFilters[0].value].tables[this.selectedFilters[1].value]
          return orderBy(scoreboard.entries, ['score'], ['asc'])
        } else if (this.selectedFilters.length === 1) {
          const scoreboard = this.data.tables[this.selectedFilters[0].value]
          return orderBy(scoreboard.entries, ['score'], ['asc'])
        } else {
          return null
          // à faire
        }
      } else {
        return null
      }
    }
  },
  methods: {
  }
}
</script>
<template lang='pug'>
  div.scoreboard-data
    div(v-if='loading')
      div Loading scoreboard, please wait...
    div(v-else)
      div.w-100
        h1.board-title {{board.title}}
      div.board-subtitle 🏆 Top 50 🏆
      template(v-if='data')
        div.entries__wrapper
          template(v-if='!board.sortable')
            template(v-for='(entry, index) in entries')
              scoreboard-entry(:entry='entry', :index='index')
          template(v-else-if='board.sortable && selectedFilters && selectedFilters.length')
            div.filters__wrapper
              div.filter(v-for='(filter,index) in data.filters')
                div
                  v-select(v-model='selectedFilters[index].value', :label='filter.name', :items='filter.data', item-text='name', item-value='value', hide-details, filled, dense, dark, item-color='secondary')
            template(v-for='(entry, index) in filteredEntries')
              scoreboard-entry(:entry='entry', :index='index')
      template(v-else) Data unavailable
</template>

<style lang='sass'>
.scoreboard-data
  padding: 0 20px 20px 20px
  min-width: 300px
  max-width: 600px
  margin: 0 auto
  .board-title
    text-align: center
    padding: 10px 20px
    font-family: $display-font
    font-size: 30px
  .board-subtitle
    font-size: 24px
    text-align: center
    padding: 20px
    color: white
    background-color: var(--v-secondary-base)
  .entries__wrapper
    width: 100%
  .filters__wrapper
    display: flex
    flex-wrap: wrap
    margin-bottom: 20px
    padding: 20px
    background-color: var(--v-secondary-darken1)

    .filter
      min-width: 150px
      flex-grow: 1
      margin-bottom: 5px
      > div
        padding: 0 5px
        .v-input
          width: calc(100% - 10px)
  @media all and (max-width: $medium)
    padding: 20px 0
    width: 100%
    margin: 0 auto
    .board-title
      font-size: 20px
    .board-subtitle
      font-size: 30px
      text-align: center
      padding: 20px
      background-color: var(--v-secondary-base)
</style>
