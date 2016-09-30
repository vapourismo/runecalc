module.exports = {
	entry: "./src/index.jsx",
	output: {
		filename: "./index.js"
	},
	module: {
		loaders: [
			{
				test: /\.jsx$/,
				exclude: /node_modules/,
				loader: "babel",
				query: {
					presets: ["react", "es2015"],
					plugins: ["transform-runtime"]
				}
			}
		]
	}
};
