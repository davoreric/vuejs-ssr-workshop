const webpack = require('webpack')
const merge = require('webpack-merge')
const base = require('./webpack.base.config')
const VueSSRClientPlugin = require('vue-server-renderer/client-plugin')

module.exports = merge(base, {

    entry: {

        app: './src/entry-client.js'

    },

    resolve: {
        
        alias: {
            
            'create-api': './create-api-client.js'

        }

    },

    plugins: [

        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify(process.env.NODE_ENV || 'development'),
            'process.env.VUE_ENV': '"client"'
        }),

        new VueSSRClientPlugin()
    ]

})