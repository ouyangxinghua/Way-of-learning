const webpack = require('webpack');
const fs = require('fs');
const path = require('path');
const XhrEvalChunkPlugin = require('./webpack/xhr-eval-chunk-webpack-plugin');
const addInfoAboutBuildTime = require('./webpack/add-info-about-build-time');

// Picking store connectors entries by dir
let storeConnectorEntries = {};
let storeConnectorSourcesDir = "./src/coupon-applying/stores";
if (!fs.existsSync(storeConnectorSourcesDir)) {
  fs.mkdirSync(storeConnectorSourcesDir);
}
let files = fs.readdirSync(storeConnectorSourcesDir);
for (let fileName of files) {
  if (fileName.endsWith(".ts")) {
    storeConnectorEntries[`${fileName.split(".")[0]}`] = `${storeConnectorSourcesDir}/${fileName}`;
  }
}

module.exports = (env) => {
  let publicPath = "";
  if (env.target === "extension") {
    if (env.script === "local") {
      publicPath = "chrome-extension://nefpialbilfbjkjcgmgbpmnhlikdoana/stores/";
    } else {
      publicPath = env.mode === "development"
          ? "https://dpmgitk7lw7ve.cloudfront.net/scripts/"
          : "https://d3itvsmwj0r86k.cloudfront.net/scripts/";
    }
  }

  let connectorsPath = env.script === "local"
    ? path.resolve(__dirname, "dist", `extension-${env.mode}-${env.script}`, "stores")
    : path.resolve(__dirname, "dist", `extension-${env.mode}-${env.script}-stores`);

  return {
    mode: env.mode,
    entry: {
      "../non-obfuscated-modules/Helpers": "./src/helpers/Helpers.ts",
      "../non-obfuscated-modules/UIHelpers": "./src/helpers/UIHelpers.ts",
      "../non-obfuscated-modules/Cookies": "./src/helpers/Cookies.ts",
      "../non-obfuscated-modules/StoreConnectorHelpers": "./src/coupon-applying/StoreConnectorHelpers.ts",
      ...storeConnectorEntries,
    },

    output: {
      filename: "[name].js",
      chunkFilename: "[name].js",
      path: connectorsPath,
      publicPath: publicPath
    },

    devtool: "inline-source-map",

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
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

      new XhrEvalChunkPlugin(),

      new webpack.BannerPlugin({
        banner: addInfoAboutBuildTime,
        raw: true
      }),

      new webpack.DefinePlugin({
        process: {
          env: JSON.stringify(env)
        }
      })
    ],

    watch: true
  };
};
