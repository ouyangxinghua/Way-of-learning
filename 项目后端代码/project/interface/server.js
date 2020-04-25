const express = require('express')
const app = express()
const changeRouter = require('./change')
const getRouter = require('./get')
const addRouter = require('./add')
const deleteRouter = require('./delete')
const bodyParser = require('body-parser')

//设置跨域访问  cors跨域
app.all('*', function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header('Access-Control-Allow-Headers', 'Content-Type, Content-Length, Authorization, Accept, X-Requested-With , yourHeaderFeild');
    res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS");
    res.header("X-Powered-By", 'ouyang');
    res.header("Content-Type", "application/json;charset=utf-8");
    next();
});

// 创建application/json 解析器
var jsonParser = bodyParser.json()
// 创建 application/x-www-form-urlencoded 解析器
var urlencodedParser = bodyParser.urlencoded({ extended: false })

app.use(urlencodedParser)
app.use(jsonParser)

app.use('/get', getRouter)
app.use('/add', addRouter)
app.use('/change', changeRouter)
app.use('/delete', deleteRouter)

app.listen(3000, () => {
    console.log('the express server is run on 3000')
});