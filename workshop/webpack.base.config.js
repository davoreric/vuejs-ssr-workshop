const path = require('path')
const webpack = require('webpack')
const ExtractTextPlugin = require('extract-text-webpack-plugin')

const isProdduction = process.env.NODE_ENV === 'production'

module.exports = {

  devtool: isProdduction ? false : '#cheap-module-source-map',

  output: {

    path: path.resolve(__dirname, '../dist'),
    publicPath: '/dist/',
    filename: '[name].[chunkhash].js'

  },


    resolve: {

        extensions: ['.js', '.vue', '.json'],
        alias: {

            'vue$': 'vue/dist/vue.esm.js',
            '@': path.resolve('src')

        }

    },

    module: {

        noParse: /es6-promise\.js$/, // avoid webpack shimming process
        rules: [
            
            {
                test: /\.vue$/,
                loader: 'vue-loader',
                options: {
                    extractCSS: process.env.NODE_ENV === 'production'
                }
            },

            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            },

            {
                test: /\.(png|jpg|gif|svg)$/,
                loader: 'url-loader',
                options: {
                    limit: 10000,
                    name: '[name].[ext]?[hash]'
                }
            },

            {
                test: /\.css$/,
                use: isProdduction ? ExtractTextPlugin.extract({
                    use: 'css-loader?minimize',
                    fallback: 'vue-style-loader'
                }) : ['vue-style-loader', 'css-loader']
            }

        ]

    },

    plugins: isProdduction ? [

        new webpack.optimize.ModuleConcatenationPlugin(),

        new ExtractTextPlugin({
            filename: 'common.[chunkhash].css'
        })

    ] : []

}
