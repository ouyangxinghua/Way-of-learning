// 5. es6继承

// class Animal {
//     constructor(name, age) {
//         this.name = name
//         this.age = age
//     }
//     //动物的实例方法
//     jiao() {
//         console.log('Animal 的实例方法')
//     }
//     static info = 'eee'//原型属性
//     static show() {  //静态方法
//         console.log('Animal 的静态方法')
//     }
// } 
class Person {
    constructor(name, age) {
        this.name = name
        this.age = age
    }
    static show() {  // 静态方法
        console.log('父类的静态方法')
    }
    sayhello() { // 实例方法
        console.log('父类的hello方法')
    }
}
// class 类中，可以使用extends 关键字，实现，子类继承父类
// 语法 class 子类 extends 父类{}
class American extends Person {
    constructor(name, age) {
        /**问题1： 为什么一定要在 constructor 中调用 super ？
         * 因为，一个子类，通过extends 关键字继承了父类，那么，在这个子类的 constructor 构造函数中，必须优先调用一下 super()
         * 问题2：super 是什么东西？
         * super是一个函数，而且他是父类的 构造器，子类的super，其实就是父类中的 constructor 构造器的一个引用
         * 问题3：为什么调用了 super()，之后name和age都变成了undefined？ 
         * 实例化的时候 要把 参数 name age 传递进去 给 constructor再给super
         */
        super(name, age)
    }
}
const a1 = new American('Jack', '20')
console.log(a1)
a1.sayhello()

class Chinese extends Person {
    constructor(name, age, IDnumber) {
        super(name, age)
        // 语法规范 在子类中， this 只能放在super 之后
        this.IDnumber = IDnumber
    }
}
const c1 = new Chinese('张三', '23', '123456')
console.log(c1)
c1.sayhello()
Chinese.show()
console.log(Chinese.prototype.__proto__.constructor) //[Function: Person]

// ES6里，Class可以通过extends关键字继承，而非ES5里只能修改原型链（Object.creat(父实例)）进行。
// 子类一定要在constructor方法里调用super方法，执行父类的constructor。
// ES5的继承是现有子类的实例，再把父类的方法往子类上加，ES6是现有父类的实例对象，再用子类的构造函数修改父类对象。这样的好处在于ES5的方式无法继承js原生构造函数（Array等），因为原生构造函数的很多属性是内部的，
// 读不出来，但是ES6因为直接是父类的实例，所以能有那些父类的内部属性。这样就能扩写原生对象，贼牛逼。
// 子类的构造函数中，一定要先用了super，才能用this，因为super产生父类的实例对象，才有this。
