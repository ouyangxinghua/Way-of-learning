yarn add create-react-app -g  React脚手架工具create-react-app
create-react-app + 项目名
 
# React 生命周期源码解析
- https://blog.csdn.net/weixin_42186513/article/details/83414833

## render
组件 需要渲染的页面
## jsx
react 自己的语法 就是 js + html

## 挂载阶段
第一次渲染  只执行一次
componentWillMount() 将要挂载
componentDidMount() 已经挂载

## 更新阶段(数据发生改变)
1. componentWillReceiveProps()
它会在Component接受到新的状态(Props)时被触发，一般用于父组件状态更新时子组件的重新渲染。

2. shouldComponentUpdate  
return true 更新 
return false 不更新
3. componentWillUnmount
清理
定时器
全局的事件绑定
##
getSnapshotBeforeUpdate() {
    console.log('getSnapshotBeforeUpdate');
    return 888;
  }
  // a === undefined 15.X
  // a === getSnapshotBeforeUpdate() 16.x
  componentDidUpdate(preProps, preState, a) {
    console.log('componentDidUpdate', a);// a=888
}
##  react16当前生命周期
1. componentWillMount
render前，所以setState不会重新渲染，服务端渲染唯一调用，推荐用constructor代替之

2. render

3. componentDidMount
render后，调用setState会重新渲染，页面可交互，可以请求数据

4. componentWillRecieveProps(nextProps)
已挂载组件接收到新props触发

5. shouldComponentUpdate(nextProps, nextState)
在接收到新的props或state时是否重新渲染，默认返回true；首次渲染或forceUpdate时不会触发; 判断是否需要更新组件，多用于组件性能优化

6. componentWillUpdate(nextProps, nextState)
如果shouldComponentUpdate返回false，update相关的函数都不会触发；不要使用setState；

7. componentDidUpdate(prevProps, prevState, snapshot)  这边的snapshot是 getSnapshotBeforeUpdate方法的返回值
prevProps和prevState这两个参数指的是组件更新前的props和state

8. componentWillUnmount
卸载组件
## 新增两个
1. static getDerivedStateFromProps 
会在初始化和update时触发，用于替换componentWillReceiveProps，可以用来控制 props 更新 state 的过程；它返回一个对象表示新的 state；如果不需要更新，返回 null 即可
2. getSnapshotBeforeUpdate
用于替换 componentWillUpdate，该函数会在update后 DOM 更新前被调用，用于读取最新的 DOM 数据，返回值将作为 componentDidUpdate 的第三个参数


## red blue
<!-- parent父组件 state -->
{
  theme: 'red'
}
层层传递下去
父组件 -> 子组件 -> 孙子组件
context 可以跨层级传递值
1. 父组件通过 getContext 返回提供的 context 内容
2. 父组件  .childContextTypes 定义提供的 context 类型
3. 子组件 获取 .contextTypes 定义接受的类型  this.context 获取
4. 例如vuex 全局数据 改变麻烦  全局数据很危险

## 16版本之前的问题
跨层级传递的时候, 假如中间某一组件使用了 shouldComponentUpdate return false 以后 会导致 后代不会更新 context 的数据

## 16.x.x
1. 构造 Provider Consumer
2. 父组件 <Provider value={} /> 提供数据
3. 后代组件 <Consumer>{ () => {}}</Consumer> 获取到父组件穿过来的数据

  state = {
    theme: 'purple',
    toggle: this.handleToggleTheme
  }
  静态属性 无法获取 实例的 this

## 一切皆组件
配置 静态路由
动态路由

/post/abcdedfg  pathname
?type=all&a=1  search

## function组件 && class组件 区别
function component ( dumd component ) 根据 props 渲染, 不会依赖任何东西  性能好
class component ( smart component ) 负责状态管理 复杂 依赖于其他组件

## react状态管理
- redux mobx
应用的状态放在全局的位置
var a = 1
定制了一套更改数据的流程  难
## action
它是一个 js {}
干什么 放到 type属性上 type: 'INCREMENT'
传递数据

