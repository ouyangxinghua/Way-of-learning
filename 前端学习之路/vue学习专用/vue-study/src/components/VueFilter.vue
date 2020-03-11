<template>
  <div>
    <div>
      takeNumData.winNum
      {{takeNumData.winNum | numFilter}}
    </div>
  </div>
</template>

<script>
export default {
  name: "filter",
  data() {
    return {
      next: {
        name: "欧阳兴华"
      },
      takeNumData: {
        winNum: ['a','b']
      }
    };
  },
  filters: {
    /**
     * 数组过滤
     */
    numFilter(arr) {
      if (!arr) {
        return "";
      }
      return arr.join(",");
    }
  }
};
</script>

<style scoped>
</style>