// 301 永久移动。请求的资源已被永久的移动到新URI，返回信息会包括新的URI，浏览器会自动定向到新URI。今后任何新的请求都应使用新的URI代替
var http = require('http');

var server = http.createServer(function(req, res){
  // 响应头
  res.writeHead(301, {'Location': 'https://www.baidu.com/'})
  console.log(res._header);
  res.end();
});
server.listen(3002)