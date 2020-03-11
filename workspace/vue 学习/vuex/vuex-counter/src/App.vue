<template>
  <div id="app">
    <counter/>
    <counter-brother/>
  </div>
</template>

<script>
import Counter from './components/counter'
import CounterBrother from './components/countBrother'
export default {
  name: 'App',
  data () {
    return {
    }
  },
  components: {
    'counter': Counter,
    'counterBrother' : CounterBrother
  },
  methods: {
  
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>
