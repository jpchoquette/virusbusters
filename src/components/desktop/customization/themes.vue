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
            const prefs = {
              owner: this.$store.state.User.userProfile,
              data: this.themeStyles[index]
            }
            this.updatePreferences('theme', prefs)
          } else {
            this.updatePreferences('theme', null)
          }
        } else {
          this.updatePreferences('theme', null)
        }
      } else {
        window.open('https://wax.atomichub.io/market?collection_name=virusbusters&schema_name=virtual.desk&template_id=' + id, '_blank')
      }
    },
    goToMarket (id) {
      window.open('https://wax.atomichub.io/market?collection_name=virusbusters&schema_name=virtual.desk&template_id=' + id, '_blank')
    },
    checkOwnership (id) {
      if (this.$store.state.User.userProfile === 'virusbusters') {
        // virusbuster wallet used to debug nfts preview
        return true
      } else {
        const ownedTemplate = this.$store.state.Buster.ownedThemeTemplates.findIndex((temp) => temp.template.template_id === id)
        return ownedTemplate >= 0
      }
    }
  }
}
</script>
<template lang='pug'>
.window-content.flex
  div.side-menu
    div.header__wrapper
      v-btn(@click='$emit("goBack")', outlined) < All settings
      div.header-title Themes!
    div.preview-image__wrapper
      div.preview-image
        v-img(:src="require('@/assets/images/themes/vd-theme-preview-placeholder.png')", width='200px')
      span.f7.i Preview image coming soon
  div.list-preview
    v-list.w-100
      v-list-item(@click='selectTheme(0, null, true)', :class='{"selected-item" : !$store.state.Customizations.activeTheme}', :style='{borderColor : "var(--v-secondary-base)"}')
        v-list-item-content
          v-list-item-title Default theme
      v-divider()

      template(v-for='(theme, index) in $store.state.Customizations.themeStyles')
        v-list-item(
          @click='(theme.disabled || (!checkOwnership(theme.template_id) && !theme.public)) ? "" : selectTheme(index, theme.template_id, (theme.public || checkOwnership(theme.template_id)))'
          :class='{"missing-template" : false ,"selected-item" : ($store.state.Customizations.activeTheme && $store.state.Customizations.activeTheme.data && ($store.state.Customizations.activeTheme.data.template_id === theme.template_id))}'
          :style='{borderColor : "var(--v-secondary-base)"}'
          :disabled='theme.disabled'
        )
          v-list-item-content
            v-list-item-title
              div
                span.i.f6(v-if='theme.public') Free!
                span.i.f6(v-if='theme.disabled') Coming soon!
                span.red--text.i.f6(v-if='(!checkOwnership(theme.template_id) && !theme.public && !theme.disabled)') Not owned
              div {{theme.name}}
          v-list-item-action(v-if='(!checkOwnership(theme.template_id) && !theme.public && !theme.disabled)')
            v-btn(small, color='accent', depressed, @click='goToMarket(theme.template_id)') Find on market
        v-divider(v-if='index < $store.state.Customizations.themeStyles.length - 1')
</template>
<style lang='sass'>
</style>
