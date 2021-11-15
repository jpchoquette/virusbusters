<script>
// import WaxLogin from '@/mixins/waxLogin.js'
import VueResizable from 'vue-resizable'
import Wallpapers from '@/components/desktop/customization/wallpapers.vue'
import Cursors from '@/components/desktop/customization/cursors.vue'
// import Themes from '@/components/desktop/customization/themes.vue'

export default {
  name: 'CustomizationWindow',
  components: {
    VueResizable,
    Wallpapers,
    Cursors
    // Themes
  },
  data () {
    return {
      pageView: null,
      settings: [
        { name: 'Wallpapers', value: 'wallpapers', icon: '🖼️' },
        { name: 'Cursors', value: 'cursors', disabled: true, icon: '🖱️' },
        { name: 'Themes', value: 'themes', disabled: true, icon: '🎨' }
      ],
      cursorToggleTest: false
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
    }
  },
  methods: {
    closeWindow () {
      this.customizationWindow = false
    },
    resetPrefs () {
      this.$emit('resetPrefs')
    },
    updateCursor (type) {
      // this.cursorToggleTest = !this.cursorToggleTest
      this.$emit('updateCursor', null, type)
    },
    clearCursor () {
      this.$emit('clearCursor')
    }
  }
}
</script>
<template lang='pug'>
  vue-resizable(:top="$store.state.App.mobileTemplate ? '10%' : '10%'", :left="$store.state.App.mobileTemplate ? '10%' : '22%'", :width="$store.state.App.mobileTemplate ? '80vw' : '600px'", :height="$store.state.App.mobileTemplate ? '70vh' : '450px'", :min-height="250", :min-width="300", drag-selector=".window-top-bar", :class='{"active-window" : $store.state.Desktop.activeWindow === "customization"}')
    div.customization-window.desktop-window(:class='{"active-window" : $store.state.Desktop.activeWindow === "customization"}', @mousedown='activeWindow = "customization"')
      //- LOGIN WAX
      div.window-top-bar
        div.window-title Desktop Customizer
        div.flex-grow-1
        v-btn.white--text(@click='closeWindow', tile, color='accent', fab, depressed) X
      div.window-content
        transition(name='custom-classes-transition', enter-active-class='animate__animated animate__fadeIn animate__faster', leave-active-class='animate__animated animate__fadeOut animate__faster', mode='out-in')

          div(v-if='!pageView')
            v-list(color='transparent')
              template(v-for='(setting, index) in settings')
                v-list-item.pointer(@click='pageView = setting.value', :disabled='setting.disabled')
                  v-list-item-avatar {{setting.icon}}
                  v-list-item-content
                    v-list-item-title {{setting.name}} {{setting.disabled ? "(Coming soon!)" : ""}}
                v-divider
            //- v-btn(@click='pageView = "wallpapers"') Wallpapers
            //- v-btn(@click='pageView = "cursors"') Cursors
          wallpapers(v-else-if='pageView === "wallpapers"', @goBack='pageView = null')
          //- @changeWP='$emit("changeWP")'
          //- cursors(v-else-if='pageView === "cursors"', @goBack='pageView = null')
          //- themes(@changeWP='$emit("changeWP")')

        //- div.tc.ma3
          v-btn(@click='updateCursor("ghost")') Test cursor ghost
          v-btn(@click='updateCursor("dust")') Test cursor dust
          v-btn(@click='updateCursor("sprinkles")') Test cursor sprinkles
          v-btn(@click='clearCursor()') Clear cursor

          v-btn(@click='resetPrefs()' color='accent', text, outlined) Reset my preferences
        //- div.avatars__wrapper
          //- pre {{$store.state.User.userProfile}}
          //- pre {{$cookies.get('buster')}}
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
    .v-list-item
      padding: 0
      min-height: 36px
      .v-list-item__content
        padding: 8px 0
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
