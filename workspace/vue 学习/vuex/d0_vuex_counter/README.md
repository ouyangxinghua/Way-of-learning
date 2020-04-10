- data 是组件自有数据, 没有多少
  思考会不会被共享, 应用层共享的, 只要多于一个组件要用, 且关系不是简单的兄弟, 就用vuex

- 共享状态,
  vuex state 管辖
  只有 mutations 才能修改
  actions 被触发动作, 提交 mutations
  getters 对state的包装

mapActions mapGetters  引入组件

Vuex源码分析

https://segmentfault.com/a/1190000016256277  解读Vue.use()源码
https://juejin.im/entry/596ba01df265da6c4e7f86e5   你想要的 —— Vuex源码分析
https://www.jianshu.com/p/d667d27c10df   [Vue源码剖析]如何实现组件  (Vue.component(Button.name, Button);源码分析)
https://segmentfault.com/a/1190000019924674   从Vuex 模块化使用分析源码
https://www.cnblogs.com/greatdesert/p/11431007.html   vuex 源码分析(一) 使用方法和代码结构
https://juejin.im/post/5cafeb515188251aeb3ec6a2   [Vue.js进阶]从源码角度剖析Vue的生命周期
https://www.jqhtml.com/54255.html  手写vue-router插件