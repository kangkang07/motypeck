const path = require('path');
module.exports = {
    mode:'production',
	entry: {
		main:'./src/main.ts',
	},
	output: {
		filename: 'index.js',
		path: path.resolve(__dirname, './dist'),
		libraryTarget: "commonjs",
    },
    externals: {
        'ts-morph': 'ts-morph',
        'mockjs': 'mockjs',
        path:'path'
    },
	module:{
		rules: [
			{
				test: /\.ts?/,
				exclude: /node_modules/,
				loader: ["babel-loader","ts-loader"],
			}
		]
	}
};