// https://blog.csdn.net/qq_27127385/article/details/87947467  JavaScript 创建对象的 7 种方法
// https://juejin.im/entry/58291447128fe1005cd41c52    
// https://www.cnblogs.com/zhouyangla/p/8546329.html 
// https://www.cnblogs.com/libin-1/p/6959233.html
// https://blog.csdn.net/wangzl1163/article/details/81304300  js设计模式：寄生构造函数模式

// new Object() 和 Object.create()的区别    https://www.cnblogs.com/leijee/p/7490822.html  https://juejin.im/post/5d578bacf265da03ee6a548a
// 总结：使用Object.create()是将对象继承到__proto__属性上
var test = Object.create({x:123,y:345});
// {} __proto__: a: "q" __proto__: Object 
console.log(test);//{}
console.log(test.x);//123
console.log(test.__proto__.x);//3
console.log(test.__proto__.x === test.x);//true

var test1 = new Object({x:123,y:345});
// {a: "m"} a: "m" __proto__: Object
console.log(test1);//{x:123,y:345}
console.log(test1.x);//123
console.log(test1.__proto__.x);//undefined
console.log(test1.__proto__.x === test1.x);//false

var test2 = {x:123,y:345};
console.log(test2);//{x:123,y:345};
console.log(test2.x);//123
console.log(test2.__proto__.x);//undefined
console.log(test2.__proto__.x === test2.x);//false

// new Object() 和 {} 一样
// Object.create实现原理
Object.myCreate = function (obj, properties)  {
    var F = function ()  {}
    F.prototype = obj
    if (properties) {
       Object.defineProperties(F, properties)
    }
    return new F()
}
// Object.cerate() 必须接收一个对象参数，创建的新对象的原型指向接收的参数对象，
// new Object() 创建的新对象的原型指向的是 Object.prototype. 
// （表述有点啰嗦，简洁点说就是前者继承指定对象， 后者继承内置对象Object）

