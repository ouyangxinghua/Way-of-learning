## 命令行
vue init webpack router
项目文件名 router

##--save表示，我们安装模块的时候，同时把它写到package.json 文件中。这时打开package.json 文件，我们看到多了一个dependencies字段，

##--save-dev 又是什么，它也表示安装依模块的时候，把它写到package.json中，不过它写入的不是dependencies, 而是devDependencies中。
devDependencies 和dependencies 有什么区别？dependencies: 是项目运行时的依赖，就是程序上线后仍然需要依赖，比如express, 我们程序就是用express 写的，如果没有express, 我们的程序根本无法运行，更直白一点，dependencies 就是我们在程序开发的过程中手动require的模块。进行express 开发时,server.js中，都会写  var express  = require(‘express’), 我们程序直接依赖，所以是dependencies. 
---------------------
devDependencies, 开发依赖，就是我们在开发过程中需要的依赖。比如babel, 它只负责转换es6+ 到es5， 转换完成后，我们只要转换后的代码，上线的时候，直接把转换后的代码部署上线，不需要bebal.  这就是开发依赖，只在开发时候起作用， 上线不需要。其实就是我们在使用webpack开发时，它配置文件里所有的依赖，都是开发依赖。
--------------------- 
-----------------------
单向绑定就是把Model绑定到View，当我们用JavaScript代码更新Model时，View就会自动更新。
而双向绑定就是如果用户更新了View，Model的数据也自动被更新了，这种情况就是双向绑定。
-------------------------------------
##
v-bind指令用于给html标签设置属性。
v-on:事件名称=“方法名”（事件绑定）
<el-form> -> ref：表单被引用时的名称，标识
<el-form> -> rules：表单验证规则 
绑定ref的子组件或者html,都存放在$refs,所以使用$refs.xx的形式可以调用，有些类似dom。 可以减少获取dom节点的消耗了, 提高性能

ref 与 $refs 有点类似id 与document ,ref用户注册调用的部分，相当于 id绑定，注册完以后，通过$refs.xxx来使用。vue中发现都用这种注册ref的方式来获取dom元素。

