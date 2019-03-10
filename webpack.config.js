const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const serveStatic = require("serve-static");

module.exports = {
  mode: "development",
  entry: {
    bundle: ["@babel/polyfill", "./src"]
  },
  module: {
    rules: [
      {
        test: /\.(js)$/,
        use: "babel-loader"
      },
      {
        test: /\.(scss|css)$/,
        use: ["style-loader", "css-loader", "sass-loader"]
      }
    ]
  },
  devServer: {
    filename: "bundle.js",
    port: 3000,
    publicPath: "/",
    compress: true,
    historyApiFallback: true,
    before(app) {
      app.use("/data", serveStatic("data"));
    }
  },
  resolve: { extensions: ["*", ".js", ".json"] },
  plugins: [
    new webpack.ProgressPlugin(),
    new HtmlWebpackPlugin({
      template: "src/index.html"
    })
  ]
};
