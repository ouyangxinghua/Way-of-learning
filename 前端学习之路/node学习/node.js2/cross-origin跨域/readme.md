## 跨域
浏览器的安全策略
协议 域名 端口 有一个不一致的时候就存在跨域
https://www.abc.com/a  https://www.abc.com/b 协议 域名 端口相同 所有不跨域

## cors
cross origin resource share 跨域资源共享
1. 一个标准， 规定了一些 http 的首部字段 有些首部可以让服务器允许哪些网站可以访问。
2. 规定, 如果是非简单请求, 浏览器会先发一个预检请求, 从服务端知道是否允许跨域, 如果允许 才会发出正式的请求。
3. 非简单请求 简单请求

## jsonp 原理
1. script 标签 可以跨域
2. 加载进来的内容会被当做 js 执行
3. 后端 先获取到 前端发出的 callback 在callback里面插入 自己想要返回的内容
4. 前端 拿到返回的内容 当做 js 执行
```
getUser(data){
      console.log('data', data)
    }  
```
5. 预先定义好一个函数
6. 缺点: 只能 get 请求
7. 写一个 promise 风格的jsonp函数
8. param = {type: 'man', age: 18}
jsonp(url, param = {})
.then(res => {
  console.log(res)
})

1. 一个全局的方法
2. 插入一个 script 标签， 根据方法名, param 拼接 url
3. 根据 js 的加载情况 判断 请求的成功与否 返回数据
4. script 标签上面 有事件

## iframe
可以引入一个跨域的html文件,

1. 引入 和 后端 接口同源的一个 iframe
2. 该 iframe 不存在跨域 可以任意请求
3. 和 iframe 通信 postMessage 触发message事件

## 
同一个页面的里面的 所有iframe 都会共享一个属性就是 window.name


## server 后端
public目录是 koaStatic 映射过 /url
## static 前端 
static live-server
前后端 通信 fe-iframe 文件 收到后端的结果 middle 后端 static iframe

window.name

1. 上一步一样
2. iframe 请求结果放在一个共享的 window.name 上面 
3. fe-iframe.html 得到请求的结果
4. 请求完成之后 先跳到一个第三方页面 执行定义在 fe-iframe.html 里面的回调

# 代理proxy
webpack-dev-server

1. 反向代理: live-server --proxy=/api:http://localhost:3000/api/
live-server --proxy=/api:http://localhost:9090/api/
live-server --proxy=/api:http://233.31.31.3:3000/api/
无论代理到哪个 都能拿到结果
对于客户端来说 最终请求的地方是未知的。

2. 正向代理
对于服务端来说 客户端是未知的。
