const merge = require('webpack-merge');
require('es6-promise').polyfill();
require('isomorphic-fetch');
require('array-flat-polyfill');
const addInfoAboutBuildTime = require('./webpack/add-info-about-build-time');

const TerserPlugin = require('terser-webpack-plugin');
const JavaScriptObfuscator = require('webpack-obfuscator');

const config = require('./webpack.config.ext.base');

module.exports = (env) => merge(config(env), {
    mode: "production",
    devtool: "none",

    entry: {
        "stores/modules": "./src/coupon-applying/ModulesImporter.ts"
    },

    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                terserOptions: {
                    parse: {
                        ecma: 8
                    },
                    output: {
                        ecma: 8,
                        comments: false,
                        preamble: addInfoAboutBuildTime(),
                        ascii_only: true
                    },
                    mangle: {
                        keep_classnames: true,
                        keep_fnames: true,
                        reserved: [
                            "WrappedWindow",
                            "StoreConnector",
                        ]
                    }
                },
                extractComments: false,
                parallel: true,
                cache: true,
                sourceMap: false,
            }),
        ],
    },

    plugins: [
        new JavaScriptObfuscator({
            rotateUnicodeArray: true
        }, [
            "js/fatcoupon.js"
        ])
    ],
});
