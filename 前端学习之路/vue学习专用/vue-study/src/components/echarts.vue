<template>
  <div>
    <div id="myChart1" :style="{width: '300px', height: '300px'}"></div>
    <div id="myChart2" :style="{width: '300px', height: '300px'}"></div>
    <div id="myChart3" :style="{width: '300px', height: '300px'}"></div>
  </div>
</template>

<script>
export default {
  name: "echarts",
  data() {
    return {
      msg: "Welcome to Your Vue.js App"
    };
  },
  mounted() {
    console.log(this.$route.query.name)
    this.drawLine();
    this.drawMap();
    this.drawBall();
  },
  methods: {
    drawLine() {
      // 基于准备好的dom，初始化echarts实例
      let myChart1 = this.$echarts.init(document.getElementById("myChart1"));
      // 绘制图表
      myChart1.setOption({
        title: { text: "在Vue中使用echarts" },
        tooltip: {},
        xAxis: {
          data: ["衬衫", "羊毛衫", "雪纺衫", "裤子", "高跟鞋", "袜子"]
        },
        yAxis: {},
        series: [
          {
            name: "销量",
            type: "bar",
            data: [5, 20, 36, 10, 10, 20]
          }
        ]
      });
    },
    drawMap() {
      let myChart2 = this.$echarts.init(document.getElementById("myChart2"));
      myChart2.setOption({
        title: { text: "在Vue中使用echarts" },
        xAxis: {
          type: "category",
          data: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
        },
        yAxis: {
          type: "value"
        },
        series: [
          {
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: "line"
          }
        ]
      });
    },
    drawBall() {
      let myChart3 = this.$echarts.init(document.getElementById("myChart3"));
      myChart3.setOption({
        backgroundColor: "#000",
        globe: {
          baseTexture: ROOT_PATH + "data-gl/asset/earth.jpg",
          heightTexture:
            ROOT_PATH + "data-gl/asset/bathymetry_bw_composite_4k.jpg",
          displacementScale: 0.1,
          shading: "lambert",
          environment: ROOT_PATH + "data-gl/asset/starfield.jpg",
          light: {
            ambient: {
              intensity: 0.1
            },
            main: {
              intensity: 1.5
            }
          },
          layers: [
            {
              type: "blend",
              blendTo: "emission",
              texture: ROOT_PATH + "data-gl/asset/night.jpg"
            },
            {
              type: "overlay",
              texture: ROOT_PATH + "data-gl/asset/clouds.png",
              shading: "lambert",
              distance: 5
            }
          ]
        },
        series: []
      });
    }
  }
};
</script>

<style scoped>
</style>