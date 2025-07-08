const webpack = require("webpack"),
	MiniCssExtractPlugin = require("mini-css-extract-plugin"),
	{ CleanWebpackPlugin } = require("clean-webpack-plugin"),
	{ merge } = require("webpack-merge"),
	common = require("./webpack.config"),
	path = require("path"),
	p = (p) => path.join(__dirname, "../", p || ""),
	TerserPlugin = require("terser-webpack-plugin"),
	CssMinimizerPlugin = require("css-minimizer-webpack-plugin");

const config = common({ rootCssLoader: MiniCssExtractPlugin.loader });

module.exports = merge(config, {
	mode: "production",

	output: {
		path: p("build"),
		publicPath: "auto",
		filename: "[name].ltc.[contenthash].js",
		chunkFilename: "[name].ltc.[contenthash].js",
		hashDigestLength: 6,
	},

	optimization: {
		minimizer: [
			new TerserPlugin({
				// Link to options - https://swc.rs/docs/config-js-minify
				terserOptions: {},
			}),
			new CssMinimizerPlugin(),
		],
		concatenateModules: true,
		minimize: true,
	},

	plugins: [
		new webpack.DefinePlugin({
			"process.env.NODE_ENV": JSON.stringify("production"),
		}),
		new MiniCssExtractPlugin({
			filename: "[name].ltc.[contenthash].css",
			chunkFilename: "[name].ltc.[contenthash].css",
		}),
		new CleanWebpackPlugin({
			dry: false,
			dangerouslyAllowCleanPatternsOutsideProject: true,
		}),
	],
});
