<template>
  <section class="hello">
    <div class="scroll-box">
      <textscroll :dataList="data" scrolltype="scroll-up"></textscroll>
    </div>
    <div class="scroll-box">
      <textscroll :dataList="data" scrolltype="scroll-left"></textscroll>
    </div>
  </section>
</template>

<script>
import textscroll from './textscroll'
export default {
  data(){
    return {
      data:[
        {text: '坚持'},
        {text: '不要脸'},
        {text: '坚持不要脸'},
        {text: '蜗牛'}
      ]
    }
  },
  components: {
    textscroll
  }
}
</script>

<style scoped>
.scroll-box{
  background-color: #f9f9f9;
  border: 1px solid #e7e8e9;
  border-radius: 5px;
}
.hello{
  width: 300px;
  background-color: #f9f9f9;
  border: 1px solid #e7e8e9;
  overflow: hidden;
  padding: 10px;
  box-sizing: border-box;
}
</style>


