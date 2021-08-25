<script>
export default {
  name: 'App',
  data: () => ({
    //
  })
}
</script>

<template lang='pug'>
v-app(dark)
  v-main
    router-view
</template>
<style>
  @import './assets/styles/vendors/locomotiveScroll.css';
  /* @import './assets/styles/main.scss'; */
</style>
<style lang='sass'>
  html
    background-color: var(--v-secondary-base)
    // overflow-y: auto !important
</style>
