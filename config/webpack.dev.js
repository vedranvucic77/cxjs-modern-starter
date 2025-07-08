const webpack = require("webpack"),
  { merge } = require("webpack-merge"),
  common = require("./webpack.config"),
  path = require("path"),
  devCerts = require("office-addin-dev-certs");

process.env.TAILWIND_MODE = "watch";

module.exports = async () => {
  let ssl = await devCerts.getHttpsServerOptions();

  let config = common({ tailwindOptions: {}, rootCssLoader: "style-loader" });

  return merge(config, {
    mode: "development",

    devtool: "eval",

    output: {
      publicPath: "/",
    },

    snapshot: {
      managedPaths: ["/node_modules"],
      immutablePaths: ["/node_modules"],
    },

    plugins: [
      new webpack.DefinePlugin({
        "process.env.NODE_ENV": JSON.stringify("development"),
      }),
    ],

    devServer: {
      hot: true,
      port: 3000,
      historyApiFallback: true,
      static: path.join(__dirname, "../public"),
    },
  });
};
