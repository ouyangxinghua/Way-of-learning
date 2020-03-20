// 4. 寄生组合继承(避免的组合继承的缺点)
// 核心：通过寄生方式，砍掉父类的实例属性，这样，在调用两次父类的构造的时候，就不会初始化两次实例方法/属性，避免的组合继承的缺点
// 缺点：堪称完美，但实现较为复杂

function Person(name) {
    this.name = name;
    this.friends = ['小李','小红'];
}
Person.prototype.getName = function () {
    return this.name;
};
function Parent(age) {
    Person.call(this,"老明");
    this.age = age;
}
(function () {
    // 为什么不直接Parent.prototype = Person.prototype呢？ 因为这样的话，
    // 当我们想给 Child 的prototype里面添加共享属性或者方法时，如果其 prototype 指向的是 Parent 的 prototype，
    // 那么在 Child 的 prototype 里添加的属性和方法也会反映在 Parent 的 prototype 里面，
    // 这明显是不合理的，这样做的后果是当我们只想使用 Parent 时，也能看见 Child 往里面扔的方法和属性。
    // 所以需要每个构造函数都需要持有自己专用的prototype对象
    let con = Parent.prototype.constructor  //保存子类的constructor属性
    var Super = function () {};     // 创建一个没有实例方法的类
    Super.prototype = Person.prototype;
    Parent.prototype = new Super();     //将实例作为子类的原型
    Parent.prototype.constructor  = con  //把constructor改回原来的
})();


var result = new Parent(23);
console.log(result.name);
console.log(result.friends);
console.log(result.getName());
console.log(result.age);