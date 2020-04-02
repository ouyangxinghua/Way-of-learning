https://blog.csdn.net/huang100qi/article/details/80220012   深入理解nodejs中Express的中间件
https://www.jianshu.com/p/797a4e38fe77   Express中间件的原理及实现
https://www.jianshu.com/p/e29bc9126e29   NodeJS+Express搭建RESTful api服务，且配置https服务
https://www.cnblogs.com/jingyingggong/p/9126254.html   利用express搭建一个restful api 服务器
https://www.cnblogs.com/ljbkyBlog/p/8366175.html   NodeJS优缺点
https://blog.csdn.net/qq_39207948/article/details/90023079   fs.readFile和fs.readFileSync的区别
https://www.jianshu.com/p/211b4f76c304   使用Express构建RESTful API
https://www.jianshu.com/p/bca3a00f9a56   createContext(req, res)  koa context分析  
https://blog.csdn.net/guduyibeizi/article/details/105174538  koa源码分析  
https://segmentfault.com/a/1190000019835811    10分钟理解 Node.js koa 源码架构设计
https://github.com/likelight/fork2-myexpress.git   山寨版express源码
https://juejin.im/post/5aa345116fb9a028e52d7217   express中间件原理详解
https://blog.csdn.net/qq_42459742/article/details/87697928   原生node编写api接口
https://zhuanlan.zhihu.com/p/56947560   NodeJS express框架核心原理全揭秘

Express是一个自身功能极简，完全是路由和中间件构成一个web开发框架：从本质上来说，一个Express应用就是在调用各种中间件。
中间件执行的顺序就是你定义的顺序。

<!-- 由koa createContext()源码中的连等操作引起的思考   https://www.cnblogs.com/xxcanghai/p/4998076.html-->
<!-- js内部为了保证赋值语句的正确，会在一条赋值语句执行前，先把所有要赋值的引用地址取出一个副本，再依次赋值。  同一个变量这种，一般不用，只做不同变量连等赋值-->


<!-- 以下为express和koa的区别，原理区别等 -->
https://www.jianshu.com/p/6f7930687835     NodeJS框架Express与Koa
https://segmentfault.com/a/1190000006145114     Koa2的Context对象
https://www.zhihu.com/question/38879363         Express和koa各有啥优缺点?
https://yq.aliyun.com/articles/3062             Node.js框架之express与koa对比分析

koa1(this对象上下文) 用的Generator函数作为异步控制，而koa2(ctx对象上下文)用的async await




<!-- node中间层的意义 https://blog.csdn.net/qq_24147051/article/details/81325238  https://zhuanlan.zhihu.com/p/75843905-->
<!-- https://2014.jsconfchina.com/slides/herman-taobaoweb/index.html#/69  淘宝前后端分离实践 -->
1. node 中间层解决seo问题，首屏渲染问题， 政务项目node版申办就是个典型的node中间层项目
2. 服务器之间内网请求接口速度比流量ajax请求快(信号不好时).  node中间层服务请求比浏览器ajax请求快。
3. 后端出于 性能 和别的原因，提供的接口所返回的 数据格式也许不太适合前端 直接使用。前端所需的 排序功能、 筛选功能 ，以及到了视图层的 页面展现 ，也许都需要 对接口 所提供的 数据进行二次处理 。这些处理虽可以放在前端来进行，但也许数据量一大便会浪费浏览器性能。因而现今，增加node端便是一种良好的解决方案。
4. node是高并发，非堵塞io，而java、php这些后端语言不是，淘宝双11的一秒十几万订单量请求就是node作为中间层实现的，而且用node作为中间层，可以让前后端实现真正意义上的分离，后端只管数据，而前端只管ui和路由，再加上服务器间通信是不存在跨域问题的。一般node作中间层是适合那些io密集型应用的，对于那些请求没这么多的应用，就不需要加node中间层了，前后端只需要Restful API通信就足够了

服务端渲染和客户端渲染的优缺点      https://www.cnblogs.com/shenlan88/p/11063954.html

为什么ajax不利于SEO    https://www.jianshu.com/p/f31825061cbb
