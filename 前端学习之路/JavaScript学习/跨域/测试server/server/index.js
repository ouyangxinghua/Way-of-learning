const Koa = require('koa');
const app = new Koa()
const koaStatic = require('koa-static');
const path = require('path');
const router = require('koa-router')();
// res.set方法可以设置头部
// res set
app.use(async (ctx, next) => {
  // 允许哪个域名请求
  ctx.set('Access-Control-Allow-Origin', "*")
  // 服务器支持的头部 x-custom
  // ctx.set('Access-Control-Allow-Headers', 'X-custom,content-type');
  // 支持的方法
  ctx.set("Access-Control-Allow-Methods", "POST,GET");
  // 允许 携带 cookie
  // 设置为 允许的时候 Access-Control-Allow-origin 需要是一个具体的域名
  // 不能是 *  如果不携带cookies的话，就可以设置为 *
  // ctx.set("Access-Control-Allow-Credentials", true);
  // ctx.cookies.set(
  //   'cid', 
  //   'xinghua',
  //   {
  //     domain: 'localhost',  // 写cookie所在的域名
  //     path: '/',       // 写cookie所在的路径
  //     maxAge: 10 * 60 * 1000, // cookie有效时长
  //     expires: new Date('2020-04-30'),  // cookie失效时间
  //     httpOnly: true,  // 是否只用于http请求中获取
  //     overwrite: true  // 是否允许重写
  //   }
  // );
  await next();
})
router.get('/cors', async function (ctx) {
  // let a = ctx.cookies.get('cid')
  // console.log('cookie', a, ctx.request.origin);
  ctx.body = [
    { title: 'node.js 入门到精通', createTime: '2018-12-12' },
    { title: 'php 入门到精通', createTime: '2018-11-11' },
  ]
});
router.get('/api/user', async (ctx) => {
  const callback = ctx.request.query.callback;
  const user = {
    name: 'abc', age: 18
  }
  ctx.body = `${callback}(${JSON.stringify(user)})`;
});
router.get('/get', async (ctx) => {
  const data = {
    name: '欧阳兴华', age: 22
  }
  // console.log(ctx)
  ctx.status = 200;
  ctx.response.body = data;
  // console.log(ctx)
})
// jsonp跨域测试接口
router.get('/jsonp', async (ctx) => {
  let callback = ctx.request.query.callback;
  console.log('callback', callback)
  const data = {
    name: '欧阳兴华', age: 22
  }
  ctx.cookies.set('ouyang','xinghua',{httpOnly: false,overwrite: false})
  ctx.body = `${callback}(${JSON.stringify(data)})`;
})

app
  .use(router.routes())
  .use(router.allowedMethods());
app.listen(4000, () => {
  console.log('server is running 4000');
});