## 异步action
redux-thunk的作用就是让dispatch方法不仅仅只接收action对象，还可以包含一个方法。我们可以在这个方法内部去调用异步代码

## Reducer 
函数 更新 store

## store 
存数据的地方

## this.props.children
this.props.children 的值有三种可能：如果当前组件没有子节点，它就是 undefined ;如果有一个子节点，数据类型是 object ；如果有多个子节点，数据类型就是 array 。所以，处理 this.props.children 的时候要小心。

React 提供一个工具方法 React.Children 来处理 this.props.children 。我们可以用 React.Children.map 来遍历子节点，而不用担心 this.props.children 的数据类型是 undefined 还是 object。

## 获取真实的DOM节点
组件并不是真实的 DOM 节点，而是存在于内存之中的一种数据结构，叫做虚拟 DOM （virtual DOM）。只有当它插入文档以后，才会变成真实的 DOM 。根据 React 的设计，所有的 DOM 变动，都先在虚拟 DOM 上发生，然后再将实际发生变动的部分，反映在真实 DOM上，这种算法叫做 DOM diff ，它可以极大提高网页的性能表现。
但是，有时需要从组件获取真实 DOM 的节点，这时就要用到 ref 属性

## react-hoc 
high order component react高阶组件
高阶函数 接受一个函数作为参数 返回一个函数
高阶组件 接受一个函数作为组件 返回一个组件

## 组件

## @方法名
ES7 里面的 装饰器 decorator
Decorator是一个函数，用来修改类或者类的属性的行为。
说的直白点decorator就是给类添加或者修改类的变量与方法的。
yarn eject
cnpm i @babel/plugin-proposal-decorators -D

## 装饰者模式 && 装饰器decorator && AOP-面向切面编程
装饰器可以改变类的行为，也可以改变方法的行为。
装饰器不能用于函数，因为存在函数提升问题。
装饰器接受三个参数，因为它本质上是利用了 ES5 的 Object.defineProperty 属性，这三个参数其实是和 Object.defineProperty 参数一致的，因此不能更改。
1. 第一个参数是要装饰的对象target
2. 第二个参数是对象的属性名key
3. 第三个参数是该属性的描述对象descriptor


## nvm 
nvm install v8.14.0
nvm use 8.14.0
nvm list

## umi
umi 可拔插的React企业级开发框架
yarn global add umi
- 约定式的路由
- 开箱即用
- umi generate page index
  自建路由, 显示页面级路由组件
- umi dev
- umi pages/ 约定文件即路由
- umi 内有react-router, 封装了umi/link umi/router

## react ref
可以通过React.createRef()创建Refs并通过ref属性联系到React组件。Refs通常当组件被创建时被分配给实例变量，这样它们就能在组件中被引用。
```
class MyComponent extends React.Component {
  constructor(props) {
    super(props);
    this.myRef = React.createRef();
  }
  render() {
    return <div ref={this.myRef} />;
  }
}
```
当一个ref通过render放入一个元素中，一个对节点的引用可以通过ref的current属性得到；
const node = this.myRef.current;

## super关键字
1. 调用super的原因：在ES6中，在子类的constructor中必须先调用super才能引用this。
2. super(props)的目的：在constructor中可以使用this.props。

对比es5和es6可以发现在es5实现继承，在es5中实现继承:
1. 首先得先调用函数的call方法把父类的属性给继承过来
2. 通过new关键字继承父类原型的对象上的方法和属性
3. 最后再通过手动指定constructor属性指向子类对象
sup 父类
而在es6中实现继承，直接调用super(name)，super是代替的是父类的构造函数，super(name)相当于sup.prototype.constructor.call(this, name).

## Concurrent mode
async mode
让 react 的整体渲染有优先级的排比
js 单线程
浏览器 是多线程的
1. ui 线程
2. js 线程
3. 事件
4. http
js 线程和 ui线程是互斥的: js 可以操作 dom

