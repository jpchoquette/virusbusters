<script>
// import Blender from '@/mixins/blender.js'
import VueResizable from 'vue-resizable'
export default {
  name: 'BlenderWindow',
  components: {
    VueResizable
  },
  data () {
    return {
      recipeDetailView: false
    }
  },
  // mixins: [Blender],
  mounted () {
  },
  computed: {
    activeWindow: {
      set (val) { this.$store.commit('Desktop/setActiveWindow', val) },
      get () { return this.$store.state.Desktop.activeWindow }
    },
    blenderWindow: {
      set (val) { this.$store.commit('Desktop/setBlenderWindow', val) },
      get () { return this.$store.state.Desktop.blenderWindow }
    }
  },
  methods: {
    closeWindow () {
      this.blenderWindow = false
    },
    loadRecipe () {
      this.recipeDetailView = true
    },
    clearRecipe () {
      this.recipeDetailView = false
    }
  }
}

</script>
<template lang='pug'>
  vue-resizable(:top="$store.state.App.mobileTemplate ? '10%' : '30%'", :left="$store.state.App.mobileTemplate ? '10%' : '30%'", :width="$store.state.App.mobileTemplate ? '80vw' : '600px'", :height="$store.state.App.mobileTemplate ? '70vh' : '500px'", :min-height="250", :min-width="250", drag-selector=".window-top-bar", :class='{"active-window" : $store.state.Desktop.activeWindow === "blender"}')
    div.program-window.desktop-window(:class='{"active-window" : $store.state.Desktop.activeWindow === "blender"}', @mousedown='activeWindow = "blender"')
      div.window-top-bar(:class='{"active-gradient" : ($store.state.Customizations.activeTheme && $store.state.Customizations.activeTheme.data.gradients)}')
        div.window-title Blender.exe
        div.flex-grow-1
        v-btn.close-button.secondary--text(@click='closeWindow', tile, color='accent', fab, depressed) X
      div.window-content.blender
        .empty-content__wrapper
          .title-placeholder.white--text WARNING!
          .description-placeholder This program is currently under maintenance. Please come back later.
        //- template
          div.blender-top
            h1 Blender!
          div.blender__main-content
            transition(name='custom-classes-transition', enter-active-class='animate__animated animate__fadeIn animate__faster', leave-active-class='animate__animated animate__fadeOut animate__faster', mode='out-in')
              div.blends__showcase(v-if='!recipeDetailView')
                template(v-for='(n, index) in 20')
                  .blend-card(@click='loadRecipe()')
                    .blend-card__content
                      div Blend {{index + 1}}
              div.blend-details(v-else-if='recipeDetailView')
                v-btn(@click='clearRecipe()') Clear recipe
                div RECIPE TITLE
            //- template
              v-btn(@click='blendNfts(["1099587229151", "1099587228066"], "385578")') BLEND ME DADDY
              div.red--text(v-if='blendSuccess') BLENDED AVC SUCCES
              div.green--text(v-if='blendError') BLEND NOT WORKING
            //- iframe.w-100.h-100(src='https://neftyblocks.com/c/virusbusters/blends', title='Neftyblocks Virus Busters Page')
          div.blender-bottom
</template>
<style lang='sass'>
  .program-window.desktop-window
    background-color: var(--v-toolbars-base)
    .blender
      padding: 0
      display: flex
      flex-direction: column
      // background-color: var(--v-light-base)
      overflow-y: auto
      .blender-top
        background-color: red
        width: 100%
        height: 80px
        min-height: 80px
        text-align: center
        font-family: $display-font
      .blender__main-content
        // background-color: yellow
        width: 100%
        flex-grow: 1
        padding: 20px
        // height: 100px
        .blends__showcase
          display: flex
          flex-wrap: wrap
          justify-content: center
          .blend-card
            width: 120px
            height: 120px
            border-radius: 5px
            background-color: lightgray
            margin: 5px
            box-shadow: $box-shadow
            .blend-card__content
              display: flex
              justify-content: center
              align-items: center
              height: 100%
      .blender-bottom
        background-color: pink
        width: 100%
        height: 80px
        min-height: 80px
</style>
