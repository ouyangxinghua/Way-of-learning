<template>
  <div id="app">
    <button @click="jianshao">-</button>
    {{$store.state.count}} 次, count is {{eventOrOdd}}
    <button @click="zengjia">+</button>
    <button @click="incrementIfOdd">incrementIfOdd</button>
    <button @click="incrementAsync">incrementAsync</button>
  </div>
</template>

<script>
import { mapActions, mapGetters } from "vuex";
export default {
  name: "App",
  components: {},
  computed: mapGetters(
    ['eventOrOdd']
  ),
  methods: mapActions([
    "zengjia",
    "jianshao",
    "incrementIfOdd",
    "incrementAsync"
  ])
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
