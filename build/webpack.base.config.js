const path = require('path');
const webpack = require('webpack');
const cleanWebpackPlugin = require('clean-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const museUiThemePath = path.join(
    __dirname,
    '../node_modules',
    'muse-ui',
    'src/styles/themes/variables/default.less'
)

module.exports = {
    mode: "development",
    output: {
        path: path.resolve(__dirname, '../dist/'),
        filename: '[name].[hash:8].dashboard.js',
        chunkFilename: '[name].[hash:8].dashboard.js'
    },
    resolve: {
        //后缀名自动补全
        extensions: ['.mjs', '.js', '.vue', '.less', '.css', '.graphql'],
    },
    module: {
        rules: [
            {
                test: /\.mjs$/,
                include: /node_modules/,
                type: "javascript/auto",
            },              
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.(js)$/,
                exclude: [/node_modules/],
                type: 'javascript/auto',
                use: [
                    'babel-loader'
                ]
            },
            {
                test: /\.(graphql|gql)$/,
                exclude: /node_modules/,
                loader: 'graphql-tag/loader'
            },
            {
                test: /\.(less|css)$/,
                use: [
                    'vue-style-loader',
                    {
                        loader: 'css-loader',
                        options: {
                            importLoaders: 2
                        }
                    },
                    'postcss-loader',
                    {
                        loader: 'less-loader',
                        options: {
                            globalVars: {
                              museUiTheme: `'${museUiThemePath}'`,
                            }
                        }
                    }
                ]
            },
            {
                test: /\.(png|jpg|gif|jpeg)$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240
                        }
                    }
                ]
            },
            {
                test:  /\.(ttf|eot|svg|woff)(\?\S*)*$/,
                use: [
                    {
                        loader: 'url-loader',
                        options: {
                            limit: 10240
                        }
                    }
                ]
            }
        ]
    },
    plugins: [
        new VueLoaderPlugin()
    ]
}