<template>
  <div>
    {{obj.number}}
    {{number}}
    <button @click="zhijiexiugaiProps">直接修改props</button>
  </div>
</template>

<script>
  export default {
    name: 'index',
    data(){
      return {

      }
    },
    props: ['obj', 'number'],
    methods: {
      // 子组件其实也可以直接修改props的值，不过前提是不能修改props变量的内存地址，如果是引用类型，直接修改不会报错。
      zhijiexiugaiProps(){
        console.log(this.number)
        this.number = '30'
      }
    }
  }
</script>
<style scoped>

</style>