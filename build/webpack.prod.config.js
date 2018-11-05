const path = require('path');
const webpack = require('webpack');
const htmlWebpackPlugin = require('html-webpack-plugin');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base.config.js');
const config = require('../config/index.js')

module.exports = merge(baseConfig, {
    mode: "production",
    entry: {
        app: ['./src/app.js']
    },
    output: {
        publicPath: '//s0.oeino.cn/' + config.qiniu.keyPrefix
    },
    plugins: [
        new webpack.BannerPlugin('build:' + new Date().getFullYear() + '年' + parseInt(new Date().getMonth() + 1, 10) + '月' + new Date().getDate() + '日' + new Date().getHours() + '点' + new Date().getMinutes() + '分' + '编译'),
        new htmlWebpackPlugin({
            template: 'index.html',
            filename: 'dashboard.html'
        }),
        new cleanWebpackPlugin('dist/', {
            // 项目根目录
            root: path.resolve(__dirname, '../'),
            verbose: true
        })
    ]
});