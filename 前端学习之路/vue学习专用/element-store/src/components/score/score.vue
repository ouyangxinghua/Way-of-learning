<template>
    <div class="container">
      <div class="left">
        <div class="left-score">{{score}}</div>
        <p class="left-text">综合评分</p>
        <p class="left-pre">高于周边商家{{rankRate}}%</p>
      </div>
      <div class="right">
        <div class="flex-item right-top">
          <span>服务态度</span>
          <div class="star-con">
            <div class="star-service" v-for="(item, index) in number1" :key="index"></div>
            <div :class="num1 < 5 ? 'isPush' : 'push'"></div>
          </div>
          <span class="right-score">{{serviceScore}}</span>
        </div>
        <div class="flex-item right-middle">
          <span>商品评分</span>
          <div class="star-con">
            <div class="star-good" v-for="(item, index) in number2" :key="index"></div>
            <div :class="num2 < 5 ? 'isPush' : 'push'"></div>
          </div>
          <span class="right-score">{{foodScore}}</span>
        </div>
        <div class="flex-item right-bottom">
          <span>送达时间</span>
          <span class="time">{{deliveryTime}}分钟</span>
        </div>
      </div>
    </div>
</template>

<script>
export default {
  props:{
    score: {
      type: Number,
      default: 0
    },
    rankRate: {
      type: Number,
      default: 0
    },
    deliveryTime: {
      type: Number,
      default: 0
    },
    serviceScore:{
      type: Number,
      default: 0
    },
    foodScore:{
      type: Number,
      default: 0
    }
  },
  data() {
    return {
    }
  },
  computed:{
    number1(){
      let aa = Math.floor(this.serviceScore)
      return aa
    },
    number2(){
      let aa = Math.floor(this.foodScore)
      return aa
    },
    num1(){
      let nn = this.serviceScore.toString()
      let aa = Number(nn.substr(2,3))
      return aa
    },
    num2(){
      let nn = this.foodScore.toString()
      let aa = Number(nn.substr(2,3))
      return aa
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.container
  width 100%
  height 116px
  display flex
  background-color #fff
  padding 20px 24px 20px 13px
  border-1px(rgba(7,17,27,0.1))
  margin-bottom 30px
  .left
    flex 1
    border-right 1px solid rgba(7,17,27,0.1)
    padding 12px 16px 12px 0
    display flex
    flex-direction column
    justify-content space-between
    align-items center
    .left-score
      color #f68f15
      font-size 32px
    .left-text
      color rgb(0,0,0)
       font-size 15px
    .left-pre
      color #979b9f
      font-size 15px
  .right
    flex 1.5
    padding 7px 0 10px 18px
    display flex
    flex-direction column
    justify-content space-around
    align-items center
    .flex-item
      width 100%
      color rgb(0,0,0)
      font-size 15px 
      display flex
      justify-content flex-start
      align-items center
      .right-score
        color #f68f15
      .time
        color #979b9f
        margin-left 8px
      .star-con
        margin 0 8px 0 8px
        display flex
        justify-content flex-start
        align-items center
        .star-service
          width 16px
          height 16px
          bg-image2('star24_on')
          margin-right 4px
        .star-good
          width 16px
          height 16px
          bg-image2('star24_on')
          margin-right 4px
        .isPush
          width 16px
          height 16px
          bg-image2('star24_off')
          margin-right 4px
        .push
          width 16px
          height 16px
          bg-image2('star24_half')
          margin-right 4px
</style>
