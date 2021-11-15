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
    cursorStyles: {
      set (val) { this.$store.commit('Customizations/setCursorStyles', val) },
      get () { return this.$store.state.Customizations.cursorStyles }
    }
    // activeCursor: {
    //   set (val) { this.$store.commit('Buster/setSelectedCursor', val) },
    //   get () { return this.$store.state.Customizations.selectedCursor }
    // }
    // ownedBusterTemplates: {
    //   set (val) { this.$store.commit('Buster/setOwnedBusterTemplates', val) },
    //   get () { return this.$store.state.Buster.ownedBusterTemplates }
    // },
    // selectedBusterTemplate: {
    //   set (val) { this.$store.commit('Buster/setSelectedBusterTemplate', val) },
    //   get () { return this.$store.state.Buster.selectedBusterTemplate }
    // }
  },
  methods: {
    selectCursor (index, id, ownership) {
      if (ownership) {
        if (id) {
          const foundCursor = this.$store.state.Customizations.cursorStyles.findIndex((cursor) => cursor.template_id === id)
          console.log('cursor template found!, index:', foundCursor)
          if (foundCursor >= 0) {
            const prefs = {
              owner: this.$store.state.User.userProfile,
              data: this.cursorStyles[index]
              // extra: this.$store.state.Buster.bustersData[foundCursor]
            }
            this.updatePreferences('cursor', prefs)
            // this.$cookies.set('buster', this.selectedBusterTemplate, 604800)
          } else {
            this.updatePreferences('cursor', null)
            // this.selectedBusterTemplate = null
          }
        } else {
          // this.selectedBusterTemplate = null
          // this.$cookies.remove('buster')
          this.updatePreferences('cursor', null)
        }
        // this.$emit('changeWP')
      } else {
        window.open('https://wax.atomichub.io/market?collection_name=virusbusters&schema_name=buster.heads&template_id=' + id, '_blank')
      }
    },
    // selectBuster (index, id, ownership) {
    //   // console.log('index, id', index, id, ownership)
    //   if (ownership) {
    //     if (id) {
    //       const foundBuster = this.$store.state.Buster.bustersData.findIndex((bust) => bust.id === id)
    //       console.log('buster template owned, index:', foundBuster)
    //       if (foundBuster >= 0) {
    //         this.selectedBusterTemplate = {
    //           owner: this.$store.state.User.userProfile,
    //           data: this.busterTemplates[index],
    //           extra: this.$store.state.Buster.bustersData[foundBuster]
    //         }
    //         this.updatePreferences('wallpaper', this.selectedBusterTemplate)
    //         // this.$cookies.set('buster', this.selectedBusterTemplate, 604800)
    //       } else {
    //         this.updatePreferences('wallpaper', null)
    //         // this.selectedBusterTemplate = null
    //       }
    //     } else {
    //       // this.selectedBusterTemplate = null
    //       // this.$cookies.remove('buster')
    //       this.updatePreferences('wallpaper', null)
    //     }
    //     // this.$emit('changeWP')
    //   } else if (id === '338184') {
    //     window.open('https://neftyblocks.com/c/virusbusters/drops/59544', '_blank')
    //   } else {
    //     window.open('https://wax.atomichub.io/market?collection_name=virusbusters&schema_name=buster.heads&template_id=' + id, '_blank')
    //   }
    // },
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
      v-btn(@click='$emit("goBack")') Go back

    div.avatars__wrapper
      //- pre {{$store.state.Customizations.activeWallpaper}}
      div.pointer.avatar-wrapper(@click='selectCursor(0, null, true)', :class='{"selected-avatar" : !$store.state.Customizations.activeCursor}')
        div.pointer.avatar-wrapper
          div.avatar-preview.primary
            //- v-img(:src="require('/base-cursor.png')", width='200px')
          div.avatar-title Default Cursor
      div(v-for='(cursor, index) in $store.state.Customizations.cursorStyles')
        //- pre {{cursor}}
        div.pointer.avatar-wrapper(@click='selectCursor(index, cursor.template_id, true)', :class='{"missing-template" : false ,"selected-avatar" : ($store.state.Customizations.activeCursor && $store.state.Customizations.activeCursor.data && ($store.state.Customizations.activeCursor.data.template_id === cursor.template_id))}')
          div.avatar-preview
            //- v-btn.purchase-button(v-if='!checkOwnership(buster.template_id)', x-small, tile, color='accent') Buy
            //- v-img(:src="require('@/assets/images/buster/buster_' + buster.template_id + '.gif')", width='200px')
            v-img(:src="require('@/assets/images/buster/buster_unknown.gif')", width='200px')
          div.avatar-title {{cursor.name}}
      //- div(v-for='(buster, index) in busterTemplates')
      //-   div.pointer.avatar-wrapper(@click='selectCursor(index, buster.template_id, checkOwnership(buster.template_id))', :class='{"missing-template" : !checkOwnership(buster.template_id) ,"selected-avatar" : ($store.state.Customizations.activeWallpaper && $store.state.Customizations.activeWallpaper.data && ($store.state.Customizations.activeWallpaper.data.template_id === buster.template_id))}')
      //-     div.avatar-preview
      //-       v-btn.purchase-button(v-if='!checkOwnership(buster.template_id)', x-small, tile, color='accent') Buy
      //-       v-img(:src="require('@/assets/images/buster/buster_' + buster.template_id + '.gif')", width='200px')
      //-     div.avatar-title {{buster.immutable_data.name}}
      //- div(v-for='(n, index) in 10')
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
