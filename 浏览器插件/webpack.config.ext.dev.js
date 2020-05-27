const config = require('./webpack.config.ext.base');
const merge = require('webpack-merge');
require('es6-promise').polyfill();
require('isomorphic-fetch');
require('array-flat-polyfill');

module.exports = (env) => {
    return merge(config(env), {

    });
};
