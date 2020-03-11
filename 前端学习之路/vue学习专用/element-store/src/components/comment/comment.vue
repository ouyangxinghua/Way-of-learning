<template>
  <div class="container" ref="container">
    <score :score="seller.score"
    :rankRate="seller.rankRate"
    :deliveryTime="seller.deliveryTime"
    :serviceScore="seller.serviceScore"
    :foodScore="seller.foodScore"></score>
    <div class="content">
      <div class="content-top">
        <div class="box quanbu">全部 {{seller.ratingCount}}</div>
        <div class="box manyi">满意 18</div>
        <div class="box nomanyi">不满意 6</div>
      </div>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
import score from "../score/score";
export default {
  components: {
    score
  },
  props: {
    seller: {
      type: Object
    }
  },
  name: "comment",
  methods: {},
  created() {
    console.log(this.seller);
    this.$nextTick(() => { //页面渲染完成才能执行
        this.meunScroll = new BScroll(this.$refs.container, {
        click: true
      })
    })
  }
};
</script>

<style lang="stylus" scoped>
@import '../../common/stylus/mixin.styl'
.container 
  background-color #f1f4f6
  .content
    width 100%
    background-color #fff
    .content-top
      width 100%
      height 70px
      box-sizing border-box
      padding 18px 0 18px 16px
      border-bottom 1px solid rgba(7, 17, 27, 0.1)
      .box
        display inline-block
        width 65px
        height 33px
        text-align center
        line-height 33px
        border-radius 5px
        font-size 12px
        margin-right 10px
      .quanbu
        background-color #0896d1
        color #fff
      .manyi
        background-color #cdeaf8
        color #566871
      .nomanyi
        background-color #d7dadc
        color #566871
</style>
