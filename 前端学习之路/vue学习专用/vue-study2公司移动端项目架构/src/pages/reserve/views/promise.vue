<template>
  <div>jinmengyao</div>
</template>

<script>
import { cors } from '@/utils/reserve.url.js'
export default {
  name: "jinmengyao",
  data() {
    return {
        message: ''
    };
  },
  methods: {},
  created() {
      let param = {}
      cors(param, "get", res => {
          console.log(res)
      })
  }
};
</script>

<style lang="scss" scoped>
</style>