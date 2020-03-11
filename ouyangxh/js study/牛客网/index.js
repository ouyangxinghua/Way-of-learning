// (function (){
//   var a = b = 5;
// })()
// console.log(a);//ReferenceError: a is not defined
// console.log(b);//5

// // 第一个考点在于var a=b=5相当于拆解成var a=b; b=5; 然后，b=5前面没有var，相当于声明为全局变量（这种方式在严格模式下会报错，此题不考虑)。

// function aa(num){
//   let nn = num.toString()
//   let len = nn.length;
//   let aa = Number(nn.substr(2,3))
//   console.log(aa)
//   console.log(nn)
//   console.log(len)
// }
// aa(4.3)

var aa = 'str'
console.log(aa)
console.log('aa'+aa)
console.log(typeof +aa)
