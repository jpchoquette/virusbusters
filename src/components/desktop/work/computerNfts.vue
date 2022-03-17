<script>
import WindowsPaths from '@/mixins/windowsPaths.js'
// import VirusDetails from '@/components/desktop/work/virusDetails'

export default {
  name: 'ComputerNfts',
  components: {
    // VirusDetails
  },
  props: {
    // activeWindow: { required: true, type: Object },
    // currentWindow: { required: false, type: Object, default: () => {}},
    currentPath: { required: false, type: Object, default: () => {} },
    windowId: { required: true, type: String }
  },
  data () {
    return {
      panels: [0]
      // viruses: [
      //   {
      //     title: 'Spyware',
      //     rarity: 'Low Danger',
      //     detailsPath: {
      //       title: 'Spyware',
      //       routeName: 'spyware',
      //       type: 'Route',
      //       level: 2
      //     }
      //   }
      // ]
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
    template(v-if='currentPath.level === 1')
      //- div computer status
      v-expansion-panels
        v-expansion-panel(v-for='(item,i) in 3', :key='i', v-model='panels')
          v-expansion-panel-header
            div.b Infected Desktop Computer #13
            div.flex-grow-1
            div.flex.items-end.justify-end
              v-chip(color='success', pill)
                v-icon(left)
                  | mdi-record
                | Active

          v-expansion-panel-content
            .computer-setup__wrapper
              .computer-setup()
                div.computer__wrapper
                  //- div Infected Computer
                  v-img(:src="require('@/assets/images/placeholders/task-static.png')", contain, max-width='200')
                //- div.link__wrapper
                  v-icon mdi-link-variant
                div.computer-status__wrapper
                  div.status-item
                    div.status-subtitle Linked Software:
                    div.status-title Virus Busters Outdated Antivirus
                  div.status-item
                    div.status-subtitle Expected output:
                    div.status-title Small infected folder (LVL 1)
    //- template(v-else-if='currentPath.level === 2')
    //-   //- pre {{currentPath}}
    //-   //- virus-details(:id='currentPath.routeName')
    //-   //- pre {{currentWindow}}
    //- //- div.header__wrapper
    //-   //- v-btn(@click='$emit("goBack")', outlined) <
    //-   div.header-title Viruses
</template>
<style lang='sass'>
.computer-setup__wrapper
  display: flex
  flex-wrap: wrap
  .computer-setup
    display: flex
    flex-wrap: wrap
    align-items: center
    justify-content: center
    width: 100%
    // padding: 10px
    // border-radius: 0 0 $border-radius-root $border-radius-root
    .computer__wrapper
      width: 40%
      max-width: 200px
    .computer-status__wrapper
      padding: 10px
      height: 100%
      width: 60%
      flex-grow: 1
      // width: 100%
      .status-item
        &:not(:last-child)
          margin-bottom: 10px
        .status-subtitle
          font-size: 14px
        .status-title
          font-size: 18px
          font-weight: bold

</style>
