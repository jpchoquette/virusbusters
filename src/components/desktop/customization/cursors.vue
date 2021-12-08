<script>
import UpdatePreferences from '@/mixins/updatePreferences.js'
import AnimatedCursors from '@/mixins/animatedCursors.js'

export default {
  name: 'Cursors',
  components: {
  },
  data () {
    return {
    }
  },
  mixins: [UpdatePreferences, AnimatedCursors],
  mounted () {
  },
  computed: {
    cursorStyles: {
      set (val) { this.$store.commit('Customizations/setCursorStyles', val) },
      get () { return this.$store.state.Customizations.cursorStyles }
    }
  },
  methods: {
    selectCursor (index, id, ownership) {
      if (this.$store.state.Customizations.activeCursor && this.$store.state.Customizations.activeCursor.data && this.$store.state.Customizations.activeCursor.data.template_id === id) {
        console.log('cursor already active')
      } else if (ownership) {
        if (id) {
          const foundCursor = this.$store.state.Customizations.cursorStyles.findIndex((cursor) => cursor.template_id === id)
          if (foundCursor >= 0) {
            console.log('change cursor', this.cursorStyles[index])
            const prefs = {
              owner: this.$store.state.User.userProfile,
              data: this.cursorStyles[index]
            }
            this.updatePreferences('cursor', prefs)
          } else {
            this.updatePreferences('cursor', null)
          }
        } else {
          this.updatePreferences('cursor', null)
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
        const ownedTemplate = this.$store.state.Buster.ownedCursorTemplates.findIndex((temp) => temp.template.template_id === id)
        return ownedTemplate >= 0
      }
    }
  }
}
</script>
<template lang='pug'>
  .window-content
    div.header__wrapper
      v-btn(@click='$emit("goBack")', outlined) < All settings
      div.header-title Cursors!
    //- pre {{$store.state.Buster.ownedCursorTemplates}}
    div.list-preview
      //- div.preview-image__wrapper
        div.preview-image.primary
          span cursor image
      v-list.w-100
        v-list-item(@click='selectCursor(0, null, true)', :class='{"selected-item" : !$store.state.Customizations.activeCursor}')
          v-list-item-avatar(size='40', tile)
            v-img(src='/base-cursor.png')
          v-list-item-content
            v-list-item-title Default cursor
        v-divider()

        template(v-for='(cursor, index) in $store.state.Customizations.cursorStyles')
          //- pre {{cursor}}
          //- pre {{checkOwnership(cursor.template_id)}}
          v-list-item(@click='(cursor.disabled || (!checkOwnership(cursor.template_id) && !cursor.public)) ? "" : selectCursor(index, cursor.template_id, (cursor.public || checkOwnership(cursor.template_id)))', :class='{"missing-template" : false ,"selected-item" : ($store.state.Customizations.activeCursor && $store.state.Customizations.activeCursor.data && ($store.state.Customizations.activeCursor.data.template_id === cursor.template_id))}', :disabled='cursor.disabled')
            v-list-item-avatar(size='40', tile)
              v-img(:src='cursor.image')
              template(v-if='cursor.images && cursor.images.length', v-for='(image, index) in cursor.images')
                img.debug-images(:src='image')

            v-list-item-content
              v-list-item-title
                div
                  span.i.f6(v-if='cursor.public') Free!
                  span.i.f6(v-if='cursor.disabled') Coming soon!
                  span.red--text.i.f6(v-if='(!checkOwnership(cursor.template_id) && !cursor.public && !cursor.disabled)') Not owned
                div {{cursor.name}}
            v-list-item-action(v-if='(!checkOwnership(cursor.template_id) && !cursor.public && !cursor.disabled)')
              v-btn(small, color='accent', depressed, @click='goToMarket(cursor.template_id)') Find on market

          v-divider(v-if='index < $store.state.Customizations.cursorStyles.length - 1')
    //- div.avatars__wrapper
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
  .debug-images
    position: absolute
    z-index: -1
    opacity: 0
    pointer-events: none
</style>
