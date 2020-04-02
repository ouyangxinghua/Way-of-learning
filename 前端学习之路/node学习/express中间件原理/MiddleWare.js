/**
 * 仿照express实现中间件的功能
 * Created by ouyang on 2020/3/31.
 */
var http = require('http');

/**
 * 仿express实现中间件机制
 * @return {app}
 */
function express() {
    var funcs = []; // 待执行的函数数组
    var app = function (req, res) {
        console.log('ouyang')
        var i = 0;
        function next() {
            var task = funcs[i++];  // 取出函数数组里的下一个函数
            if (!task) {    // 如果函数不存在,return
                return;
            }
            task(req, res, next);   // 否则,执行下一个函数
        }
        next();
    }
    /**
     * use方法就是把函数添加到函数数组中
     * @param task
     */
    app.use = function (task) {
        funcs.push(task);
    }
    return app;    // 返回实例
}

// 下面是测试case

var app = express();

function middlewareA(req, res, next) {
    console.log('middlewareA before next()');
    next();
    console.log('middlewareA after next()');
}

function middlewareB(req, res, next) {
    console.log('middlewareB before next()');
    next();
    console.log('middlewareB after next()');
}

function middlewareC(req, res, next) {
    console.log('middlewareC before next()');
    next();
    console.log('middlewareC after next()');
}

app.use(middlewareA);
app.use(middlewareB);
app.use(middlewareC);

http.createServer(app).listen('3000', function () {
    console.log('listening 3000....');
});


// express这个框架是一个函数，express做的事就是作为http.createServer的回调函数  
// http.createServer(app) app就是做了一系列操作的express函数  例如app.get(), app.use()添加中间件等等

// const http = require('http');
// const server = http.createServer(function(req, res){
//     res.end('hello word!')
// });
// server.listen(8000, () => {
//     console.log('8000 port')
// });