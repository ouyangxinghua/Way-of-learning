<template>
  <section>
    <div class="textscroll">
      <transition-group tag="ul" :name="scrolltype">
        <li v-for="(item, index) in dataList" :key="index" v-show="index === count">
          <p>{{item.text}}</p>
        </li>
      </transition-group>
    </div>
  </section>
</template>

<script>
export default {
  data () {
    return {
      count: 0
    }
  },
  props: ['scrolltype', "dataList"],
  created(){
    setInterval(() => {
      this.getText()
    },2000)
    // setTimeout(() => {
    //   this.count++;
    //   console.log(this.count)
    // },1000)
  },
  methods: {
    getText() {
      let length = this.dataList.length;
      if(length === 0){
      return;
    }
    if(this.count === length-1){
      this.count = 0;
    }else{
      this.count++;
    }
    console.log(this.count)
    }
  }
}
</script>

<style scoped>
ul {
  margin: 5px 0;
  padding: 0;
  background-color: #ffffff;
  overflow: hidden;
  height: 40px;
}
li {
  height: 40px;
  list-style-type: none;
  line-height: 1;
  overflow: hidden;
}
/* 从上滚动 */
.scroll-up-enter-active{
  transition: all 1s ease;
}
.scroll-up-leave-active {
  transition: all 1s ease;
}
.scroll-up-enter {
  transform: translate3d(0, 100%, 0);
}
.scroll-up-leave-to {
  transform: translate3d(0, -100%, 0);
}
/* 从上滚动 */
.scroll-left-enter-active{
  transition: all 1s ease;
}
.scroll-left-leave-active {
  transition: all 1s ease;
}
.scroll-left-enter {
  transform: translate3d(100%, 0, 0);
}
.scroll-left-leave-to {
  transform: translate3d(-100%, 0, 0);
}
</style>

