yarn add koa koa-router -S 
yarn add koa-session -S
yarn add koa-static -S
 -S表示--save
放在"dependencies": {} 上
执行 npm i 或者 yarn add 就会在 json 文件里面寻找各个依赖并安装
本地开发 安装的 node_modules
服务器上面 只需要写的代码 不需要 上传node_modules 

## why
http 是无状态的
客户端和服务器 再次请求的时候 知道客户端是谁

## cookie  存在客户端的
js 操作: document.cookie
后端: 响应头
Set-Cookie: name1=value1; path=/; httponly
浏览器检查所有存储的 cookie , 把符合当前作用范围的cookie 放在 http 请求头发给服务器。
cookie 有可能被用户禁用。
内容:
name 
value
path: 规定 cookie 生效的路径
/  所有的路径都会拿到cookie
/user  /user以及/user/xxx下的
/user/xxx  /user/xxx以及/user/xxx/xxx....
httponly: true false
  true 就不能通过 js 获取 cookie
max-age:在 几秒 过后过期

作用范围:
path
domain域名
用途: 会话状态管理, 保存用户的个性化设置。

## session
全部靠后台语言实现,
有很多个 session
很多个用户 sessionID  保存在服务器端

## koa 第三方中间件  koa-router  koa-session  koa-views  koa-static 等
ctx req + res  
ctx: {
  req,
  res,
}
koa-views ejs
往ctx 上面扩展东西  80%
ctx: {
  req,
  res,
  render:() => {
  }
}
调用 提供的 render()

## localStorge sessionStorge  cookie  session