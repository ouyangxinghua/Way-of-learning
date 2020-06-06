import Vue from 'vue'
import App from './App.vue'
import router from './router'
import echarts from 'echarts'

Vue.prototype.$echarts = echarts
Vue.config.productionTip = false

// new Vue({
//   el: '#app',
//   router,
//   components: { App },
//   template: '<App/>'
// })
Vue.mixin({
  data() {
    console.log(`${this.$options.name}: data (from Minxin)`,)
    return {
      name: 'Minxin2'
    }
  },
  beforeCreate() {
    console.log(`${this.name}: beforeCreate (from Minxin)`)
  },
  mounted(){
    console.log(`${this.name}: mounted (from ${this.form()})`)
  },
  methods: {
    from() {
      return 'Mixin3'
    }
  }
})
new Vue({
  name: "Root1",
  data() {
    console.log('Root, data (from Root)')
    return {
      name: 'Root2',
    }
  },
  mounted() {
    console.log('Root, mounted (from Root)')
  },
  methods: {
    from() {
      return 'Root3'
    }
  },
  render: h => h(App)
}).$mounted('#app')

