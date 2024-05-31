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
  outputDir: '../backend/public/', //배포 파일 위치
  devServer:{ // api 요청을 어디에서 처리할 지 설정
    proxy:{
      '/api':{
        target: 'http://localhost:3000/api',
        changeOrigin: true,
        pathRewrite:{
          '^/api': '',
        }
      }
    }
  },
});