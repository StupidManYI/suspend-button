/*** webpack.config.js ***/
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const htmlWebpackPlugin = new HtmlWebpackPlugin({
  template: path.join(__dirname, "examples/src/index.html"),
  filename: "./index.html"
});
module.exports = {
  entry: path.join(__dirname, "examples/src/index.js"),
  output: {
    path: path.join(__dirname, "examples/dist"),
    filename: "index.js"
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        use: "babel-loader",
        exclude: /node_modules/
      },  // 不在 node_modules 中的 css，开启 css modules
      {
        test: /\.css$/,
        exclude: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader,
          {
            loader: 'css-loader',
            options: {
              /* 以前版本是通过 true 开启，相关配置接着写
                modules: true
                localIdentName: '[name]__[local]--[hash:base64:5]'
                */
              // 现在是给 modules 一个 options 对象开启
              modules: {
                // 重新生成的 css 类名
                localIdentName: '[name]__[local]--[hash:base64:5]'
              }
            }
          }
        ]
      },
      // 在 node_modules 中的 css，不开启
      {
        test: /\.css$/,
        include: /node_modules/,
        use: [
          MiniCssExtractPlugin.loader, 'css-loader']
      }, {
        test: /\.(ts|tsx)$/,
        use: 'ts-loader',
        exclude: /node_modules/ //表示node_modules中的tsx文件不做处理
      }, {
        test: /\.svg$/,
        use: [
          {
            loader: 'file-loader'
          },
          {
            loader: 'svgo-loader',
          }
        ]
      }
    ]
  },
  plugins: [htmlWebpackPlugin, new MiniCssExtractPlugin({
    filename: '[name].[hash].css'
  })],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  devServer: {
    port: 3001
  }
};