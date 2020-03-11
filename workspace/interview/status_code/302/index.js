// 302 临时移动。与301类似。但资源只是临时被移动。客户端应继续使用原有URI
const http = require('http');
const hostname = '127.0.0.1'
const port = 3000;

var server = http.createServer(function (req, res) {
  res.writeHead(302, { 'Location': 'https://www.baidu.com/' })
  console.log(res._header);
  res.end();
});
server.listen(port)