const express = require('express')
const app = express()
const request = require('request');
const sha1 = require('js-sha1'); // 引入sha1加密算法，需要使用sha1算法生成签名

//设置跨域访问  cors跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", ' 3.2.1');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

app.get('/ouyang', function(req, res){
    console.log('获取/ouyang接口数据');
    res.send({
        name: '欧阳兴华'
    })
}) 
app.post('/api/getWX', function (req, res) {
    const appId = 'wx8b1ec504d512ef43';   // 测试公众号的addId   
    const appSecret = '9c0c55899ff3c802ae417d6145b6cceb'  // 测试公众号的appSecret
    // console.log(req)
    //const url = req.body.url; // 初始化jsdk的页面url，如果是单页应用记得截掉url的#部分
    const url = 'http://ouyang.com:8080/'
    let promise = new Promise((resolve, reject) => {
        // 第一步，通过appId和appSecret 获取access_token
        request(`https://api.weixin.qq.com/cgi-bin/token?grant_type=client_credential&appid=${appId}&secret=${appSecret}`, function (error, response, body) {
            if (!error && response.statusCode == 200) {
                let access_token = JSON.parse(body).access_token;
                console.log('第一步获取access_token：', access_token);
                resolve(access_token);
            } else {
                reject(error);
            }
        });
    });

    promise.then(access_token => {
        // 第二步，通过第一步的access_token获取票据ticket
        return new Promise((resolve, reject) => {
            request(`https://api.weixin.qq.com/cgi-bin/ticket/getticket?access_token=${access_token}&type=jsapi`, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    let ticket = JSON.parse(body).ticket;
                    console.log('第二步获取ticket：', ticket);
                    resolve(ticket);
                } else {
                    reject(error);
                }
            });
        });

    }).then(ticket => {
        const createNonceStr = () => Math.random().toString(36).substr(2, 15);
        const createTimeStamp = () => parseInt(new Date().getTime() / 1000) + '';
        const calcSignature = function (ticket, noncestr, ts, url) {
            var str = `jsapi_ticket=${ticket}&noncestr=${noncestr}&timestamp=${ts}&url=${url}`;
            shaObj = sha1(str); //使用sha1加密算法
            return shaObj;
        }
        const noncestr = createNonceStr(); // 随机字符串
        const timestamp = createTimeStamp(); // 时间戳
        const signature = calcSignature(ticket, noncestr, timestamp, url);  // 通过sha1算法得到签名
        res.send({
            noncestr: noncestr,
            timestamp: timestamp,
            signature: signature,
        })
    }).catch(error => {
        console.log(error);
    });
});

app.listen(3000, () => console.log('Example app listening on port 3000!'))