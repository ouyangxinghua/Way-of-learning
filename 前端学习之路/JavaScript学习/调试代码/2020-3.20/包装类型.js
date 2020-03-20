// 浅析为什么a="abc" 不等于 a=new String("abc")     https://www.jb51.net/article/126716.htm

// a="abc"
// typeof a //string
// b=new String("abc")
// typeof b // object
// a==b //true
// a===b //false
// 在js中，区分原始资料类型和包装类型。
// 数字、字符串、布尔、null、undefined 属于原始资料类型，而Number、String、Boolean属于包装类型，
// 通过new Number 创建的是包装类型的派生对象。所以两者是不等的。

// 这里还有一种说法：装箱，拆箱
// 1. 装箱，就是用这个值类构造一个相应的包装对象
var a=10 ,b="javascript" , c=true;
  var o_a=new Number(a);
  var o_b=new String(b);
  var o_c=new Boolean(c);
// 装箱的最大作用是将值作为对象来处理。

// 2. 拆箱，是包装对象转换成值类型
var a=10;
 var o_a=new Number(a);
 var b=o_a.valueOf();//这就是拆箱的过程。

// valueof()函数   该方法通常是由 JavaScript 引擎在内部隐式调用的，而不是由用户在代码中显式调用的。
let a1 = new String('靳萌瑶')
console.log(a1 + '欧阳兴华') //靳萌瑶欧阳兴华
// String.prototype.valueOf = function(){  //修改原型上的valueOf()
//     return 'ouyang'
// }
console.log(a1 + '欧阳兴华') //ouyang欧阳兴华

// JavaScript调用valueOf将对象转换为原始值的方法。
// 您很少需要自己调用该valueOf方法。当遇到需要原始值的对象时，JavaScript会自动调用它。
// 默认情况下，该valueOf方法由继承的每个对象继承Object。每个内置核心对象都重写此方法以返回适当的值。如果对象没有原始值，则valueOf返回对象本身。
// 您可以valueOf在自己的代码中使用以将内置对象转换为原始值。创建自定义对象时，可以重写Object.prototype.valueOf()以调用自定义方法，而不是默认Object方法。
var ou1 = 'b'
// 等价于
var ou2 = new String('b').valueOf()
console.log(ou1 === ou2)