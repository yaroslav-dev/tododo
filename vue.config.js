module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/tododo/'
    : '/',
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    name: 'Tododo',
    themeColor: '#00ACC1',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#00ACC1',
    msTileColor: '#00ACC1'
  }
}