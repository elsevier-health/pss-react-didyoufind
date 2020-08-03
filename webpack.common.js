const path = require("path");

module.exports = {
  entry: {
    didyoufind: "./src/index.js",
  },
  module: {
    rules: [
      {
        test: /\.(eot|woff|woff2|svg|ttf)([\?]?.*)$/,
        loader: "file-loader"
      },
      {
        test: /\.js$/,
        use: "babel-loader",
        exclude: /node_modules/
      },
      {
        test: /(\.s?css)$/,
        use: [
          'style-loader',
          'css-loader',
          'sass-loader'
        ]
      }
    ]
  },
  output: {
    filename: 'didyoufind.js',
    path: path.resolve(__dirname, "build"),
  }
};
