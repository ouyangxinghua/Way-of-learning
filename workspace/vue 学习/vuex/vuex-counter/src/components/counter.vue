<template>
  <div>
    {{$store.state.count}} times,
    <button @click="increment">+</button>
  </div>
</template>
两个组件都要用到count 状态， 怎么办？
<script>
export default {
  methods: {
    increment () {
    }
  }
}
</script>

<style>

</style>
