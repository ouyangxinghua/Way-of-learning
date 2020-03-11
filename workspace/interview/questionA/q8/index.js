function Person(name) {
  this.name = name
  return {}
  // 构造函数本身是不需要返回值的，使用new来创建时，但是如果reutrn了非对象，就会忽略掉return 的值。如果是对象则返回该对象(return null也会忽略返回值)
}
function Student(){

}
Student.prototype = Person.prototype
// Student.prototype.constructor = Student
let p = new Student('wn')
// console.log(p instanceof Person)
// console.log(p)
// p.__proto__ = Person.prototype
// Person.__proto__ = Function.prototype

// var foo = {},
//     F = function() {};
// Object.prototype.a = 'valA'
// Function.prototype.b = 'valB'
// console.log(foo.a,F.b,foo.b,F.a)

for(let i = 0; i < 10; i++){
  setTimeout(() => {
    console.log(i)
  }, 0);
}
// for(let i = 0; i < 10; i++){
//   setTimeout(() => {
//     console.log(i)
//   }, 0);
// }

// let 每次循环生成一个封闭的块级作用域和setTimeout绑定, var 每次循环会覆盖掉上一次的作用域

// for in 迭代和for of 有什么区别
Array.prototype.method = function() {
  console.log("wn")
}
var myArray = [1,2,3,4,5,6,7]
myArray.name="数组";
// for (let index of myArray){
//   console.log(index)
// }
// for (let index in myArray){
//   console.log(myArray[index])
// }
// for (let index of myArray){
//   console.log(index)
// }
// https://www.jianshu.com/p/c43f418d6bf0
// for in
// 1. index 是索引为字符串型数字，不能进行几何运算
// 2. 遍历的顺序有可能不是按照实际数组的内部顺序
// 3. 使用for in 会遍历数组所有的可枚举属性， 包括原型
// 4. for in 更适合遍历对象

// for of
// 1. for in 遍历的是数组的索引(键名) 而for of 遍历的是数组的元素
// 2. for of 遍历的只是数组的元素 而不包括数组的原型属性和索引


let gArr = [1,[2,3], 4,5,[6,7,[3,2,8]]]
let oArr = [1,2,3,4,5,6,7,3,2,8]


// var newArr = []
// function fn(arr){
//   arr.forEach((item) => {
//     if(typeof item === 'number'){
//       newArr.push(item)
//     }else{
//       newArr.concat(fn(item))
//     }
//   })
//   return [...new Set(newArr)]
// }
// console.log(fn(gArr))

// function fn(arr){
//   return arr.reduce((pre, item) => {
//     return pre.concat(Array.isArray(item) ? fn(item) : item)
//   },[])
// }
// console.log([...new Set(fn(gArr))])




