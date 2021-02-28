const defaultConfig = require("@wordpress/scripts/config/webpack.config");

const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

const APP_DIR = path.resolve(__dirname, "assets/js/");

module.exports = {
	...defaultConfig,
	entry: {
		book: `${APP_DIR}/admin/book.js`,
		blocks: `${APP_DIR}/admin/blocks/blocks.js`,
	},
	output: {
		...defaultConfig.output,
		path: path.resolve(process.cwd(), "assets/js/admin/build"),
	},
	plugins: [
		...defaultConfig.plugins,
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// all options are optional
			filename: "[name].css",
			chunkFilename: "[id].css",
			ignoreOrder: false, // Enable to remove warnings about conflicting order
		}),
	],
	module: {
		...defaultConfig.module,
		rules: [
			...defaultConfig.module.rules,
			{
				test: /\.scss$/,
				use: [
					{
						loader: "style-loader",
					},
					MiniCssExtractPlugin.loader,
					{
						loader: "css-loader",
					},
					{
						loader: "postcss-loader",
					},
					{
						loader: "sass-loader",
						options: {
							sourceMap: true,
						},
					},
				],
			},
			{
				test: /\.(png|svg|jpg|gif)$/,
				use: ["file-loader"],
			},
		],
	},
};
