const config = require('./webpack.config.mobile.base');
const merge = require('webpack-merge');
const webpack = require('webpack');

module.exports = (env) => merge(config, {
    mode: "development",
    devtool: "none",
    output: {
        chunkFilename: '[name].js',
        publicPath: env.script === "local"
            ? "file://fatcoupon/"
            : "https://dpmgitk7lw7ve.cloudfront.net/scripts/"
    },
    plugins: [
        new webpack.DefinePlugin({
            'process.env': JSON.stringify(env)
        })
    ],
    watch: true
});
