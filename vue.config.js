module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/tododo/'
    : '/',
  "transpileDependencies": [
    "vuetify"
  ],
  pwa: {
    name: 'Tododo',
    themeColor: '#204051',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#204051',
    msTileColor: '#204051'
  }
}