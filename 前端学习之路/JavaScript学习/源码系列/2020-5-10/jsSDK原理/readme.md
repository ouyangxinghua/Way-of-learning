http://www.fly63.com/article/detial/1267   h5 与原生 app 交互的原理
https://juejin.im/post/5dfdd2d46fb9a0160053456f   JSBridge原理浅析与实践
https://juejin.im/post/5abca877f265da238155b6bc   JSBridge的原理
https://www.jianshu.com/p/2ec3f06d6087   Android中JSBridge的原理与实现

RPC是指远程过程调用，也就是说两台服务器A，B，一个应用部署在A服务器上，想要调用B服务器上应用提供的函数/方法，
由于不在一个内存空间，不能直接调用，需要通过网络来表达调用的语义和传达调用的数据。

Android中的JSBridge是H5与Native通信的桥梁，其作用是实现H5与Native间的双向通信。
1. H5 -> native
（1）注入API  （由 app 向 h5 注入一个全局 js 对象，然后在 h5 直接访问这个对象） JSSDK也是类似的原理  类似于RPC调用
（2）拦截 URL SCHEME （由 h5 发起一个自定义协议请求，app 拦截这个请求后，再由 app 调用 h5 中的回调函数） 比如： sdk://action?params 
然后由 h5 发起一个自定义协议请求，比如 location.href = 'sdk://double?value=10'  类似于JSONP

2. native -> H5
因为 app 是宿主，可以直接访问 h5，所以这种调用比较简单，就是在 h5 中曝露一些全局对象（包括方法），然后在原生 app 中调用这些对象。
Android调H5—原生通过loadUrl来调用H5，  4.4及以上还可以通过evaluateJavascript调用
WebView.loadUrl("javascript:function()");