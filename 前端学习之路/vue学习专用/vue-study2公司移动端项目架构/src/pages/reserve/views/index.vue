<template>
  <div>
    番禺项目Navbar组件
    <nav-bar :nameArr="data" :selected="selected" @event="event1"></nav-bar>
    <!-- tab-container -->
    <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        第一屏
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        第二屏
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        第三屏
      </mt-tab-container-item>
    </mt-tab-container>
  </div>
</template>

<script>
import { Navbar, TabItem } from "mint-ui";
import NavBar from "@/components/public/Navbar";
export default {
  name: "index",
  data() {
    return {
        data: ['暂存','申请', '材料审核欧阳兴华', '受理','内部审批', '内部审批完成', '内部审批结束', '结束','退出'],
        // data: ['阶段一','阶段二', '阶段三', '阶段四','1'],
        selected: '1'
    };
  },
  methods: {
      event1(data){
        //   console.log('111', data)
          this.selected = String(data)
      }
  },
  components: {
    NavBar
  }
};
</script>

<style lang="scss" scoped>
</style>