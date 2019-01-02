const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.config.js');

const CopyWebpackPlugin = require('copy-webpack-plugin');
const HTMLWebpackPlugin = require('html-webpack-plugin');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer')
    .BundleAnalyzerPlugin;
const args = process.argv.slice(2);

const baseDir = './dist/dev';

const config = merge(baseConfig, {
    mode: 'development',
    devtool: 'eval-source-map',
    output: {
        path: path.join(__dirname, `../${baseDir}`),
        publicPath: '/'
    },
    devServer: {
        open: true,
        host: '0.0.0.0',
        port: 5000,
        contentBase: baseDir,
        compress: true,
        historyApiFallback: true,
        overlay: true
    },
    plugins: [
        new CopyWebpackPlugin([{ from: `./demo/**/*`, to: `./`, flatten: true }]),
        new HTMLWebpackPlugin({
            template: `./demo/demo.html`,
            filename: './index.html',
            favicon: './favicon.png'
        })
    ]
});

if (args.includes('--analyze') || args.includes('-A')) {
    config.plugins.push(new BundleAnalyzerPlugin());
}

module.exports = config;
