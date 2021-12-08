<script>
import UpdatePreferences from '@/mixins/updatePreferences.js'
export default {
  name: 'Wallpapers',
  components: {
  },
  data () {
    return {
      wallpaperDisplayStyles: [
        {
          text: 'Centered',
          value: 'centered-background'
        },
        {
          text: 'Cover',
          value: 'covering-background'
        },
        {
          text: 'Mosaic',
          value: 'mosaic-background'
        }
      ],
      wallpaperSizes: [
        '25%',
        '50%',
        '75%',
        '100%'
      ],
      activePreview: null
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
    activeWallpaperDisplayStyle: {
      set (val) { this.$store.commit('Customizations/setActiveWallpaperDisplayStyle', val) },
      get () { return this.$store.state.Customizations.activeWallpaperDisplayStyle }
    },
    wallpaperSize: {
      set (val) { this.$store.commit('Customizations/setWallpaperSize', val) },
      get () { return this.$store.state.Customizations.wallpaperSize }
    },
    // ownedBusterTemplates: {
    //   set (val) { this.$store.commit('Buster/setOwnedBusterTemplates', val) },
    //   get () { return this.$store.state.Buster.ownedBusterTemplates }
    // },
    // selectedBusterTemplate: {
    //   set (val) { this.$store.commit('Buster/setSelectedBusterTemplate', val) },
    //   get () { return this.$store.state.Buster.selectedBusterTemplate }
    // },
    filteredWallpapers () {
      let tempStorage = null
      if (tempStorage === null) {
        tempStorage = this.$store.state.Buster.bustersData
        tempStorage.push(...this.$store.state.Customizations.wallpaperStyles)
      }
      // tempStorage.push(this.$store.state.Buster.bustersData)
      return tempStorage
    }
  },
  methods: {
    selectWallpaper (index, id, ownership) {
      if (ownership) {
        if (id) {
          const foundNFT = this.filteredWallpapers.findIndex((item) => item.template_id === id)
          if (foundNFT >= 0) {
            const prefs = {
              owner: this.$store.state.User.userProfile,
              data: this.filteredWallpapers[index],
              displayStyle: this.$store.state.Customizations.activeWallpaperDisplayStyle,
              displaySize: this.$store.state.Customizations.displaySize
            }
            this.updatePreferences('wallpaper', prefs)
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
    selectBuster (index, id, ownership) {
      if (ownership) {
        if (id) {
          const foundBuster = this.$store.state.Buster.bustersData.findIndex((bust) => bust.template_id === id)
          if (foundBuster >= 0) {
            this.selectedBusterTemplate = {
              owner: this.$store.state.User.userProfile,
              data: this.busterTemplates[index],
              displayStyle: this.$store.state.Customizations.activeWallpaperDisplayStyle,
              displaySize: this.$store.state.Customizations.displaySize
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
    checkOwnership (id, type) {
      if (this.$store.state.User.userProfile === 'virusbusters') {
        // virusbuster wallet used to debug nfts preview
        return true
      } else {
        if (type === 'buster') {
          const ownedTemplate = this.$store.state.Buster.ownedWallpaperTemplates.busters.findIndex((temp) => temp.template.template_id === id)
          return ownedTemplate >= 0
        } else if (type === 'wallpaper') {
          const ownedTemplate = this.$store.state.Buster.ownedWallpaperTemplates.wallpapers.findIndex((temp) => temp.template.template_id === id)
          return ownedTemplate >= 0
        }
      }
    },
    goToMarket (id, type) {
      if (type === 'buster') {
        window.open('https://wax.atomichub.io/market?collection_name=virusbusters&schema_name=buster.heads&template_id=' + id, '_blank')
      } else if (type === 'wallpaper') {
        window.open('https://wax.atomichub.io/market?collection_name=virusbusters&schema_name=virtual.desk&template_id=' + id, '_blank')
      }
    }
  }
}
</script>
<template lang='pug'>
.window-content.flex
  div.side-menu
    div.header__wrapper
      v-btn(@click='$emit("goBack")', outlined, block) < All settings
      div.header-title Wallpapers!

    div.preview-image__wrapper
      div.preview-image.mb3
        //- v-img(:src="require('@/assets/images/vb-animated-logo-light.gif')", width='200px')
        v-img(:src="require('@/assets/images/themes/vd-theme-preview-placeholder.png')", width='200px')
        div.contained-image
          template(v-if='activePreview')
            v-img.w-100.h-100(v-if='activePreview.type === "buster"', :src="require('@/assets/images/buster/buster_' + activePreview.id + '.gif')", contain)
            v-img.w-100.h-100(v-else-if='activePreview.type === "wallpaper"', :src="require('@/assets/images/wallpapers/wallpaper_' + activePreview.id + activePreview.extension)", contain)

          template(v-else-if='$store.state.Customizations.activeWallpaper && $store.state.Customizations.activeWallpaper.data')
            v-img.w-100.h-100(v-if='$store.state.Customizations.activeWallpaper.data.type === "buster"', :src="require('@/assets/images/buster/buster_' + $store.state.Customizations.activeWallpaper.data.template_id + '.gif')", contain)
            v-img.w-100.h-100(v-else-if='$store.state.Customizations.activeWallpaper.data.type === "wallpaper"', :src="require('@/assets/images/wallpapers/wallpaper_' + $store.state.Customizations.activeWallpaper.data.template_id + $store.state.Customizations.activeWallpaper.data.extension)", contain)

      v-select(v-if='$store.state.Customizations.activeWallpaper && $store.state.Customizations.activeWallpaper.data.type === "wallpaper"', :items='wallpaperDisplayStyles', item-text='text', item-value='value', label='Display Mode', color='accent', v-model='activeWallpaperDisplayStyle', dense, hide-details, outlined, item-color='accent')
      //- pre {{activePreview}}
  div.list-preview
    v-list.w-100
      v-list-item(@click='selectWallpaper(0, null, true)', :class='{"selected-item" : !$store.state.Customizations.activeWallpaper}')
        v-list-item-avatar(size='40', tile, color='primary')
          v-img(:src="require('@/assets/images/vb-animated-logo-light.gif')", width='40px', contain)
        v-list-item-content
          v-list-item-title Default wallpaper
      v-divider()
      //- pre {{filteredWallpapers}}
      template(v-for='(wallpaper, index) in filteredWallpapers')
        v-list-item(
            @mouseenter='activePreview = { id: wallpaper.template_id, type: wallpaper.type, extension: wallpaper.extension }'
            @mouseleave='activePreview = null'
            @click='(wallpaper.disabled || (!checkOwnership(wallpaper.template_id, wallpaper.type) && !wallpaper.public)) ? "" : selectWallpaper(index, wallpaper.template_id, (wallpaper.public || checkOwnership(wallpaper.template_id, wallpaper.type)))'
            :class='{"missing-template" : false ,"selected-item" : ($store.state.Customizations.activeWallpaper && $store.state.Customizations.activeWallpaper.data && ($store.state.Customizations.activeWallpaper.data.template_id === wallpaper.template_id))}'
            :disabled='wallpaper.disabled'
          )
          v-list-item-avatar(size='40', tile)
            v-img(v-if='wallpaper.type === "buster"', :src="require('@/assets/images/buster/buster_' + wallpaper.template_id + '.gif')", width='40px')
            v-img(v-else-if='wallpaper.type === "wallpaper"', :src="require('@/assets/images/wallpapers/wallpaper_' + wallpaper.template_id + wallpaper.extension)", width='40px')

          v-list-item-content
            v-list-item-title
              div
                span.i.f6(v-if='wallpaper.public') Free!
                span.i.f6(v-if='wallpaper.disabled') Coming soon!
                span.red--text.i.f6(v-if='(!checkOwnership(wallpaper.template_id, wallpaper.type) && !wallpaper.public && !wallpaper.disabled)') Not owned
              div {{wallpaper.name}}
          v-list-item-action(v-if='(!checkOwnership(wallpaper.template_id, wallpaper.type) && !wallpaper.public && !wallpaper.disabled)')
            v-btn(small, color='accent', depressed, @click='goToMarket(wallpaper.template_id, wallpaper.type)') Find on market
        v-divider(v-if='index < filteredWallpapers.length - 1')
</template>
<style lang='sass'>
</style>
