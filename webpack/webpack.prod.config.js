const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.js');
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const CleanWebpackPlugin = require('clean-webpack-plugin');

let baseDir = `./dist/`;

const config = merge(baseConfig, {
    mode: 'production',
    output: {
        path: path.resolve(__dirname, `../${baseDir}`)
    },
    plugins: [
        new CleanWebpackPlugin([baseDir], {
            root: path.resolve(__dirname, '..')
        })
    ],
    optimization: {
        minimize: true,
        minimizer: [
            new UglifyJsPlugin({
                include: /\.min\.js$/
            }),
            new OptimizeCSSAssetsPlugin({
                assetNameRegExp: /\.min\.css$/,
                cssProcessorPluginOptions: {
                    preset: [
                        'default',
                        { discardComments: { removeAll: true } }
                    ]
                }
            })
        ]
    }
});
module.exports = config;
