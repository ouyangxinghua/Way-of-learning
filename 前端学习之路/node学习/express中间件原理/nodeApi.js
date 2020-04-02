//搭建一个node api服务器
//写一个登录的接口
//通过http模块创建一个服务器
const http = require('http')
const url = require('url')
const querystring = require('querystring');
const server = http.createServer((req, res) => {
    //req 请求信息
    //res 回复信息
    // console.log(req)
    let string = req.url
    // 过滤浏览器请求图标文件
    if (string !== '/favicon.ico') {
        console.log(string)
        let urlobj = url.parse(string)
        let pathname = urlobj.pathname  //用户截取的地址信息
        let query = querystring.parse(urlobj.query) // 用户get传递的参数
        console.log('urlobj', urlobj)
        if (pathname === '/login') {
            console.log(query)
            res.writeHead(200, { 'Content-Type': 'text/html;charset=utf-8' }); //回复的格式设置
            // res.write('<head><meta charset="utf-8"/></head>');
            if (query.us === 'ouyang' && query.ps === 'xinghua') {
                res.end('登录成功');
            } else {
                res.end('登录失败，用户名或者密码错误！');
            }


        } else if (pathname === '/reg') {
            res.writeHead(200, { 'Content-Type': 'text/plain' }); //回复的格式设置
            res.end('reg ok');
        }


    }

});


// 监听端口号
server.listen(4000, () => {
    console.log('服务器启动')
})
