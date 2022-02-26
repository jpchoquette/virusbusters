<script>
import TextScrambler from 'text-scrambler'

export default {
  name: 'DescriptionSection',
  components: {
    TextScrambler
  },
  data: () => ({
    textValue: 'Bonjour les amis'
  }),
  methods: {
    updateValue (text) {
      this.$nextTick(() => {
        this.textValue = text
      })
    }
  }
}
</script>
<template lang='pug'>
  section.description-section(data-scroll-section, data-scroll-section-id='section0', data-scroll-persistent)
    div.section-container(id='scroll-direction0')
      .block-wrapper()
        .section-content.light.black--text.flex.items-center
          div.description-content
            v-hover(v-slot:default="{hover}", close-delay='1000')
              p.f2.b
                text-scrambler(
                  :text="hover ? 'W3lcome to the headqu4rters of V1rus Bus73rs, a top of the l1ne cy8ersecuri7y 4gency.' : 'Welcome to the headquarters of Virus Busters, a top of the line cybersecurity agency.'"
                )
            v-hover(v-slot:default="{hover}", close-delay='1000')
              p.f3.w-70.mt3
                text-scrambler(
                  :text="hover ? '?? ???? ?? ??? ???????? ?? ???? ??? ??? ??? ?? ??? ???????? ???????? ?? ???? ???????. ???????? ??????? ???????? ???? ???? ????? ??? ??? ?????? ? ?????? ????? ????.' : `It will be our pleasure to help you get rid of any unwanted activity on your devices. Computer stopped working? That free movie was not really a movie? We're here.`"
                )
            div.columns__wrapper
              div.content-column
                div.column-icon
                  img.mh3(alt='warning', src="../assets/images/icons/thumbs-icon.svg", height='50px')
                div.column-title Trusted experts
                v-hover(v-slot:default="{hover}", close-delay='1000')
                  text-scrambler(
                    :text="hover ? 'Our team of experts wi##$A@/////agnose and cwesdf your WWWW///devices, in the*&8756ÀÀÀÀ respect of ysdfsdfivacy.' : 'Our team of experts will diagnose and clean your devices, in the respect of your privacy.'"
                  )
              div.content-column
                div.column-icon
                  img.mh3(alt='warning', src="../assets/images/icons/shield-icon.svg", height='50px')
                div.column-title Specialized tools
                v-hover(v-slot:default="{hover}", close-delay='1000')
                  text-scrambler(
                    :text="hover ? 'ERROR THIS TEXT COULD NOT BE FOUND ON THE SERVER. ERROR CODE 404' : 'Our top of the line tools will fix even the tougest threats in no time.'"
                  )
              div.content-column
                div.column-icon
                  img.mh3(alt='warning', src="../assets/images/icons/course-icon.svg", height='50px')
                div.column-title Malware prevention courses
                v-hover(v-slot:default="{hover}", close-delay='1000')
                  text-scrambler(
                    :text="hover ? 'We offer a ERROR of courses ####ip you wi********th the best tool for a UNsafe journey on the web.' : 'We offer a serie of courses to equip you with the best tool for a safe journey on the web.'"
                  )
</template>
<style lang='sass'>
  .description-section
    .description-content
      text-align: center
      display: flex
      flex-direction: column
      justify-content: center
      align-items: center
      margin: 0 auto
      max-width: 1200px
      padding: 80px $responsive-gutter
    .columns__wrapper
      display: flex
      flex-wrap: wrap
      max-width: 800px
      .content-column
        padding: 20px
        width: 33%
        min-width: 200px
        font-family: $pixel-font
        min-height: 400px
        .column-icon
          padding: 20px
        .column-title
          color: var(--v-secondary-base)
          font-size: 20px
          font-weight: bold
          font-family: $pixel-font
          margin-bottom: 20px
      @media all and (max-width: $medium)
        flex-direction: column
        .content-column
          width: 100%
          min-height: 200px

</style>