如果在DOM结构中的某个DOM节点使用了v-if、v-show或者v-for(*即根据 获得的后台数据 或 父组件/路由传递过来的参数来动态操作DOM，即响应式）， 那么这些DOM是不会再mounted阶段找到的。

在**update阶段使用this.$refs.xxx，**就100%能找到该DOM节点.updated与mounted不同的是，在每一次的DOM结构更新，vue都会调用一次updated(){}钩子函数！而mounted仅仅只执行一次而已


<h1 v-if="error">Error!</h1>这部分在运行后没有生成  v-if  条件渲染
条件展示 v-show 如果条件为false，运行后，还是生成了条件为false所在的标签，但是只是让其display属性为none，即该标签不进行显示，看下面的代码。
1. 性能消耗：v-if有更高的切换消耗；v-show有更高的初始渲染消耗；
2. 使用场景：v-if适合运营条件不大可能改变；v-show适合频繁切换。

##回调函数和钩子函数的区别 
用一句话来形容一下：钩子是将需要执行的函数或者其他一系列动作注册到一个统一的入口，程序通过调用这个钩子来执行这些已经注册的函数。

根本上，他们都是为了捕获消息而生的，但是钩子函数在捕获消息的第一时间就会执行，而回调函数是在整个捕获过程结束时，最后一个被执行的。

回调函数其实就是调用者把回调函数的函数指针传递给调用函数，当调用函数执行完毕时，通过函数指针来调用回调函数。



1. 通过props可以实现父组件向子组件发送数据
2. 通过自定义事件可以实现子组件向父组件发送数据
3. 兄弟组件数据通讯除了借助共同的父组件做为通讯桥梁之外，还可以通过eventBus来让兄弟之间组件进行数据通讯


命令式编程的主要思想是关注计算机执行的步骤，即一步一步告诉计算机先做什么再做什么。

声明式编程是以数据结构的形式来表达程序执行的逻辑。它的主要思想是告诉计算机应该做什么，但不指定具体要怎么做。

函数式编程和声明式编程是有所关联的，因为他们思想是一致的：即只关注做什么而不是怎么做。但函数式编程不仅仅局限于声明式编程。

函数式编程最重要的特点是“函数第一位”，即函数可以出现在任何地方，比如你可以把函数作为参数传递给另一个函数，不仅如此你还可以将函数作为返回值。大部分常见的编程语言一半都已经提供了对这种编程方式的支持，比如 JavaScript，再有 C# 中的 LINQ 和 Java 中的 Lambda 和闭包的概念。


##flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。
flex-grow: 定义项目的放大比例
flex-shrink: 定义了项目的缩小比例
flex-basis: 定义了在分配多余空间之前，项目占据的主轴空间，浏览器根据这个属性，计算主轴是否有多余空间

##this.$nextTick()

<!-- 在下次 DOM 更新循环结束之后执行延迟回调。在修改数据之后  立即使用这个方法， 获取更新后的 DOM。-->
同一事件循环中的代码执行完毕 -> DOM 更新 -> nextTick callback触发

process.nextTick 永远大于 promise.then

1. nextTick的由来：
由于VUE的数据驱动视图更新，是异步的，即修改数据的当下，视图不会立刻更新，而是等同一事件循环中的所有数据变化完成之后，再统一进行视图更新。
2. nextTick的触发时机：
在同一事件循环中的数据变化后，DOM完成更新，立即执行nextTick(callback)内的回调。

1. 一般js是从上往下执行的，执行的时候会被放在调用栈中（图中的Call Stack）。
2. 然后执行到了异步的事件（Ajax、定时器等），浏览器将作为Web api的一部分创建一个计时器，它将为你处理倒计时。
3. 时间到了之后就会进入到任务队列当中（Callback Queue）。
4. 事件循环从回调队列中获取函数，并将其推到调用堆栈。
5. 从第一步开始。


render:h=>h(App)是ES6中的箭头函数写法，等价于render:function(h){return h(App);}.

h是creatElement的别名，vue生态系统的通用管理

Vue 在插入、更新或者移除 DOM 时，提供多种不同方式的应用过渡效果。

<keep-alive> 包裹动态组件时，会缓存不活动的组件实例，而不是销毁它们。


## Object.defineProperty(obj, prop, desc)  vue就是通过它实现双向绑定
Object.defineProperty(obj, key , {
    configurable: false, // 是否可被删除
    enumerable: false, // 是否可枚举
    writable: false， // 是否可修改
    value: undefined  // 默认值 
}) 
1. obj 需要定义属性的当前对象
2. prop 当前需要定义的属性名
3. desc 属性描述符
- 属性
在 descriptor 中不能 同时设置访问器 (get 和 set) 和 wriable 或 value，否则会错，就是说想用(get 和 set)，就不能用（wriable 或 value中的任何一个）

1. value:属性的值(不用多说了)
2. writable:如果为false，属性的值就不能被重写,只能为只读了
3. configurable:总开关，一旦为false，就不能再设置他的（value，writable，configurable）
configurable控制该变量是否可删除，默认为false，我们可以通过delete关键字来测试下，发现尽管使用delete删除了该变量，for in 还是可以遍历出来，说明是不能删除的，当其值为true则可以。
4. enumerable:是否能在for...in循环中遍历出来或在Object.keys()中列举出来。 
5. 一个给属性提供 getter 的方法(访问对象属性时调用的函数,返回值就是当前属性的值)，如果没有 getter 则为 undefined。该方法返回值被用作属性值。默认为 undefined
6. 一个给属性提供 setter 的方法(给对象属性设置值时调用的函数)，如果没有 setter 则为 undefined。该方法将接受唯一参数，并将该参数的新值分配给该属性。默认为undefined


1. Object.defineProperty() 方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性， 并返回这个对象。如果不指定configurable, writable, enumerable ，则这些属性默认值为false，如果不指定value, get, set，则这些属性默认值为undefined
2. Object.defineProperties() 方法直接在一个对象上定义一个或多个新的属性或修改现有属性，并返回该对象。
3. Object.getOwnPropertyDescriptor() 该方法返回指定对象上一个自有属性对应的属性描述符。（自有属性指的是直接赋予该对象的属性，不需要从原型链上进行查找的属性）



