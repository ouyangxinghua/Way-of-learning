HTTP 协议  HyperText Transfer Protocol:超文本传输协议  request response
状态码: HTTP响应(response)中包含状态码

当浏览者访问一个网页时，浏览者的浏览器会向网页所在服务器发出请求。当浏览器接收并显示网页前，
此网页所在的服务器会返回一个包含HTTP状态码的信息头（server header）用以响应浏览器的请求。

##requset对象：
req.headers
req.rawHeaders
req.httpVersion
req.method
req.url
##response对象：
res.setHeader()
res.end()
res.wtire()
res.statusCode
res.statusMessage
res.writeHead()　


浏览器 代理 proxy
1XX 请求正在处理, 继续等待
2xx 请求已经成功处理掉了  200  OK 
3xx 重定向, 需要进一步的操作以完成请求 Location
4xx 用户客户端出现的错误(比如地址错了) 未授权限 受限资源  404 Not Found
5xx 服务器端出现错误

301 永久跳转,
用户A请求 www.xiaomi.com  www.mi.com
告诉蜘蛛
www.xiaomi.com/a.html  红米手机
废弃了, 发送一个301 去www.mi.com/a.html找

3xx 区别, 永久跳转, 告诉蜘蛛把记录更新掉

301 可以在改变状态码， 不变， 来展示理解
localhost:3000   301 永久跳转 
再次访问， 浏览器有缓存， 不需要在走服务器，

302 临时移动。与301类似。但资源只是临时被移动。客户端应继续使用原有URI  不会告诉蜘蛛 或在前端缓存