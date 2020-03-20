// 3. 组合继承
// 核心：通过调用父类构造，继承父类的属性并保留传参的优点，然后再通过将父类实例作为子类原型，实现函数复用
// 缺点：调用了两次父类构造函数，生成了两份实例（子类实例将子类原型上的那份屏蔽了），影响性能，且子类实例原型链会显得有点混乱

function Person(name) {
    this.name = name;
    this.friends = ['小李', '小红'];
};
Person.prototype.getName = function () {
    return this.name;
};
function Parent(age) {
    Person.call(this, '老明');　　//这一步很关键
    this.age = age;
};
Parent.prototype = new Person('老明');　　//这一步也很关键
var result = new Parent(24);
console.log(result.name);　　　　//老明
result.friends.push("小智");　　//
console.log(result.friends);　　//['小李','小红','小智']
console.log(result.getName());　　//老明
console.log(result.age);　　　　//24

var result1 = new Parent(25);   //通过借用构造函数都有自己的属性，通过原型享用公共的方法
console.log(result1.name);　　//老明
console.log(result1.friends);　　//['小李','小红']

