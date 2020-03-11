五分钟轻仿一套express源码  https://www.jianshu.com/p/85f8171ee089
express源码解读  https://www.jianshu.com/p/594d169274cf     https://segmentfault.com/a/1190000011049112

├── lib
|   ├── middleware        
|   |   ├── init.js
|   |   └── query.js
├── ├── router        //router组件，负责中间件的插入和链式执行
|   |   ├── index.js
|   |   ├── layer.js
|   |   └── route.js
├── ├── application.js
├── ├── express.js
├── ├── request.js   //提供一些方法丰富 request的实例功能
├── ├── reponse.js
├── ├── util.js
├── └── view.js      //提供模板渲染引擎的封装，通过 res.render() 调用引擎渲染网页
|
└── index.js

