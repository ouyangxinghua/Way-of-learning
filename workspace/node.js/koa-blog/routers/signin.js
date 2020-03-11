const router = require('koa-router')();

// 使用路由处理get请求
router.get('/signin',  async (ctx) => {
  // ctx.body = 'signin page';
  await ctx.render('signin');
})
// 使用路由处理post请求
router.post('/signin', async (ctx) => {
  const { name, password, repeatPass} = ctx.request.body;
  console.log( name, password, repeatPass)
  ctx.body = {code: 200};
})
module.exports = router;