<template>
  <div class="main-container">
    <div class="mask-container">
      <div class="mask-left mask"></div>
      <div class="mask-right mask"></div>
    </div>
    <div class="Navbar-container" id="parent">
      <template v-for="(item,index) in nameArr">
        <div
          class="slide-item"
          :key="index"
          @click="clickItem(index)"
          :class="currentIndex === index ? 'isActive' : ''"
        >{{item}}</div>
      </template>
    </div>
  </div>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      currentIndex: 0
    };
  },
  props: ["nameArr", "selected"],
  methods: {
    initScroll() {
      let parentWidth = document.getElementById("parent").offsetWidth;
      console.log("parentWidth", parentWidth);
      let childArr = document.getElementsByClassName("slide-item");
      let allNum = 0;
      for (let i = 0; i < childArr.length; i++) {
        allNum = allNum + childArr[i].offsetWidth;
      }
      console.log("allNum", allNum);
      if (allNum - parentWidth > 50) {
        document.getElementById("parent").scrollLeft = 35;
      }
    },
    clickItem(index) {
      this.currentIndex = index;
      this.$emit("event", this.currentIndex + 1);
    }
  },
  mounted() {
    // 初始化滚动条位置，当超出时，前移一点，这样用户才知道是能滚动的
    this.initScroll();
  }
};
</script>

<style lang="scss" scoped>
.main-container {
  position: relative;
}
.Navbar-container {
  position: relative;
  margin-top: px2rem(200px);
  height: px2rem(98px);
  display: -webkit-box;
  overflow-x: scroll;
  overflow-y: hidden;
  -webkit-overflow-scrolling: touch;
//   background-color: red;
  &::-webkit-scrollbar {
    width: 0;
    height: 0;
    display: none;
  }
  .slide-item {
    padding: px2rem(32px) px2rem(48px);
    height: px2rem(35px);
    font-size: px2rem(30px);
  }
  .isActive {
    position: relative;
    color: #3583d7;
    &::after {
      content: "";
      width: px2rem(50px);
      height: px2rem(4px);
      background-color: #3583d7;
      position: absolute;
      top: 76%;
      left: 50%;
      transform: translate(-50%, -50%);
    }
  }
}
.mask-container {
  height: px2rem(98px);
  width: px2rem(750px);
  position: absolute;
  bottom: 0;
  left: 0;
  .mask {
    width: px2rem(60px);
    height: px2rem(98px);
    z-index: 100;
  }
  .mask-left {
    position: absolute;
    top: 0;
    left: 0;
    background-image: linear-gradient(
      to left,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1)
    );
  }
  .mask-right {
    position: absolute;
    top: 0;
    right: 0;
    background-image: linear-gradient(
      to right,
      rgba(255, 255, 255, 0),
      rgba(255, 255, 255, 1)
    );
  }
}
</style>