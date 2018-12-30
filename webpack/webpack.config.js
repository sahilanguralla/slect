const webpack = require('webpack');
const CircularDependencyPlugin = require('circular-dependency-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const cssnano = require('cssnano');

const GitRevisionPlugin = require('git-revision-webpack-plugin');
const gitRevisionPlugin = new GitRevisionPlugin({
    lightweightTags: true
});

let supportedBrowsers = ['> 0.01%', 'android >= 2'];

const libraryName = 'Slect';

const config = {
    name: 'slect',
    entry: ['src/index.ts'],
    output: {
        filename: `${libraryName.toLowerCase()}.min.js`,
        library: libraryName,
        libraryExport: 'default',
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    resolve: {
        extensions: ['.tsx', '.ts', '.js']
    },
    module: {
        rules: [
            {
                test: /\.(less|css)$/,
                use: [
                    { loader: MiniCssExtractPlugin.loader },
                    { loader: 'css-loader' },
                    {
                        loader: 'postcss-loader',
                        options: {
                            plugins: () => [autoprefixer, cssnano]
                        }
                    },
                    { loader: 'less-loader' }
                ]
            },
            {
                test: /\.tsx?$/,
                loader: 'ts-loader'
            },
            {
                test: /\.(ttf|woff|svg|eot)$/,
                use: [
                    {
                        loader: 'file-loader',
                        query: {
                            publicPath: '../assets/fonts',
                            outputPath: 'assets/fonts',
                            name: '[hash].[ext]'
                        }
                    }
                ]
            },
            {
                test: /\.js$/,
                exclude: /(node_modules|bower_components)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                'env',
                                {
                                    targets: {
                                        browsers: supportedBrowsers
                                    }
                                }
                            ],
                            'stage-0'
                        ]
                    }
                }
            }
        ]
    },
    plugins: [
        new MiniCssExtractPlugin({
            // Options similar to the same options in webpackOptions.output
            // both options are optional
            filename: 'css/[name].[hash].css',
            chunkFilename: 'css/[id].[hash].css'
        }),
        new CircularDependencyPlugin({
            // exclude detection of files based on a RegExp
            exclude: /node_modules|bower_components/,
            // add errors to webpack instead of warnings
            failOnError: true
        }),
        new webpack.DefinePlugin({
            'process.env.RELEASE': JSON.stringify(gitRevisionPlugin.version())
        })
    ]
};

module.exports = config;
