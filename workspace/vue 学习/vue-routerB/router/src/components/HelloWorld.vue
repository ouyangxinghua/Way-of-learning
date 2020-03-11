<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
  </div>
</template>

<script>
export default {
  name: "HelloWorld",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  beforeRouteEnter (to, from, next) {  //从别的页面跳到HelloWorld触发
    console.log('beforeRouteEnter',from, to,);
    next();
  },
  beforeRouteLeave (to, from, next) {  //从HelloWorld离开到别的页面触发
    console.log('beforeRouteLeave',from, to);
    next();
  },
  beforeRouteUpdate(to, from, next) {
    console.log('进入update路由钩子')
    console.log(to, from);
    next()
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
