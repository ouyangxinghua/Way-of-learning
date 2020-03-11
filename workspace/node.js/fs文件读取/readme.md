node 让js 来到后端

服务器端,  linux 
文件系统操作 fs
连接数据库 db

没有DOM
文件读取 要花时间的 所以是一个异步操作 时间花在定位文件 定位文件参数1  打开文件将文件内容读到内存中 然后输出到命令行
要花时间的 在js里通过异步来做
1. callback()
fs.readFile(path,'utf8',function(err,data){

})
2. promise
    分开，promise 是类用于处理耗时异步问题的类，为了防止回调地狱，看到耗时问题就用出一个Promise实例
    resolve 将控制权交给then 将结果通过resolve(data)
    reject 失败 就会让Promise去执行 catch(e) { }
