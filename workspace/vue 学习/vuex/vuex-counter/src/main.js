// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue' //MVVM
import App from './App' //根组件
import store from './store'; //统一管理应用状态
// SPA
new Vue({
  el: '#app',
  store,
  render: h => h(App)
})
