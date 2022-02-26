<script>
export default {
  name: 'VirusSpinner',
  props: {
    virus: { required: false, type: String, default: 'bloater' }
  }
}
</script>
<template lang='pug'>
  div.virus-spinner
    img(alt='skull-virus', src="@/assets/images/icons/bloater-spinner.png", height='30px')
</template>

<style lang='sass' scoped>
.virus-spinner
  width: 30px
  height: 30px
  img
    animation: circle-rotate .75s both linear infinite
@keyframes circle-rotate
  from
    transform: rotate(0deg)
  to
    transform: rotate(360deg)

</style>
