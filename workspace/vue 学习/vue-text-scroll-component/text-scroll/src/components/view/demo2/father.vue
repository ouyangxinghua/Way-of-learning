<template>
  <div class="container">
    {{msg}}
    <Child @wn='getWn'></Child>
  </div>
</template>

<script>
import Child from "./child.vue";
export default {
  name: "demo2",
  data() {
    return {
      msg:''
    }
  },
  components: {
    Child
  },
  methods: {
    getWn (data){
      this.msg = data
    }
  }
};
</script>

<style scoped>
</style>


