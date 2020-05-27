const config = require('./webpack.config.mobile.base');
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = (env) => merge(config, {
    mode: "production",
    devtool: "none",
    output: {
        chunkFilename: '[name].js'
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(env)
        })
    ]
});
