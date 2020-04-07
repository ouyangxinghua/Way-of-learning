/**
 * 仿照koa2实现中间件的功能
 * Created by ouyang on 2020/4/02.
 */
var http = require('http');

function koa(){
    var fnList = [];
    var app = function (ctx, next) {
        var i = 0
        function next(){
            var fn = fnList[i++];
            if(!fn) return;
            fn(ctx, next)
        }
        next()
    }
    app.use = function(asyncFn){
        fnList.push(asyncFn);
    }
    return app;
}

var app = new koa()

app.use(async (ctx, next) => {
    console.log(1);
    await next();
    console.log(2);
});
 
app.use(async (ctx, next) => {
    console.log(3);
    await next();
    console.log(4);
});
 
app.use(async (ctx, next) => {
    console.log(5);
    await next();
    console.log(6);
});


// 创建服务
http.createServer(app).listen('3000', function () {
    console.log('listening 3000....');
});