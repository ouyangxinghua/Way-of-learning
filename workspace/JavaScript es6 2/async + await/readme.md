## 异步
callback -> promise -> generate -> async/await

## co
tj koa

Promise.resolve(value)方法返回一个以给定值解析后的Promise 对象。但如果这个值是个thenable（即带有then方法），返回的promise会“跟随”这个thenable的对象，采用它的最终状态（指resolved/rejected/pending/settled）；如果传入的value本身就是promise对象，则该对象作为Promise.resolve方法的返回值返回；否则以该值为成功状态返回promise对象。
 
# https://www.jianshu.com/p/c43f418d6bf0
for...of语句在可迭代对象
变成可迭代对象， 一个对象必须实现 @@iterator 方法, 意思是这个对象（或者它原型链 prototype chain 上的某个对象）必须有一个名字是 Symbol.iterator 的属性:

for in会遍历数组所有的可枚举属性，包括原型。
