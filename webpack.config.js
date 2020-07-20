const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
  entry: "./src/index.js",
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "didyoufind.js",
    publicPath: "build/"
  },
  mode: "production", //todo change to production when ready
  module: {
    rules: [
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /\.css$/,
        use: [
            "style-loader",
            "css-loader"
        ]
      }
    ]
  },
  devServer: {
    contentBase: path.join(__dirname, "build"),
    port: 9000
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: __dirname + "/src/index.html",
      filename: "index.html",
      inject: "body"
    })
  ]
}
module.exports = config;
