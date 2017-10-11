const path = require('path');
const webpack = require('webpack');

module.exports = {

    entry: './src/app.js',

    output: {

        path: path.resolve(__dirname, './dist'),
        publicPath: '/dist/',
        filename: 'bundle.js'
    
    },

    module: {

        rules: [
            {
                test: /\.vue$/,
                loader: 'vue-loader'
            },
            {
                test: /\.js$/,
                loader: 'babel-loader',
                exclude: /node_modules/
            }
        ]

    },
    
    resolve: {
        alias: {
            'vue$': 'vue/dist/vue.esm.js'
        }
    },

    devServer: {
        historyApiFallback: true,
        noInfo: true
    }

}