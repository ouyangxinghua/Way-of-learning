const webpack = require('webpack');
const path = require('path');
const CopyPlugin = require("copy-webpack-plugin");
const addInfoAboutBuildTime = require('./webpack/add-info-about-build-time');

module.exports = (env) => {
  return {
    mode: env.mode,

    entry: {
      "js/background": "./src/background.ts",
      "js/ui": "./src/ui.tsx",
      "js/ext-loader": "./src/ext-loader.js",
      "js/fatcoupon": "./src/fatcoupon.js"
    },

    devtool: env.mode === "development"
      ? 'eval-source-map'
      : "none",

    output: {
      filename: "[name].js",
      path: path.resolve(__dirname, "dist", `extension-${env.mode}-${env.script}`),
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
        },
        {
          test: /\.s(a|c)ss$/,
          use: [{
            loader: "css-to-string-loader",
          }, {
            loader: 'css-loader', // translates CSS into CommonJS modules
          }, {
            loader: 'sass-loader' // compiles SASS to CSS
          }]
        }
      ],
    },

    plugins: [
      new webpack.IgnorePlugin(/^\.\/locale$/, /moment$/),

      new CopyPlugin([
        {
          from: "src/assets",
          to: "./assets"
        },
        {
          from: "src/fatcoupon.js",
          to: "./js/fatcoupon.js",
        },
        {
          from: "src/manifest.json",
          to: "./",
          transform: async (content, path) => {
            let manifest = JSON.parse(content.toString());

            manifest["permissions"] = [
              ...manifest["permissions"],

              env.mode === "development"
                  ? "https://dpmgitk7lw7ve.cloudfront.net/api/*"
                  : "https://d3itvsmwj0r86k.cloudfront.net/api/*",
            ];

            // adding CSP to allow eval
            manifest["content_security_policy"] = "script-src 'self' 'unsafe-eval'; object-src 'self'";

            if (!env.chromestore) {
              manifest["key"] = "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsfvX/yz8+F2ZzJ5ik0EzHYzcfFCH06w5gE3Dvt7o8A2DSaNZ/lwExAD53yvsFaRG5xDELIW6no5qM1lF5EyRQoc3k/RvosRuQi6/LAHbb2MXr9aLMi7ANtjKXFIIqNmXGUPtTQ7esGzd8QLGdjXDOWHon0IqNsr+5d1xQc765bznwjKUfTV/Q60b73/or7UFbAXXT1qsNS5TBRYhq9e5YDBnAvm+hH7kjLxIN75A3OJq5D9ETGXmwrqNnFDZnbme+r8gw6vwKqeGJHJYF7coZp9RmzbpkRP9utZLKV0lUGphA1Jid+4BD+jUKPmtNqwpJzfyL6l5xPZMY7Kkl23neQIDAQAB";
            }

            return JSON.stringify(manifest);
          }
        }
      ]),

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

    watch: true,
  }
};
