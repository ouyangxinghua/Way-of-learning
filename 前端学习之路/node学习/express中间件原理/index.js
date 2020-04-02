//引入express中间件
var express = require('express');
var app = express();
const fs = require('fs');
app.get('/get', function (req, res) {
    res.redirect('/post')
})
app.get('/post', function(req,res){
    res.send('ouyang')
})
app.use('/api', express.static(__dirname + '/public'))  //访问/api路由返回index.html文件
//监听端口为3000
app.listen(3000, function () {
    console.log('Example app listening at 3000 端口');
});
// 由于同步读取文件没有回调函数，故需要用try...catch捕获该错误，这样出错才不会阻塞代码
try {
    var data = fs.readFileSync('./public/a.txt', 'utf-8') //同步读取文件，而fs.readFile为异步读取文件
    console.log(data)
} catch (error) {
    console.log(error)
}
console.log('同步')

// 下面为统计访问网站次数的中间件演示
function middle01(req,res,next){
    req.siteName = "jsera.net － 开辟Javascript新纪元的网络平台";
    next();
}
function middle02(){
    var accessNum = 0;
    return function(req,res,next){
        accessNum += 1;
        req.accessNum = accessNum;
        next();
    }
}
app.use(middle01);
app.use(middle02());
app.get("/num",function(req,res){
    res.send(req.siteName + "\n" + "网站访问人数：" + req.accessNum);
})