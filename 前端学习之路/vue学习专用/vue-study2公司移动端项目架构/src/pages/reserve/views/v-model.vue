<template>
  <div>
    <input type="text" v-model.number="message">  
    <h1>{{message}}</h1>
    <h1>model组件双向绑定的值{{test}}</h1>
    <!-- v-model等价于下面  -->
    <!-- <input type="text" :value="message" @input="ouyang($event)"/>
    <h1>{{message}}</h1> -->
    <!-- 在组件上使用v-model -->
    <!-- <Model :value="test" @input="test = $event"></Model> -->
    <Model v-model.number="test"></Model>  
    <!-- 当v-model用在组件上时，那几个修饰符不生效，可看源码知晓 -->
    <button @click="addNumber">按钮</button>
  </div>
</template>

<script>
import Model from '@/components/public/model.vue'
export default {
  name: "vmodel",
  // https://blog.csdn.net/fabulous1111/article/details/85265503  v-model实现原理
  data() {
    return {
      message: "",
      test: ''
    };
  },
  components: {
      Model
  },
  methods: {
      ouyang(e){
          this.message = e.target.value;
      },
      addNumber(){
          this.test = 'ouyang'
      }
  },
};
</script>

<style lang="scss" scoped>
h1 {
    margin-top: 100px;
}
</style>