const path = require('path');
const merge = require('webpack-merge');
const TerserJSPlugin = require('terser-webpack-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');
const baseConfig = require('./webpack.config.js');

const baseDir = `./dist/`;

const config = merge(baseConfig, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, `../${baseDir}`)
    },
    optimization: {
        minimizer: [new TerserJSPlugin({}), new OptimizeCSSAssetsPlugin({})]
    }
});
module.exports = config;
