<template>
  <div>
    <h1>外面传来的值{{value}}</h1>
    <input type="text" :value="value" @input="$emit('input', $event.target.value)">
  </div>
</template>

<script>
export default {
  name: "model",
  data() {
    return {};
  },
  props: ['value'],
//   https://www.html.cn/qa/vue-js/17210.html   vue.js自定义组件怎么用v-model？
//   model: {
//     prop: "value",
//     event: "input"
//   },
  methods: {
  }
};
</script>

<style lang="scss" scoped>
</style>