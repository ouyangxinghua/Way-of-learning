var fs = require("fs");

// 第一种方法
// 创建一个可读流   中文字在buffer里面为三个字节, 英文字母为一个
var mydata = '';
var readerStream = fs.createReadStream('input.txt');
// 创建一个可写流
var writerStream = fs.createWriteStream('output.txt');
// 管道读写操作
// 读取 input.txt 文件内容，并将内容写入到 output.txt 文件中
readerStream.on("data",function(data){
    console.log('data', data)
    mydata+= data;
})
readerStream.on("end",function(){
    console.log(mydata);
})
readerStream.pipe(writerStream);
console.log("程序执行完毕");

// 第二种方法
// fs.readFile('input.txt', 'utf-8', function (err, data) {
//     if (err) {
//         console.log("失败");
//     } else {
//         fs.writeFile('output.txt', data, 'utf-8', function (err) {
//             console.log("成功");
//         })
//     }
// })
