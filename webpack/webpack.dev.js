let { merge } = require('webpack-merge')
let common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'development',
  devtool: 'eval-cheap-module-source-map', // 开启source map 便于控制台调试
  cache: {
    type: 'filesystem', // 使用文件缓存
  },
  devServer: {
    historyApiFallback: true, // 当使用 [HTML5 History API] 时，任意的 `404` 响应被替代为 `index.html`
    open: false, // 自动打开浏览器
    hot: true, // 热更新
    compress: true, // 代码压缩
    port: 9000, // 启动端口
  },
})
