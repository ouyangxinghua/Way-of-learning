<template>
  <div>
    <ul>
      <slot name="item" v-for="item in items" :tex="item.text"></slot>
    </ul>
    <slot name="second" :text="next.name"></slot>
  </div>
</template>

<script>
export default {
  name: "child",
  data() {
    return {
      next: {
        name: "欧阳兴华"
      },
      takeNumData: {
        winNum: '三楼三号'
      }
    };
  },
  props: ["items"]
};
</script>

<style scoped>
</style>