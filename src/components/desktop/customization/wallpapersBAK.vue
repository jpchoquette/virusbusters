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
    wallpaperStyles: {
      set (val) { this.$store.commit('Customizations/setWallpaperStyles', val) },
      get () { return this.$store.state.Customizations.wallpaperStyles }
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
              extra: this.$store.state.Buster.bustersData[foundBuster],
              type: 'buster'
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
      if (this.$store.state.User.userProfile === 'virusbusters') {
        // virusbuster wallet used to debug nfts preview
        return true
      } else {
        const ownedTemplate = this.$store.state.Buster.ownedBusterTemplates.findIndex((temp) => temp.template.template_id === id)
        return ownedTemplate >= 0
      }
    }
  }
}
</script>
<template lang='pug'>
div
  div.header__wrapper
    v-btn(@click='$emit("goBack")', outlined) < All settings
    div.header-title Wallpapers!

  //- div.avatars__wrapper
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

    div(v-for='(n, index) in 4')
      div.pointer.avatar-wrapper()
        div.avatar-preview
          v-img(:src="require('@/assets/images/buster/buster_unknown.gif')", width='200px')
        div.avatar-title Coming soon!

  div.list-preview
    div.preview-image__wrapper
      div.preview-image
        //- v-img(:src="require('@/assets/images/vb-animated-logo-light.gif')", width='200px')
        v-img(:src="require('@/assets/images/themes/vd-theme-preview-placeholder.png')", width='200px')
        div.preview-image__wrapper
          v-img.h-100.w-100(:src="require('@/assets/images/themes/vd-theme-preview-placeholder.png')", contain)
    //- pre {{wallpaperStyles}}
    v-list.w-100
      v-list-item(@click='selectBuster(0, null, true)', :class='{"selected-item" : !$store.state.Customizations.activeWallpaper}')
        v-list-item-avatar(size='40', tile)
          v-img(:src="require('@/assets/images/vb-animated-logo-light.gif')", width='40px', contain)
        v-list-item-content
          v-list-item-title Default wallpaper
      v-divider()

      template(v-for='(wallpaper, index) in busterTemplates')
        v-list-item(@click='(wallpaper.disabled || (!checkOwnership(wallpaper.template_id) && !wallpaper.public)) ? "" : selectBuster(index, wallpaper.template_id, (wallpaper.public || checkOwnership(wallpaper.template_id)))', :class='{"missing-template" : false ,"selected-item" : ($store.state.Customizations.activeWallpaper && $store.state.Customizations.activeWallpaper.data && ($store.state.Customizations.activeWallpaper.data.template_id === wallpaper.template_id))}', :disabled='wallpaper.disabled')
          v-list-item-avatar(size='40', tile)
            v-img(:src="require('@/assets/images/buster/buster_' + wallpaper.template_id + '.gif')", width='40px')
          v-list-item-content

            v-list-item-title
              div
                span.i.f6(v-if='wallpaper.public') Free!
                span.i.f6(v-if='wallpaper.disabled') Coming soon!
                span.red--text.i.f6(v-if='(!checkOwnership(wallpaper.template_id) && !wallpaper.public && !wallpaper.disabled)') Not owned
              div {{wallpaper.name}}
          v-list-item-action(v-if='(!checkOwnership(wallpaper.template_id) && !wallpaper.public && !wallpaper.disabled)')
            v-btn(small, color='accent', depressed, @click='goToMarket(wallpaper.template_id)') Find on market
        v-divider(v-if='index < $store.state.Customizations.themeStyles.length - 1')
</template>
<style lang='sass'>
</style>
