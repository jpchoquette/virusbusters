<script>
import UpdatePreferences from '@/mixins/updatePreferences.js'

export default {
  name: 'Themes',
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
    themeStyles: {
      set (val) { this.$store.commit('Customizations/setThemeStyles', val) },
      get () { return this.$store.state.Customizations.themeStyles }
    }
  },
  methods: {
    selectTheme (index, id, ownership) {
      if (ownership) {
        if (id) {
          const foundTheme = this.$store.state.Customizations.themeStyles.findIndex((theme) => theme.template_id === id)
          if (foundTheme >= 0) {
            // console.log('on a trouvé')
            const prefs = {
              owner: this.$store.state.User.userProfile,
              data: this.themeStyles[index]
              // extra: this.$store.state.Buster.bustersData[foundCursor]
            }
            this.updatePreferences('theme', prefs)
          } else {
            this.updatePreferences('theme', null)
          }
        } else {
          this.updatePreferences('theme', null)
        }
      } else {
        window.open('https://wax.atomichub.io/market?collection_name=virusbusters&schema_name=buster.heads&template_id=' + id, '_blank')
      }
    },
    checkOwnership (id) {
      const ownedTheme = this.$store.state.Buster.ownedBusterTemplates.findIndex((bust) => bust.template.template_id === id)
      return ownedTheme >= 0
    }
  }
}
</script>
<template lang='pug'>
  div
    div.header__wrapper
      v-btn(@click='$emit("goBack")', outlined) < All settings
      div.header-title Themes!

    div.list-preview
      div.preview-image__wrapper
        div.preview-image
          v-img(:src="require('@/assets/images/themes/vd-theme-preview-placeholder.png')", width='200px')
      v-list.w-100
        v-list-item(@click='selectTheme(0, null, true)', :class='{"selected-item" : !$store.state.Customizations.activeTheme}')
          v-list-item-content
            v-list-item-title Default theme
        v-divider()

        template(v-for='(theme, index) in $store.state.Customizations.themeStyles')
          v-list-item(@click='theme.disabled ? "" : selectTheme(index, theme.template_id, true)', :class='{"missing-template" : false ,"selected-item" : ($store.state.Customizations.activeTheme && $store.state.Customizations.activeTheme.data && ($store.state.Customizations.activeTheme.data.template_id === theme.template_id))}', :disabled='theme.disabled')
            v-list-item-content
              v-list-item-title {{theme.name}}
                span.red--text.i.f6.ml2(v-if='theme.public') Free!
                span.i.f6.ml2(v-if='theme.disabled') Coming soon!

          v-divider(v-if='index < $store.state.Customizations.themeStyles.length - 1')
      //- pre {{$store.state.Customizations.activeTheme}}
      //- div.pointer.avatar-wrapper(@click='selectTheme(0, null, true)', :class='{"selected-avatar" : !$store.state.Customizations.activeTheme}')
        div.pointer.avatar-wrapper
          div.avatar-preview.primary
            //- v-img(:src="require('/base-cursor.png')", width='200px')
          div.avatar-title Default Theme
      //- div(v-for='(theme, index) in $store.state.Customizations.themeStyles')
        //- pre {{theme}}
        div.pointer.avatar-wrapper(@click='selectTheme(index, theme.template_id, true)', :class='{"missing-template" : false ,"selected-avatar" : ($store.state.Customizations.activeTheme && $store.state.Customizations.activeTheme.data && ($store.state.Customizations.activeTheme.data.template_id === theme.template_id))}')
          div.avatar-preview
            //- v-btn.purchase-button(v-if='!checkOwnership(buster.template_id)', x-small, tile, color='accent') Buy
            //- v-img(:src="require('@/assets/images/buster/buster_' + buster.template_id + '.gif')", width='200px')
            v-img(:src="require('@/assets/images/buster/buster_unknown.gif')", width='200px')
          div.avatar-title {{theme.name}}
      //- div(v-for='(buster, index) in busterTemplates')
      //-   div.pointer.avatar-wrapper(@click='selectTheme(index, buster.template_id, checkOwnership(buster.template_id))', :class='{"missing-template" : !checkOwnership(buster.template_id) ,"selected-avatar" : ($store.state.Customizations.activeWallpaper && $store.state.Customizations.activeWallpaper.data && ($store.state.Customizations.activeWallpaper.data.template_id === buster.template_id))}')
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
</style>
