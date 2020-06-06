# webpack用法总结
https://blog.csdn.net/csm0912/article/details/88795369 
https://www.cnblogs.com/weilantiankong/p/7832823.html   Rollup 与 webpack的区别

# loader 和 plugin的区别
（1）loader用于对模块源码的转换,主要用来处理非javascript模块 如：.vue文件 .scss文件 Typescript文件等等
（2）目的在于解决loader无法实现的其他事，从打包优化和压缩，到重新定义环境变量。plugin是一个扩展器，它丰富了webpack本身，
针对是loader结束后，webpack打包的整个过程，它并不直接操作文件，而是基于事件机制工作，会监听webpack打包过程中的某些节点，执行广泛的任务


1. 常用插件plugin的作用

compression-webpack-plugin： 生产环境时可选择让代码压缩gzip.
html-webpack-plugin : 生成index.html 并自动注入打包后的js css 等
webpack.DefinePlugin： 可以生成配置常量。编译时就有的常量。
extract-text-webpack-plugin： 提取使用文件的css 组成一个或多个css 文件。
webpack.optimize.CommonsChunkPlugin： 让多个出口文件组成一个文件
webpack-dev-server: 开发时使用，静态服务器，并且有热替换等功能。
uglifyjs-webpack-plugin： 删除警告，压缩代码等。

2. 