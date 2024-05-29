const { defineConfig } = require('@vue/cli-service')

module.exports = defineConfig({
  transpileDependencies: true,
  css: {
    loaderOptions: {
      sass: {
        additionalData: `@import "@/assets/scss/global.scss";`,
      },
    },
  },
  chainWebpack: config => {
    config.module
      .rule('scss')
      .oneOf('vue')
      .use('sass-loader')
      .loader('sass-loader')
      .tap(options => ({
        ...options,
        additionalData: `@import "@/assets/scss/global.scss";`,
      }));
  },
});