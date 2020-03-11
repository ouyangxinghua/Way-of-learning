# webpack用法总结

1. 常用插件plugin的作用

compression-webpack-plugin： 生产环境时可选择让代码压缩gzip.
html-webpack-plugin : 生成index.html 并自动注入打包后的js css 等
webpack.DefinePlugin： 可以生成配置常量。编译时就有的常量。
extract-text-webpack-plugin： 提取使用文件的css 组成一个或多个css 文件。
webpack.optimize.CommonsChunkPlugin： 让多个出口文件组成一个文件
webpack-dev-server: 开发时使用，静态服务器，并且有热替换等功能。
uglifyjs-webpack-plugin： 删除警告，压缩代码等。

2. 