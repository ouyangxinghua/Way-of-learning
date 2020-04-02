## 3th middleWare
扩展 ctx
koa-views 
ctx.render()

引入 koa-bodyParser 解析提交过来的数据
{name, password, repeatpass, avatar}
保证 取值的时候 存在 body 属性

.post('/signin')
ctx.request.body
ctx.body 就是 ctx.response.body 的别名而已。 ctx.body = ctx.response.body

koa它是Web框架，专注HTTP生命周期即同意请求到响应结束，CTX指的HTTP生命周期的上下文