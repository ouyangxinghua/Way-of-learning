{/*<script src="./http"></script>*/}
// require关键字  用来引入一个模块，COMMONJS
const http = require('http');
let i = 0;
http 
    .createServer(function(request,response) {
        response.end(`Hello World!${++i}`);
    })
    .listen(3000);
