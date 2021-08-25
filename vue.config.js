module.exports = {
  publicPath: '/',
  css: {
    loaderOptions: {
      scss: {
        prependData: `
          @import "@/styles/variables.scss"
          `
      }
    }
  },
  transpileDependencies: [
    'vuetify'
  ]
}
