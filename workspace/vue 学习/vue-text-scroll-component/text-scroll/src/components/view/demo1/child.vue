<template>
  <div class="container">{{sendMsg.message}}</div>
</template>

<script>
export default {
  name: 'demoChild1',
  data () {
    return {

    }
  },
  props: {
    sendMsg: {
      type: String,
      require: true
    }
  },
}
</script>

<style scoped>

</style>


