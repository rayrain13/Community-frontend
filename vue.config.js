module.exports = {
  publicPath: '',
  outputDir: 'dist',
  assetsDir: 'static',
  productionSourceMap: false,
  devServer: {
   proxy : {
    "/api" : {
      target : "https://localhost:7001", //服务器地址
      changeOrigin: true,  //是跨域请求
      ws: true,
      pathRewrite: {
        '^/api': '/api'
      }
    }
   }
  }
}
