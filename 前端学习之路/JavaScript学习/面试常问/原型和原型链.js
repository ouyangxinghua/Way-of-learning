// 面试官问，请描述一下js的原型和原型链   https://m.php.cn/article/421350.html
// https://developer.mozilla.org/zh-CN/docs/Learn/JavaScript/Objects/Object_prototypes   MDN文档

// JavaScript 常被描述为一种基于原型的语言 (prototype-based language)——每个对象拥有一个原型对象，对象以其原型为模板、从原型继承方法和属性。
// 原型对象也可能拥有原型，并从中继承方法和属性，一层一层、以此类推。这种关系常被称为原型链 (prototype chain)，它解释了为何一个对象会拥有定义在其他对象中的属性和方法。
// function Parent(name, height) {
//     this.name = name;
//     this.height = height;
// }
// Parent.prototype.fn = function(){
//     console.log('ouyang')
// }

// function Child(age) {
//     this.age = age;
// }
// Child.prototype = new Parent('ouyang',184)
// Child.prototype.fn1 = function(){  //一定要写在继承后面，否则会被覆盖
//     console.log('xinghua')
// }
// let ch = new Child(21)
// ch.fn()
// ch.fn1()
// console.log(ch.name)

// 原型
// 每个函数都有prototype(原型)属性，这个属性是一个指针，指向一个对象，这个对象的用途是包含特定类型的所有实例共享的属性和方法，即这个原型对象是用来给实例共享属性和方法的。
// 而每个实例内部都有一个指向原型对象的指针__proto__。

// 原型链
// 每个构造函数都有一个原型对象，原型对象都包含一个指向构造函数的指针，而实例都包含指向原型对象内部的指针。
// JavaScript在创建对象的时候，都会有一个[[proto]]的内置属性，用于指向 创建它的函数对象(比如 function String(){}  String.prototype) 的prototype。
// 然后 创建它的函数对象 的原型对象 也有[[proto]]属性。因此在不断的指向中，形成了原型链。

// 构造函数
// 构造函数 ，是一种特殊的方法。主要用来在创建对象时初始化对象。 即为对象变量赋初始值。每个构造函数的实例都将共享构造函数的初始值。 构造函数的出现是为了解决使用Object构造函数和字面量表示法不方便创建大量重复对象的问题。
// 传统创建对象实例的方法
// var person={
//     name:'张女士',
//     age:'80',
//     gender:'女'
// };
// console.log(person)
// 注：这个方法如果用于创建大量相同属性和方法的对象时，会产生大量重复代码


// 1. __proto__是每个对象都有的一个属性，而prototype是函数才会有的属性。 
// 2. __proto__指向的是当前对象的原型对象，而prototype指向的，是以当前函数作为构造函数构造出来的对象的原型对象。
// 所有对象字面量都是通过Object()构造出来的,Object.prototype这个对象，它的__proto__指向的是null，然后就没有然后了。
// prototype 显式原型 只有函数function才有
// __proto__ 隐式原型 所有的都有
// 1. 每个函数function都有一个prototype，即显式原型(属性)
// 2. 每个实例对象都有一个__proto__，可称为隐式原型(属性)
// 3. 对象的隐式原型的值为其对应构造函数的显式原型的值
// 函数的prototype属性: 在定义函数时自动添加的, 默认值是一个空Object对象
// 对象的__proto__属性: 创建对象时自动添加的, 默认值为构造函数的prototype属性值


// console.log('a'.constructor === 'String') //true  也是一种判断数据类型的方式，但是并不是特别可靠，不建议使用（constructor 属性易变，不可信赖）
function F() {}
    F.prototype = {
    _name: 'Eric',
    getName: function() {
    return this._name;
    }
};

// 初看这种方式并无问题，但是你会发现下面的代码失效了：
// var f = new F();
// alert(f.constructor === F); // output false  原因是构造函数 F 的原型被开发者重写了，而且用constructor 不能判断 null 和 undefined

// a instanceOf FOO   在a的整条原型链中是否有指向FOO.prototype的对象
// https://blog.csdn.net/StoneG_G/article/details/82663058   JS instanceof 判断类型 问题
// 语法 object instanceof constructor   object 某个实例对象(注意是对象)   constructor 某个构造函数
// 手写instancof方法
function instanceOf(left,right) {
    if(typeof left != 'object') return false;
    let proto = left.__proto__;
    let prototype = right.prototype
    while(true) {
        if(proto === null) return false
        if(proto === prototype) return true
        proto = proto.__proto__;
    }
}
var a = 'ouyang';
var b = new String('xinghua')
console.log(instanceOf(a, String), a instanceof String)
console.log(instanceOf(b, String), b instanceof String)

