new的时候发生了什么？

构造函数的运行方式是以new的方式被运行，
内部的this 动态指向实例化后的this.

空对象？ 开始时是空的
之后，拿得了构造函数里的属性，最后又拿到了prototype上定义的属性和方法

对象？ 由属性和方法构成

1. 实例化一个新的对象，并且是这类的实例
2. 构造函数被执行，this指向实例
   constructor 运行慢半拍
   在面向对象里构造函数是为他人服务的，为this服务， this由函数的运行方式决定
   this -> 实例 是通过new的方式
   this -> 任何对象 call
3. Otaku.prototype    值是对象
原型对象
任何函数都拥有一个prototype属性 才能构建类
像火车 constructor 车头，
车头上勾着车身 