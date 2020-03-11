const fs = require('fs')
const util = require('util')
const promisify = (func) => {
  // promisify return 出去的函数
  // ('./promisify.hmtl, {}) -> ['./promisify.hmtl',{}]
  // arguments
  return (...args) => {
    // promisify return 出去的函数执行的结果
    return new Promise((resolve, reject) => {
      // 把数组里面的 每一项 一次展开
       func(...args, (err, result) =>{
          if(err) reject(err)
          else{
            resolve(result)
          }
       })
    })
  }
}
const promiseReadFile = promisify(fs.readFile);
promiseReadFile('./promisify.html', { encoding: 'utf8' })
.then((data) => {
  console.log(data)
})
// fs.readFile('./promisify.html', { encoding:'utf8'}, (err, data) => {
//   if(!err) {
//     console.log(data);
//   }
// }
// )
const readFile = util.promisify(fs.readFile);
readFile('./promisify.html', { encoding: 'utf8' })
.then((data) => {
  console.log(data)
})