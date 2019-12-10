const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const webpack = require("webpack");

module.exports = {
    mode: 'production',
    entry: './src/index.tsx',
    devtool: 'source-map',
    devServer: {
        contentBase: 'dist',
    },
    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: 'ts-loader',
                exclude: /node_modules/,
            }
        ],
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js'],
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'dist'),
    },
    plugins: [new HtmlWebpackPlugin({
        title: 'Anthony Umfer'
    }), new webpack.DefinePlugin({
        'process.env.SOCKET_SERVER': JSON.stringify('https://rdr-pma-git.alteredco.com')
    })]
};