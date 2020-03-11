- MVVM  前端新贵
  Model 数据 page({data:{
      legends:[]
  }})
  View 视图
  WXML 
  VM {{}}  wx:for ...

- MVC  经典的Web开发模式
  Model => SQL 
  View => 静态页面
  Controller => 路由，

- WebServer 软件程序
Web服务器硬件运行WebServer程序的
ip http协议
http://127.0.0.1:3000
端口 不止一个服务
3306 MYSQL　
80 Web服务
http.createServer(function(request,response){ //当有用户来的时候的回调函数
    response.end('Hello World 优秀 专秀!');
})
    .listen(3000)  用来监听端口

request 用户 N  Web Server 一直在 3000端口上伺服
request 就能找到店, 每位用户到达，会触发 事件，调用createServer上的回调函数，通过request 得到用户身份，response?响应请求  
http 响应之后 就断开


  