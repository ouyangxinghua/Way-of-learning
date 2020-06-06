<template>
  <div id="app">
    <!-- <base-header v-if="!isWechat" :title="title" @back="goBack"></base-header>
    <div :class="['main', isShowHead ? 'main-showhead' : '']">
      <router-view></router-view>
    </div> -->
    djskla
  </div>
</template>

<script>
import BaseHeader from "@/components/public/header";

// export default {
//     name: 'app',
//     data() {
//         return {
//             isWechat: false,
//             title: '在线预约',
//         };
//     },
//     computed: {
//         isShowHead() {
//             return !this.isWechat;
//         }
//     },
//     watch: {
//         // 监听路由变化
//         $route(to, from) {
//             this.title = to.meta.title || '在线预约';
//         }
//     },
//     components: {
//         BaseHeader
//     },
//     methods: {
//         getTokenid(){
//             setTimeout(() => {
//                 this.$store.commit('setTokenid', 'tokeniddasd');
//             }, 2000)
//         },
//         goBack() {
//             this.$router.go(-1)
//         },
//         // 检查运行环境
//         checkEnv() {
//             const ua = navigator.userAgent.toLowerCase();
//             if (String(ua.match(/MicroMessenger/i)) === 'micromessenger') {
//                 this.isWechat = true;
//             } else {
//                 this.isWechat = false;
//             }
//         }
//     },
//     created() {
//         this.getTokenid()
//         this.checkEnv();
//     }
// };
export default {
  name: "App1",
  data() {
    console.log("App, data (from App)");
    return {
      name: "App2"
    };
  },
  mounted() {
    console.log("App, mounted (from App)");
  },
  methods: {
    from() {
      return "App3";
    }
  },
  render: h => h("h1")
};
</script>

<style lang="scss">
#app {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
}
.main {
  position: relative;
  box-sizing: border-box;
  width: 100%;
  height: 100%;
  overflow: auto;
}
.main-showhead {
  padding-top: px2rem(88px);
}
</style>
