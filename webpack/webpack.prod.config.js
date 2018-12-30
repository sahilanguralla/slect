const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.js');

const CleanWebpackPlugin = require('clean-webpack-plugin');

let baseDir = `./dist/`;

const config = merge(baseConfig.config, {
    mode: 'production',
    devtool: 'source-map',
    output: {
        path: path.resolve(__dirname, `../${baseDir}`)
    },
    plugins: [
        new CleanWebpackPlugin([baseDir], {
            root: path.resolve(__dirname, '..')
        })
    ]
});
module.exports = config;
