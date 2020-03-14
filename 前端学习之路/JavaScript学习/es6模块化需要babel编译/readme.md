npm install --save-dev @babel/plugin-transform-async-to-generator
npm install --save-dev babel-preset-es2015

https://juejin.im/post/59b9ffa8f265da06710d8e89 babel最全面详解

https://www.cnblogs.com/tugenhua0707/p/9452471.html     理解 babel之配置文件.babelrc 基本配置项

https://www.jianshu.com/p/344f56d19abe    Node构建之使用Babel转换ES7

https://www.jianshu.com/p/74cb6203c39f    Error: Cannot find module '@babel/core’   
https://www.bbsmax.com/A/QV5ZPxR4zy/   babel-loader和babel-core版本不对应所产生的

https://www.cnblogs.com/chris-oil/p/5717544.html    如何区分Babel中的stage-0,stage-1,stage-2以及stage-3（一）

https://www.cnblogs.com/kidsitcn/p/11487666.html    babel plugin和presets是什么，怎么用?

https://zhuanlan.zhihu.com/p/43249121       一口（很长的）气了解 babel

https://www.jianshu.com/p/cbd48919a0cc   babel 7 的使用的个人理解

https://python.freelycode.com/contribution/detail/715    https://www.jianshu.com/p/000c2670672b   babel-preset-env作用  

https://www.cnblogs.com/dapengFly/p/9876915.html   Babel：plugin、preset的区别与使用

1. Babel提供babel-cli工具，用于命令行转码。

2. babel-core 的作用是把 js 代码分析成 ast ，方便各个插件分析语法进行相应的处理。有些新语法在低版本 js 中是不存在的，如箭头函数，rest 参数，函数默认值等，这种语言层面的不兼容只能通过将代码转为 ast，分析其语法后再转为低版本 js。

3. babel-preset-env的工作方法和babel-preset-latest很像，但是它可以让你指定一个环境且仅仅转译在那个环境中缺少的特性。而不用对浏览器已经支持的新特性去做编译。这样可以避免做一些不必要的操作。

4. Babel默认只转换新的javascript语法，而不转换新的API，比如 Iterator, Generator, Set, Maps, Proxy, Reflect,Symbol,Promise 等全局对象。以及一些在全局对象上的方法(比如 Object.assign)都不会转码。
比如说，ES6在Array对象上新增了Array.form方法，Babel就不会转码这个方法，如果想让这个方法运行，必须使用 babel-polyfill来转换等。
因此：babel-polyfill和babel-runtime就是为了解决新的API与这种全局对象或全局对象方法不足的问题，因此可以使用这两个插件可以转换的。

Plugin与Preset执行顺序
可以同时使用多个Plugin和Preset，此时，它们的执行顺序非常重要。

1. 先执行完所有Plugin，再执行Preset。
2. 多个Plugin，按照声明次序顺序执行。
3. 多个Preset，按照声明次序逆序执行。