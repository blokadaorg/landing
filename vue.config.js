const webpack = require('webpack');

module.exports = {
  publicPath: './',
  configureWebpack: {
    // Set up all the aliases we use in our app.
    plugins: [
      new webpack.optimize.LimitChunkCountPlugin({
        maxChunks: 6
      })
    ]
  },

  pwa: {
    name: 'Blokada',
    themeColor: '#121212',
    msTileColor: '#121212',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: '#121212',
    iconPaths: {
      favicon32: 'favicon.png',
      favicon16: 'favicon.png',
    }
  },

  devServer: {
    disableHostCheck: true
  },

  css: {
    // Enable CSS source maps.
    sourceMap: process.env.NODE_ENV !== 'production'
  },

  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: true
    },
    prerenderSpa: {
      registry: undefined,
      renderRoutes: [
        '/'
      ],
      useRenderEvent: true,
      headless: true,
      onlyProduction: true
    }
  }
};
