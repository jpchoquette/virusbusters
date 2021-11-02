<script>
// import WaxLogin from '@/mixins/waxLogin.js'
import VueResizable from 'vue-resizable'
export default {
  name: 'CustomizationWindow',
  components: {
    VueResizable
  },
  data () {
    return {
    }
  },
  // mixins: [WaxLogin],
  mounted () {
  },
  computed: {
    activeWindow: {
      set (val) { this.$store.commit('Desktop/setActiveWindow', val) },
      get () { return this.$store.state.Desktop.activeWindow }
    },
    customizationWindow: {
      set (val) { this.$store.commit('Desktop/setCustomizationWindow', val) },
      get () { return this.$store.state.Desktop.customizationWindow }
    },
    busterTemplates: {
      set (val) { this.$store.commit('Buster/setBusterTemplates', val) },
      get () { return this.$store.state.Buster.busterTemplates }
    },
    ownedBusterTemplates: {
      set (val) { this.$store.commit('Buster/setOwnedBusterTemplates', val) },
      get () { return this.$store.state.Buster.ownedBusterTemplates }
    },
    selectedBusterTemplate: {
      set (val) { this.$store.commit('Buster/setSelectedBusterTemplate', val) },
      get () { return this.$store.state.Buster.selectedBusterTemplate }
    }
  },
  methods: {
    closeWindow () {
      this.customizationWindow = false
    },
    selectBuster (index, id, ownership) {
      console.log('index, id', index, id, ownership)
      if (ownership) {
        if (id) {
          const foundBuster = this.$store.state.Buster.bustersData.findIndex((bust) => bust.id === id)
          console.log('found buster', foundBuster)
          if (foundBuster >= 0) {
            this.selectedBusterTemplate = {
              data: this.busterTemplates[index],
              extra: this.$store.state.Buster.bustersData[foundBuster]
            }
          } else {
            this.selectedBusterTemplate = null
          }
        } else {
          this.selectedBusterTemplate = null
        }
      } else if (id === '338184') {
        window.open('https://neftyblocks.com/c/virusbusters/drops/59544', '_blank')
      } else {
        window.open('https://wax.atomichub.io/market?collection_name=virusbusters&schema_name=buster.heads&template_id=' + id, '_blank')
      }
    },
    checkOwnership (id) {
      const ownedBuster = this.$store.state.Buster.ownedBusterTemplates.findIndex((bust) => bust.template.template_id === id)
      console.log('test', this.$store.state.Buster.ownedBusterTemplates, id)
      console.log('owned', ownedBuster)
      return ownedBuster >= 0
    }
  }
}
</script>
<template lang='pug'>
  vue-resizable(top="10%", left="22%", :width="600", :height="450", :min-height="250", :min-width="300", drag-selector=".window-top-bar", :class='{"active-window" : $store.state.Desktop.activeWindow === "customization"}')
    div.customization-window.desktop-window(:class='{"active-window" : $store.state.Desktop.activeWindow === "customization"}', @mousedown='activeWindow = "customization"')
      //- LOGIN WAX
      div.window-top-bar
        div.window-title Customization
        div.flex-grow-1
        v-btn.white--text(@click='closeWindow', tile, color='accent', fab, depressed) X
      div.window-content
        div.avatars__wrapper
          //- pre {{selectedBusterTemplate}}
          div.pointer.avatar-wrapper(@click='selectBuster(0, null, true)', :class='{"selected-avatar" : !selectedBusterTemplate}')
            div.pointer.avatar-wrapper
              div.avatar-preview.primary
                v-img(:src="require('@/assets/images/vb-animated-logo-light.gif')", width='200px')
              div.avatar-title Default wallpaper
          div(v-for='(buster, index) in busterTemplates')
            //- pre {{buster.template.template_id}}
            //- v-img(:src="require('@/assets/images/buster/buster_' + buster.template.template_id + '.gif')", width='300px')
            //- v-btn(@click='selectBuster(index, buster.template.template_id)') {{buster.template.immutable_data.name}}
            div.pointer.avatar-wrapper(@click='selectBuster(index, buster.template_id, checkOwnership(buster.template_id))', :class='{"missing-template" : !checkOwnership(buster.template_id) ,"selected-avatar" : (selectedBusterTemplate && (selectedBusterTemplate.data.template_id === buster.template_id))}')
              div.avatar-preview
                v-btn.purchase-button(v-if='!checkOwnership(buster.template_id)', x-small, tile, color='accent') Buy
                v-img(:src="require('@/assets/images/buster/buster_' + buster.template_id + '.gif')", width='200px')
              div.avatar-title {{buster.immutable_data.name}}
          div(v-for='(n, index) in 10')
            div.pointer.avatar-wrapper()
              div.avatar-preview
                v-img(:src="require('@/assets/images/buster/buster_unknown.gif')", width='200px')
              div.avatar-title Coming soon!
        //- v-btn(@click='selectBuster(null)') clear avatar
</template>
<style lang='sass'>
  .customization-window.desktop-window
    // top: calc(50% - 150px)
    // left: calc(50% - 250px)

    .avatars__wrapper
      display: flex
      flex-wrap: wrap
      .avatar-wrapper
        padding: 0 5px 5px 5px
        &.selected-avatar
          .avatar-preview
            // border: solid 1px red !important
            background-color: #ffec27
            background-image: repeating-linear-gradient(0deg, var(--v-secondary-base), var(--v-secondary-base) 8px, transparent 8px, transparent 13px, var(--v-secondary-base) 13px), repeating-linear-gradient(90deg, var(--v-secondary-base), var(--v-secondary-base) 8px, transparent 8px, transparent 13px, var(--v-secondary-base) 13px), repeating-linear-gradient(180deg, var(--v-secondary-base), var(--v-secondary-base) 8px, transparent 8px, transparent 13px, var(--v-secondary-base) 13px), repeating-linear-gradient(270deg, var(--v-secondary-base), var(--v-secondary-base) 8px, transparent 8px, transparent 13px, var(--v-secondary-base) 13px)
            background-size: 2px calc(100% + 13px), calc(100% + 13px) 2px, 2px calc(100% + 13px) , calc(100% + 13px) 2px
            background-position: 0 0, 0 0, 100% 0, 0 100%
            background-repeat: no-repeat
            animation: borderAnimation 0.6s infinite linear
        &.missing-template
          .avatar-preview
            position: relative
            .purchase-button
              position: absolute
              left: 0
              bottom: 0
              z-index: 10
              width: 100%
              opacity: 0
            .v-image
              filter: grayscale(1)
              opacity: 0.25
          &:hover
            .avatar-preview
              position: relative
              .purchase-button
                opacity: 1

        .avatar-preview
          padding: 5px
          height: 120px
          width: 120px
          max-width: 120px
          max-height: 120px
          min-height: 120px
          min-width: 120px
          box-sizing: border-box
          border-radius: 4px
          overflow: hidden
          display: flex
          align-items: center
        .avatar-title
          font-size: 14px
          text-align: center
          margin-top: 10px
</style>
