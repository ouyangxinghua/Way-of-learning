const moment = require("moment");
const path = require("path");
const merge = require('webpack-merge');
require('es6-promise').polyfill();
require('isomorphic-fetch');
require('array-flat-polyfill');

const fs = require('fs');

const config = require('./webpack.config.ext.prod');

const ZipFilesPlugin = require('webpack-zip-files-plugin');

const manifest = require('./src/manifest.json');

const outputDir = './builds';
if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir);
}

module.exports = (env) => merge(config(env), {
    output: {
        path: path.resolve(__dirname, "dist", `extension-chrome-store`),
    },
    plugins: [
        new ZipFilesPlugin({
            entries: [
                {src: './dist/extension-chrome-store', dist: '/'},
            ],
            output: `${outputDir}/${manifest.name}-${manifest.version} ${moment().format("MMDD HHmm")}-chrome-store`,
            format: 'zip',
        })
    ]
});
