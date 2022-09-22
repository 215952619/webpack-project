const path = require('path')
const chalk = require('chalk')
const progressBarWebpackPlugin = require('progress-bar-webpack-plugin')
const htmlWebpackPlugin = require('html-webpack-plugin')
const { CleanWebpackPlugin } = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')

console.log('chalk---------------', chalk)

module.exports = {
  entry: './src/index.js',
  resolve: {
    alias: {
      '@': path.resolve(__dirname, '../src'),
    },
    mainFiles: ['index', 'main'],
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        use: 'babel-loader',
      },
      {
        test: /\.(c|le|sa|sc)ss?$/,
        use: [
          { loader: MiniCssExtractPlugin.loader },
          'css-loader',
          'postcss-loader',
          {
            loader: 'less-loader',
            options: { lessOptions: { javascriptEnabled: true } },
          },
          {
            loader: 'resolve-url-loader',
            // options: { keepQuery: true },
          },
          {
            loader: 'sass-loader',
            options: { sourceMap: true },
          },
        ],
      },
      {
        test: /\.(png|jpe?g|svg|gif)$/,
        type: 'asset/inline',
      },
      {
        test: /\.(eot|ttf|woff|woff2)$/,
        type: 'asset/resource',
        generator: {
          filename: 'fonts/[hash][ext][query]',
        },
      },
    ],
  },
  plugins: [
    new htmlWebpackPlugin({
      filename: 'index.html',
      template: path.resolve(__dirname, '../public/index.html'),
    }),
    new CleanWebpackPlugin(),
    new MiniCssExtractPlugin({
      filename: 'css/[name]-[contenthash:8].css',
    }),
    new progressBarWebpackPlugin({
      format: `  :msg [:bar] ${chalk.green.bold(':percent')} ( :elapsed s)`,
    }),
  ],
}
