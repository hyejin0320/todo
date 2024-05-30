const { defineConfig } = require('@vue/cli-service')
const path = require('path');

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
  devServer: {
    proxy: 'http://localhost:8085', //backend에서 지정한 포트
  },
  indexPath: '../../templates/vue/index.html', //fontend vue가 빌드된 파일을 Backend의 src/main/resouerces/templates 하위에 위치하도록 변경
  publicPath: 'vue', //js, css와 같은 외부 참조 경로 변경
  outputDir: path.resolve(__dirname, '../backend/todo/src/main/resources/static/vue'), //vue 프로젝트 빌드 경로
});