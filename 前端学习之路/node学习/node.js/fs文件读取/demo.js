// fs模块 是node后端开发的一部分
const fs = require('fs');
// 读文件是异步的，

// 1. callback()方法
// fs.readFile('./a.txt','utf-8' ,function(err,data){
//     console.log(data);
//     if(err){
//         console.log(err);
//     }
//     fs.readFile('./b.txt','utf-8',function(err,data){
//         console.log('----------',data)
//     })
// })
// 将callback处理异步的方案抛弃，
// 2. promise方法
const fileAPromise = new Promise((resolve,reject) => {
    // 花时间的诺言 耗时的任务
    fs.readFile('./a.txt','utf-8' ,(err,data) => {
        // console.log(data);
        // 流程的控制权怎么移交
        resolve(data);
    })
})
const fileBPromise = new Promise((resolve,reject) => {
    fs.readFile('./b.txt','utf8',(err,data) => {
        if(err){
            reject(err)
        }else{
            resolve(data);
        }
    })
})
// 将内部的耗时任务运行起来
fileAPromise
    .then(data => {
        console.log(data);
        return fileBPromise;
    })
    .then(data => {
        console.log(data);
    })