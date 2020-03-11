<template>
  <div class="container">
    <Child :sendMsg="test"></Child>
  </div>
</template>

<script>
import Child from "./child.vue";
export default {
  name: "demo1",
  data() {
    return {
      test: {
        message: "ndjks",
        date: "2019-6-11",
        age: "18"
      }
    };
  },
  components: {
    Child
  }
};
</script>

<style scoped>
</style>


