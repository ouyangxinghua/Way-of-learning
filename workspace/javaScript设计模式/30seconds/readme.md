- 正则表达式知识点
  贪婪匹配 [0-9]+ 
  + 一次或多次
  * 零次或多次
  ^ 的第二种用法
  [] 只会匹配一个字符
  [^>]
- 函数参数
  写一个函数, 返回最大的两个数
  [2,6, 'a'] [8,4,6] [10]
  [10, 8]
  1. Math.max 最便宜的求最大值
  2. ... spread 展开一个数组
  3. n个数？ slice方法
  综合题

- args 
  1. map + spread 运算符
  2. 闭包
    遍历每一项, map
    取前两个 slice + n + Math.max()
    求最大值
    .map()
      .slice
      Math.max()

    map 每一项接受一个 callback()
    callback() 取前两个 + 求最大值 作为一个功能
    Math.max.slice(n)



## promisify
const util = require('util')  util.promisify
promise 风格
fs.readFile('', (err, data) => {});
promisify:
readFile('')
.then()
让符合 (err, data) => {} 回调函数 是最后一个参数的函数
包裹之后返回 promise 版本函数

##实现这样一个 promisify源码