<template>
  <div>
    番禺项目Navbar组件
    <nav-bar :nameArr="data" :selected="selected" @event="event1"></nav-bar>
    <!-- tab-container -->
    <!-- <mt-tab-container v-model="selected">
      <mt-tab-container-item id="1">
        第一屏
      </mt-tab-container-item>
      <mt-tab-container-item id="2">
        第二屏
      </mt-tab-container-item>
      <mt-tab-container-item id="3">
        第三屏
      </mt-tab-container-item>
    </mt-tab-container>-->
    <div class="postcss-pxtorem">ouyangxinghua</div>
    <!-- <i class="iconfont" style="color: #fff">{{who === '实时链路' ? &#xe66d; : &#xxxxx;}}</i> -->
    <div class="icon" v-html="value">{{value}}</div>
    <img :src="rwmURL | imgFilter" alt="二维码" />
  </div>
</template>

<script>
import { Navbar, TabItem } from "mint-ui";
import NavBar from "@/components/public/Navbar";
export default {
  name: "index",
  data() {
    return {
      data: [
        "暂存",
        "申请",
        "材料审核欧阳兴华",
        "受理",
        "内部审批",
        "内部审批完成",
        "内部审批结束",
        "结束",
        "退出"
      ],
      // data: ['阶段一','阶段二', '阶段三', '阶段四','1'],
      selected: "1",
      value: "",
      rwmURL: "http://zwfw.guilin.gov.cn:80/ApprReserveInterface/api/takenumber/download/QRCode.v?myNum=XAB013"
    };
  },
  filters: {
    /**
     * 二维码链接过滤
     */
    imgFilter(url) {
      if (!url) {
        return "";
      }
      let arr = url.split("/ApprReserveInterface");
      return "/MobileBooking/ApprReserveInterface" + arr[1];
      // return arr[0] + "/MobileBooking/ApprReserveInterface" + arr[1];
    }
  },
  created() {
    this.initFont()
  },
  methods: {
    event1(data) {
      //   console.log('111', data)
      this.selected = String(data);
    },
    initFont() {
      let font;
      let name = '实时链路'; //name值为动态的
      if (name === "实时链路") {
        font = "&#xe66d;";
      } else if (name === "离线链路") {
        font = "&#xxxxx;";
      } else if (name === "考虑到后续需求开发还会增加其他链路") {
        font = "&#kkkkk;";
      }
      // else if等等....
      this.value = `<i class="iconfont">${font}</i>`;
    }
  },
  components: {
    NavBar
  }
};
</script>

<style lang="scss" scoped>
.postcss-pxtorem {
  font-size: 30px;
}
.iconfont {
  font-size: 20px;
  width: 20px;
  height: 20px;
  color: red;
}
</style>