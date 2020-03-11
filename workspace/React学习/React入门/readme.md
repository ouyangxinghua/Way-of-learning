- 组件开发  UI开发
  分为多个组件, 拼装页面
  组件是一个类
  实例化一下, 就可以用了
  多实例化几次, 就可以复用
- 组件是一个种子, 里面有很多东西的
  template  render()
  css
  JavaScript  isLiked

- React 和 Vue 都是MVVM 的一种实现
  React 用来做后台界面 VUE 用户界面
  挂载点 界面跟组件的关系, 界面 《- 组件 《- html
  DOM 被封装 组件类
  constructor this.state 数据部分
  模板部分 render()方法
  小程序setData   类似setState({})

- 模板里数据的细化
  es6字符串模板  每次编译 
  每次setState  都去执行this.render();
  状态和模板结合的地方在模板的编译, 插入数据
  setState 驱动模板重新编译一下  数据驱动


function person(){
    this.height = function(){}  通过this指针来定义实例方法  (变量)
}
person.sayName = function(){}  静态方法  在实例上直接定义方法（对象）
person.prototype.sayAge = function(){}  实例方法  利用JavaScript对象原型引用prototype来实现

即直接定义在实例上的变量会覆盖定义在“this”上和prototype定义的变量，定义在“this'”上的会覆盖prototypetype定义的变量。

从方法调用上，静态方法可以直接通过A.来调用，实例方法要通过先定义一个引用变量，指向构造函数定义的新对象。

Array.prototype.slice.call(arguments)能将具有length属性的对象转成数组
