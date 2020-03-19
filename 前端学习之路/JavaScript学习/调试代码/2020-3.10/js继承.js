// https://www.cnblogs.com/chaixiaozhi/p/8515087.html
// https://www.jb51.net/article/81766.htm

function Parent(name, height) {
    this.sex = 0;
    this.name = name;
    this.height = height;
    // this.fn1 = function(){
    //     console.log('xinghua')
    // }
}
Parent.prototype.fn1 = function(){
    console.log('ouyang1')
}
Parent.prototype.fn2 = function(){
    console.log('ouyang2')
}

function Child(age) {
    this.age = age;
}
// Child.prototype = new Parent('hahaha', 171);
// Child.prototype.fn3 = function(){
//     console.log('ouyang1')
// }
// Child.prototype.fn4 = function(){
//     console.log('ouyang2')
// }
let m = new Parent('hahha', 184)
let n = new Parent('djas', 180)
console.log(m.name, n.name)
m.fn1()
n.fn1()
console.log(m.fn1 === n.fn1)  //true 因为方法共享  但如果是构造函数里面用this定义得函数，则为false
// 所以 在构造函数上通过this来添加方法的方式来生成实例，每次生成实例，都是新开辟一个内存空间存方法。这样会导致内存的极大浪费，从而影响性能。

Object.prototype.clone = function() {}
var obj = {
    name: 'jack',
    age: 33
}
// for...in 循环将遍历对象的所有可枚举属性。
// name, age, clone   注：原生Object原型上的属性不会被遍历出来，只有自己后面手动往原型上添加的wang属性才会被for in 遍历出来
// 如果不想把原型上的属性或者方法被遍历出来，可以用hasOwnProperty方法过滤一下
for (var n in obj) {
    alert(n)
}