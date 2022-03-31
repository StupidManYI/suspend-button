/*** webpack.config.js ***/
const path = require('path');
const HtmlWebpackPlugin = require("html-webpack-plugin");


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
      // 在 node_modules 中的 css，不开启
      {
        test: /\.(css)$/,
        use: ["style-loader", {
          loader: 'css-loader',
          options: {
            modules: true,
          }
        }],
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
  plugins: [htmlWebpackPlugin],
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx', '.json']
  },
  devServer: {
    port: 3001
  }
};