const express = require('express')
const app = express();
app.use(express.static(__dirname))
// console.log(__dirname,__filename) //1为当前路劲，2为当前文件
app.get('/', (req, res) => {
    res.send('./index.html', {root: __dirname})
})

app.listen(3000, () => {
    console.log('your server is run on 3000 port!')
})