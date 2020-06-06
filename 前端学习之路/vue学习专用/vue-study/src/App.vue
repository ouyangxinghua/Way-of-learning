<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "App1",
  data() {
    console.log("App, data (from App)");
    return {
      name: "App2"
    };
  },
  mounted() {
    console.log("App, mounted (from App)");
  },
  methods: {
    from() {
      return "App3";
    }
  },
  render: h => h('h1')
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
