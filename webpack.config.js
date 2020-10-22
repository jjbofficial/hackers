var path = require("path");
var HtmlWebpackPlugin = require("html-webpack-plugin");
var MiniCssExtractPlugin = require("mini-css-extract-plugin");

 
// minimizers
var TerserWebpackPlugin = require("terser-webpack-plugin");
var OptimizeCssWebpackPlugin = require("optimize-css-assets-webpack-plugin");

// change this to your prefered location
var prodPath = "/var/www/html/prod/hackers";

module.exports = {
  optimization : {
    minimizer : [
      new TerserWebpackPlugin({}),
      new OptimizeCssWebpackPlugin({})
    ]
  },

  entry : "./assets/js/hackers.js",

  output : {
    filename : "assets/js/[name].bundle.js",
    path : path.resolve(prodPath)
  },

  plugins : [
    new HtmlWebpackPlugin({
      template : "index.html",
      filename : "index.html"
    }),
    new MiniCssExtractPlugin({
      filename : "assets/css/[name].bundle.css"
    })
  ],

  module : {
    rules : [
      {
        test : /\.css$/,
        use : [
          {
            loader : MiniCssExtractPlugin.loader,
            options : {hmr : false}
          },
          {
            loader : 'css-loader',
            options : {importLoaders : 1}
          },
          "postcss-loader"
        ]
      },

      {
        test :  /\.(png|jpe?g|gif)$/,
        use : [
          {
            loader : "file-loader",
            options : {
              name : "/assets/images/[name].[ext]"
            }
          },
        ]
      }

    ]
  }

}