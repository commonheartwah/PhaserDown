var path = require('path')
var filePath = require('./src/path')
var webpack = require('webpack')
var CleanWebpackPlugin = require('clean-webpack-plugin')
var HtmlWebpackPlugin = require('html-webpack-plugin')
var CopyWebpackPlugin = require('copy-webpack-plugin')

// Phaser webpack config
var phaserModule = path.join(__dirname, '/node_modules/phaser-ce/')
var phaser = path.join(phaserModule, 'build/custom/phaser-split.js')
var pixi = path.join(phaserModule, 'build/custom/pixi.js')
var p2 = path.join(phaserModule, 'build/custom/p2.js')

// 公共代码 config
var screenConfig = path.join(__dirname, 'src/components/screenConfig.js')

var definePlugin = new webpack.DefinePlugin({
  __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV || 'false'))
})
var arr = filePath.packPath.split('/')[2]
console.log(arr)
module.exports = {
  entry: {
    app: [
      'babel-polyfill',
      path.resolve(__dirname, filePath.packPath + '/main.js')

    ],
    vendor: ['pixi', 'p2', 'phaser', 'webfontloader','screenConfig']

  },
  output: {
    path: path.resolve(__dirname, 'pack/' + arr + '/js'),
    publicPath: './js/',
    filename: '[name]-[hash].bundle.js'
  },
  plugins: [
    definePlugin,
    new CleanWebpackPlugin(['pack'+arr]),
    new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),
    new webpack.optimize.UglifyJsPlugin({
      drop_console: true,
      minimize: true,
      output: {
        comments: false
      }
    }),
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      // chunkName='common',
      filename: '[name].bundle.js',
      minChunks:4
    }),
    new CopyWebpackPlugin([
      {
        from: path.resolve(__dirname, 'assets/' + arr + '/**'),
        to: path.resolve(__dirname, 'pack/' + arr)
      },
      {
        from: path.resolve(__dirname, 'assets/common/**'),
        to: path.resolve(__dirname, 'pack/' + arr)
      }
    ]),
    new HtmlWebpackPlugin({
      filename: path.resolve(__dirname, 'pack/' + arr + '/index.html'),
      template: './src/index.html',
      chunks: [
        'vendor', 'app'
      ],
      chunksSortMode: 'manual',
      minify: {
        removeAttributeQuotes: true,
        collapseWhitespace: true,
        html5: true,
        minifyCSS: true,
        minifyJS: true,
        minifyURLs: true,
        removeComments: true,
        removeEmptyAttributes: true
      },
      hash: true
    })
  ],
  module: {
    rules: [
      { test: /\.js$/, use: ['babel-loader'], include: path.join(__dirname, 'src') },
      { test: /pixi\.js/, use: ['expose-loader?PIXI'] },
      { test: /phaser-split\.js$/, use: ['expose-loader?Phaser'] },
      { test: /p2\.js/, use: ['expose-loader?p2'] }
    ]
  },
  node: {
    fs: 'empty',
    net: 'empty',
    tls: 'empty'
  },
  resolve: {
    alias: {
      'phaser': phaser,
      'pixi': pixi,
      'p2': p2,
      'screenConfig':screenConfig
    }
  }
}
