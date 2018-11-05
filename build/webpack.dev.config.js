const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = merge(baseConfig, {
    mode: "development",
    entry: {
        app: ['./src/app.js', 'webpack-hot-middleware/client?path=/dashboard/__hmr&reload=true']
    },
    output: {
        publicPath: '/dashboard/',
    },
    optimization: {
        splitChunks: {
            chunks: 'initial',
            minChunks: 5,
            /* cacheGroups: {
                vendor: {
                    priority: 1,
                    chunks: 'all',
                    name: 'vendor',
                    test: /(vue|vue-loader|muse-ui|axios|core-js)/
                }
            } */
        }
    },
    plugins: [
        // new BundleAnalyzerPlugin(),
        new webpack.BannerPlugin('dev middleware' + new Date().getFullYear() + '年' + parseInt(new Date().getMonth() + 1, 10) + '月' + new Date().getDate() + '日' + new Date().getHours() + '点' + new Date().getMinutes() + '分' + '编译'),
        new htmlWebpackPlugin({
            template: 'index.html',
            filename: 'index.html'
        }),
        new webpack.HotModuleReplacementPlugin()
    ]
});