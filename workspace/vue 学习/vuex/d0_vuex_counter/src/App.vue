<template>
  <div id="app">
    <button @click="jianshao">-</button>
    {{num.count}} 次, count is {{eventOrOdd}}
    <button @click="zengjia">+</button>
    <button @click="incrementIfOdd">incrementIfOdd</button>
    <button @click="incrementAsync">incrementAsync</button>
    <button @click="zhijiexiugai">zhijiexiugai</button>
    <v-index :obj='obj' :number="number"></v-index>
  </div>
</template>

<script>
import Index from '@/components/index'
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  data(){
    return {
      num : this.$store.state,  //这样会响应式的原因是引用类型深浅拷贝导致的问题
      obj: {
        number: '10'
      },
      number: '20'
    }
  },
  components: {
    'v-index': Index
  },
  computed: {
    ...mapGetters(["eventOrOdd"]),
    // num(){
    //   return this.$store.state.count  //这样就相当于给count加上了响应式功能(源码defineReactive函数)
    // }
  },
  methods: {
    ...mapActions(["zengjia", "jianshao", "incrementIfOdd", "incrementAsync"]),
    zhijiexiugai(){
      this.$store.state.count = 10  //开启严格模式之后这样修改就会报错
    }
  }
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
