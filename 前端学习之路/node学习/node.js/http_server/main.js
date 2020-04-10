{/*<script src="./http"></script>*/}
// require关键字  用来引入一个模块，COMMONJS
const http = require('http');
let i = 0;
http 
    .createServer(function(request,response) {
        console.log(`收到请求${i}:${request.url}`)
        if(request.url !== '/favicon.ico'){
            response.end(`Hello World!${++i}`);
        }
        // 每次加2的原因是，每次请求都会去再发一个/favicon.ico的请求,所以需要过滤掉/favicon.ico请求
    })
    .listen(3000);
