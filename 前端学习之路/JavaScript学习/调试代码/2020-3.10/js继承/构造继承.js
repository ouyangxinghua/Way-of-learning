// 2. 构造继承
// 核心：使用父类的构造函数来增强子类实例，等于是复制父类的实例属性给子类（没用到原型）
// 缺点： 方法都在构造函数中定义， 只能继承父类的实例属性和方法，不能继承原型属性/方法，
// 无法实现函数复用，每个子类都有父类实例函数的副本，影响性能，浪费内存

function Person(name) {
    this.name = name;
    this.friends = ['小李', '小红']
    this.getName = function () {
        return this.name
    }
}
Person.prototype.fn = function () {
    return 'ouyang'
}

function Parent(age) {
    Person.call(this, '老明') //这一句是核心关键
    this.age = age;
}
// Parent.prototype = new Person('老明')  //加上此操作可以继承原型上的方法
// （加上了就是后面的组合继承，即组合构造继承和原型链继承两种方法）

var result = new Parent(23);
console.log(result.name);　　　　//老明
result.friends.push("小智");
console.log(result.friends);　　//["小李", "小红", '小智']
console.log(result.getName());　　//老明
console.log(result.age);　　　　//23
console.log(result.fn());   //这个会报错，调用不到父原型上面扩展的方法