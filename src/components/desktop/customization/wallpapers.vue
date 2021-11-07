<script>
import UpdatePreferences from '@/mixins/updatePreferences.js'
export default {
  name: 'Wallpapers',
  components: {
  },
  data () {
    return {
    }
  },
  mixins: [UpdatePreferences],
  mounted () {
  },
  computed: {
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
    selectBuster (index, id, ownership) {
      if (ownership) {
        if (id) {
          const foundBuster = this.$store.state.Buster.bustersData.findIndex((bust) => bust.id === id)
          if (foundBuster >= 0) {
            this.selectedBusterTemplate = {
              owner: this.$store.state.User.userProfile,
              data: this.busterTemplates[index],
              extra: this.$store.state.Buster.bustersData[foundBuster]
            }
            this.updatePreferences('wallpaper', this.selectedBusterTemplate)
          } else {
            this.updatePreferences('wallpaper', null)
          }
        } else {
          this.updatePreferences('wallpaper', null)
        }
      } else if (id === '338184') {
        window.open('https://neftyblocks.com/c/virusbusters/drops/59544', '_blank')
      } else {
        window.open('https://wax.atomichub.io/market?collection_name=virusbusters&schema_name=buster.heads&template_id=' + id, '_blank')
      }
    },
    checkOwnership (id) {
      const ownedBuster = this.$store.state.Buster.ownedBusterTemplates.findIndex((bust) => bust.template.template_id === id)
      return ownedBuster >= 0
    }
  }
}
</script>
<template lang='pug'>
div
  div.header__wrapper
    v-btn(@click='$emit("goBack")', depressed, color='secondary', outlined) All settings
  div.avatars__wrapper
    //- pre {{$store.state.Customizations.activeWallpaper}}
    div.pointer.avatar-wrapper(@click='selectBuster(0, null, true)', :class='{"selected-avatar" : !$store.state.Customizations.activeWallpaper}')
      div.avatar-preview.primary
        v-img(:src="require('@/assets/images/vb-animated-logo-light.gif')", width='120px')
      div.avatar-title Default wallpaper
    div(v-for='(buster, index) in busterTemplates')
      div.pointer.avatar-wrapper(@click='selectBuster(index, buster.template_id, checkOwnership(buster.template_id))', :class='{"missing-template" : !checkOwnership(buster.template_id) ,"selected-avatar" : ($store.state.Customizations.activeWallpaper && $store.state.Customizations.activeWallpaper.data && ($store.state.Customizations.activeWallpaper.data.template_id === buster.template_id))}')
        div.avatar-preview
          v-btn.purchase-button(v-if='!checkOwnership(buster.template_id)', x-small, tile, color='accent') Buy
          v-img(:src="require('@/assets/images/buster/buster_' + buster.template_id + '.gif')", width='200px')
        div.avatar-title {{buster.immutable_data.name}}
        //- pre {{buster}}

    div(v-for='(n, index) in 10')
      div.pointer.avatar-wrapper()
        div.avatar-preview
          v-img(:src="require('@/assets/images/buster/buster_unknown.gif')", width='200px')
        div.avatar-title Coming soon!
</template>
<style lang='sass'>
  .customization-window.desktop-window
    // top: calc(50% - 150px)
    // left: calc(50% - 250px)
    .header__wrapper
      margin: 0 0 10px 5px
    .avatars__wrapper
      display: flex
      flex-wrap: wrap
      .avatar-wrapper
        padding: 0 5px 5px 5px
        &.selected-avatar
          .avatar-preview
            // border: solid 1px red !important
            background-color: var(--v-light-base)
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
          padding: 2px
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
