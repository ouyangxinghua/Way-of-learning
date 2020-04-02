## event
前端 click之类的
后端 http((req,res) => {
  res.on('data')
  res.on('end')
}) 
onClick
onDbClick
订阅发布者模式。

1.订阅发布模式(Subscribe/Publish)
订阅发布模式定义了一种一对多的依赖关系,在Node中EventEmitter 对象上开放了一个可以用于监听的on(eventName,callback)函数,允许将一个或多个函数绑定到对应的事件上。当 EventEmitter 对象触发一个事件时,所有绑定在该事件上的函数都被同步地调用!这种模式在node中大量被使用,例如：后续文章中我们会说到的流等,那现在我们就来一步步实现Node中的events模块！
