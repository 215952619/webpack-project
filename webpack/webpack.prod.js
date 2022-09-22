const path = require('path')
const TerserPlugin = require('terser-webpack-plugin')
const { merge } = require('webpack-merge')
const CssMinimizerWebpackPlugin = require('css-minimizer-webpack-plugin')
const { FileListPlugin } = require('./assets.plugin.js')
let common = require('./webpack.common')

module.exports = merge(common, {
  mode: 'production',
  output: {
    path: path.resolve(__dirname, '../dist'),
    // [chunkhash:8] - 本应用打包输出文件级别的更新
    filename: '[name]-[chunkhash:8].js',
  },
  plugins: [new FileListPlugin()],
  optimization: {
    minimizer: [
      // js 压缩
      new TerserPlugin({
        terserOptions: {
          parse: {
            ecma: 8,
          },
          compress: {
            ecma: 5,
            warnings: false,
            comparisons: false,
            inline: 2,
          },
          mangle: {
            safari10: true,
          },
          output: {
            ecma: 5,
            comments: false,
            ascii_only: true,
          },
        },
      }),
      // css 压缩
      new CssMinimizerWebpackPlugin(),
    ],
  },
})
