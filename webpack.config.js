const webpack = require('webpack')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const Dotenv = require('dotenv-webpack')

const destinationDirectory = 'assets'

module.exports = {
  entry: {
    all: './assets/javascripts/all.js',
    anchors: './assets/javascripts/anchors.js'
  },
  output: {
    path: __dirname + '/.tmp/dist',
    filename: `${destinationDirectory}/javascripts/[name].js`
  },
  module: {
    rules: [
      {
        test: /\.s(a|c)ss$/,
        use: [MiniCssExtractPlugin.loader, 'css-loader', 'sass-loader']
      },
      {
        test: /\.(ttf|eot|woff|woff2)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: `${destinationDirectory}/fonts/`,
            publicPath: '../fonts/'
          }
        }
      },
      {
        test: /\.(svg|png|gif|jpg|jpeg)$/,
        use: {
          loader: 'file-loader',
          options: {
            name: '[name].[ext]',
            outputPath: `${destinationDirectory}/images/`,
            publicPath: '../images/'
          }
        }
      }
    ]
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: `${destinationDirectory}/stylesheets/all.css`
    }),
    new Dotenv({
      systemvars: true
    })
  ]
}
