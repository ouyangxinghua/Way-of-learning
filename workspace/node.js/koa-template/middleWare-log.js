const Koa = require('koa')

const app = new Koa()
// 这个中间件负责计算时间间隔
app.use(async (ctx, next) =>{
    const start = Date.now();
    await next()
    const end = Date.now();
    const diff = end - start;
    // 响应头里面 writeHead Content-type
    ctx.set('X-Response-Time', `${diff}ms`);
    console.log(`spend ${diff}ms`)
})
// 这个中间件负责响应给用户看到的 response
app.use(async (ctx) => {
    ctx.body = 'hello Koa';
})
app.listen(3001);