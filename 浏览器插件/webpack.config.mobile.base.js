const path = require("path");
const fs = require('fs');
const webpack = require('webpack');
const moment = require("moment");
const XhrEvalChunkPlugin = require('./webpack/xhr-eval-chunk-webpack-plugin');

// Picking store connectors entries by dir
let storeConnectorEntries = {};
let storeConnectorSourcesDir = "./src/coupon-applying/stores";
let storeConnectorTargetDir = "./";
if (!fs.existsSync(storeConnectorSourcesDir)) {
  fs.mkdirSync(storeConnectorSourcesDir);
}
let files = fs.readdirSync(storeConnectorSourcesDir);
for (let fileName of files) {
  if (fileName.endsWith(".ts")) {
    storeConnectorEntries[`${storeConnectorTargetDir}/${fileName.split(".")[0]}`] = `${storeConnectorSourcesDir}/${fileName}`;
  }
}

module.exports = {
  entry: {
    ...storeConnectorEntries
  },

  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist", "mobile"),
  },

  optimization: {
    namedModules: true,
    namedChunks: true,
    splitChunks: {
      chunks: 'async',
      maxAsyncRequests: 1,
    }
  },

  resolve: {
    extensions: [".webpack.js", ".web.js", ".ts", ".tsx", ".js"],
    alias: {
      jquery: "jquery/src/jquery",
      jQuery: "jquery/src/jquery",
      $:      "jquery/src/jquery",
    }
  },

  module: {
    rules: [
      {
        loader: "source-map-loader",
        test: /\.js$/,
        enforce: "pre"
      },
      {
        loader: "awesome-typescript-loader",
        test: /\.tsx?$/,
        exclude: /node_modules|src_mobile/
      }
    ],
  },

  plugins: [
    new XhrEvalChunkPlugin(),

    new webpack.BannerPlugin({
      banner: (module) => {
        // here we can add some info about build in output file
        let strings = [];
        strings[1] = `/*  File: ${module.basename} `;
        strings[2] = `/*  Build time: ${moment().format("HH:mm:ss DD.MM.YY")} `;

        let maxSymbols = Math.max(strings[1].length, strings[2].length) + 3;
        strings[0] = strings[3] = `/${new Array(maxSymbols - 2).fill("*").join("")}/`;

        strings[1] += new Array(maxSymbols - 2 - strings[1].length).fill(" ").join("") + "*/";
        strings[2] += new Array(maxSymbols - 2 - strings[2].length).fill(" ").join("") + "*/";
        return strings.join("\n") + "\n";
      },
      raw: true
    })
  ]
};
