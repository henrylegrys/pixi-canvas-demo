const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
    mode: 'development',
    devtool: 'eval-source-map',
    entry: './src/entry.ts',
    output: {
        filename: '[name].[chunkhash].entry.js',
        chunkFilename: "[name].[chunkhash].chunk.js",
        assetModuleFilename: "[hash].[name].[ext]",
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: 'pixi.js tests'
        }),
    ],
    resolve: {
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            },
            {
                test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2|ico)$/i,
                type: "asset/resource",
            }
        ]
    }
};