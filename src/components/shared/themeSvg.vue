<script>
export default {
  name: 'ThemeSvg',
  props: {
    activePreview: { required: false, type: Object, default: () => {} }
  },
  components: {
  },
  data () {
    return {
    }
  },
  mounted () {
  },
  computed: {
  },
  watch: {
    activePreview (newVal) {
      if (newVal) {
        this.swapColors(newVal)
      } else {
        this.swapColors()
      }
    }
  },
  methods: {
    swapColors (colors) {
      const colorSecondary = document.getElementsByClassName('theme-preview-secondary')
      const colorAccent = document.getElementsByClassName('theme-preview-accent')
      const colorToolbars = document.getElementsByClassName('theme-preview-toolbars')
      const colorLight = document.getElementsByClassName('theme-preview-light')
      const colorText = document.getElementsByClassName('theme-preview-text')
      if (colors && colors.colors) {
        for (let i = 0; i < colorSecondary.length; i++) {
          colorSecondary[i].style.fill = colors.colors.secondary
        }
        for (let i = 0; i < colorAccent.length; i++) {
          colorAccent[i].style.fill = colors.colors.accent
        }
        for (let i = 0; i < colorToolbars.length; i++) {
          colorToolbars[i].style.fill = colors.colors.toolbars
        }
        for (let i = 0; i < colorLight.length; i++) {
          colorLight[i].style.fill = colors.colors.light
        }
        if (colors.darkMode) {
          for (let i = 0; i < colorText.length; i++) {
            colorText[i].style.fill = 'white'
          }
        } else {
          for (let i = 0; i < colorText.length; i++) {
            colorText[i].style.fill = colors.colors.secondary
          }
        }
      } else {
        for (let i = 0; i < colorSecondary.length; i++) {
          colorSecondary[i].style.fill = 'var(--v-secondary-base)'
        }
        for (let i = 0; i < colorAccent.length; i++) {
          colorAccent[i].style.fill = 'var(--v-accent-base)'
        }
        for (let i = 0; i < colorToolbars.length; i++) {
          colorToolbars[i].style.fill = 'var(--v-toolbars-base)'
        }
        for (let i = 0; i < colorLight.length; i++) {
          colorLight[i].style.fill = 'var(--v-light-base)'
        }
        if (this.$vuetify.theme.dark) {
          for (let i = 0; i < colorText.length; i++) {
            colorText[i].style.fill = 'white'
          }
        } else {
          for (let i = 0; i < colorText.length; i++) {
            colorText[i].style.fill = 'var(--v-secondary-base)'
          }
        }
      }
    }
  }
}
</script>
<template lang='pug'>
  div
    <svg class='theme-preview' version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 54.7 45.9" style="enable-background:new 0 0 54.7 45.9;" xml:space="preserve">
      <g id="bg">
        <rect width="54.7" height="45.9"/>
      </g>
      <g id="toolbar">
        <rect y="41.4" class="theme-preview-secondary" width="54.7" height="4.6"/>
      </g>
      <g id="icons">
        <rect x="3.1" y="10.3" class="theme-preview-accent" width="3" height="3"/>
        <rect x="3.1" y="2.9" class="theme-preview-accent" width="3" height="3"/>
        <rect x="3.1" y="7.3" class="theme-preview-secondary" width="3" height="1.5"/>
        <rect x="3.1" y="14.8" class="theme-preview-secondary" width="3" height="1.5"/>
      </g>
      <g id="back_window">
        <g>
          <rect x="17.7" y="10.3" class="theme-preview-toolbars" width="23.7" height="19.3"/>
          <rect x="38.5" y="10.3" class="theme-preview-accent" width="3" height="3"/>
        </g>
      </g>
      <g id="shadow">
      <rect x="20.7" y="11.8" class="theme-preview-shadow" width="20.9" height="17.7"/>
      </g>
      <g id="front_window">
        <g id="light">
          <rect x="22.3" y="13.3" class="theme-preview-light" width="25.2" height="20.7"/>
        </g>
        <g id="secondary">
          <rect x="28.2" y="28.1" class="theme-preview-text" width="13.3" height="1.5"/>
          <rect x="28.2" y="23.6" class="theme-preview-text" width="13.3" height="1.5"/>
          <rect x="28.2" y="19.2" class="theme-preview-text" width="13.3" height="1.5"/>
        </g>
        <g id="primary">
          <rect x="22.3" y="13.3" class="theme-preview-toolbars" width="22.1" height="3"/>
        </g>
        <g id="accentcolor">
          <rect x="25.2" y="28.1" class="theme-preview-accent" width="1.5" height="1.5"/>
          <rect x="44.4" y="13.3" class="theme-preview-accent" width="3.1" height="3"/>
          <rect x="25.2" y="19.2" class="theme-preview-accent" width="1.5" height="1.5"/>
          <rect x="25.2" y="23.6" class="theme-preview-accent" width="1.5" height="1.5"/>
        </g>
      </g>
    </svg>
</template>

<style lang='sass' scoped>
  .theme-preview-secondary
    fill: var(--v-secondary-base)
  .theme-preview-accent
    fill: var(--v-accent-base)
  .theme-preview-toolbars
    fill: var(--v-toolbars-base)
  .theme-preview-shadow
    fill: #291814
  .theme-preview-light
    fill: var(--v-light-base)
  .theme-preview-text
    fill: var(--v-secondary-base)
</style>
