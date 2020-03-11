<template>
  <div class="container">
    <button @click="sendMsg">ok</button>
  </div>
</template>

<script>
export default {
  name: 'demoChild2',
  data () {
    return {
      message: 'nfdsjf'
    }
  },
  methods: {
    sendMsg(){
    this.$emit('wn', this.message)
    }
  }
}
</script>

<style scoped>

</style>


