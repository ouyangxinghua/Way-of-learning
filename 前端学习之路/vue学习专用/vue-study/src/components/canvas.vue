<template>
  <div class="signature">
    <!-- 电子签名 -->
    <div class="canvas">
      <canvas
        id="myCanvas"
        ref="canvas"
        :width="canvasWidth"
        :height="canvasHeight"
        @touchstart="touchStart"
        @touchmove="touchMove"
        @touchend="touchEnd"
        @mousedown="mouseDown"
        @mousemove="mouseMove"
        @mouseup="mouseUp"
      >您的浏览器不支持 HTML5 canvas 标签。</canvas>
    </div>
    <div class="save-btn" @click.stop.prevent="commit">提交签名</div>
    <div class="clear-btn" @click.stop.prevent="clear">清空</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      canvasWidth: window.innerWidth,
      canvasHeight: window.innerHeight,
      canvasImg: "", // 签名图片地址
      ctx: null, //画板
      stage_info: [], // 移动端按下点到屏幕的偏差
      isDown: false, //是否按下
      points: [], //按下点组合
      startX: 0, // 起始点x坐标
      startY: 0 // 起始点y坐标
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    // 初始化画板
    init() {
      let canvas = this.$refs.canvas;
      this.ctx = canvas.getContext("2d");
      this.ctx.strokeStyle = "#000";
      this.stage_info = canvas.getBoundingClientRect();
    },
    // pc
    mouseDown(ev) {
      let e = ev || event;
      e.preventDefault();
      this.isDown = true;
      let obj = {
        x: e.offsetX,
        y: e.offsetY
      };
      this.startX = obj.x;
      this.startY = obj.y;
      this.ctx.beginPath();
      this.ctx.strokeStyle = 'red';
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(obj.x, obj.y);
      this.ctx.stroke();
      this.ctx.closePath();
      this.points.push(obj);
    },
    mouseMove(ev) {
      let e = ev || event;
      e.preventDefault();
      if (this.isDown) {
        let obj = {
          x: e.offsetX,
          y: e.offsetY
        };
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(obj.x, obj.y);
        this.ctx.stroke();
        this.ctx.closePath();
        this.startY = obj.y;
        this.startX = obj.x;
        this.points.push(obj);
      }
    },
    mouseUp(ev) {
      let e = ev || event;
      e.preventDefault();
      let obj = {
        x: ev.offsetX,
        y: ev.offsetY
      };
      this.ctx.beginPath();
      this.ctx.moveTo(this.startX, this.startY);
      this.ctx.lineTo(obj.x, obj.y);
      this.ctx.stroke();
      this.ctx.closePath();
      this.points.push(obj);
      this.points.push({ x: -1, y: -1 });
      this.isDown = false;
    },
    // mobile
    touchStart(ev) {
      let e = ev || event;
      e.preventDefault();
      if (e.touches.length == 1) {
        let obj = {
          x: e.targetTouches[0].clientX - this.stage_info.left,
          y: e.targetTouches[0].clientY - this.stage_info.top
        };
        this.startX = obj.x;
        this.startY = obj.y;
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(obj.x, obj.y);
        this.ctx.stroke();
        this.ctx.closePath();
        this.points.push(obj);
      }
    },
    touchMove(ev) {
      let e = ev || event;
      e.preventDefault();
      if (e.touches.length == 1) {
        let obj = {
          x: e.targetTouches[0].clientX - this.stage_info.left,
          y: e.targetTouches[0].clientY - this.stage_info.top
        };
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(obj.x, obj.y);
        this.ctx.stroke();
        this.ctx.closePath();
        this.startX = obj.x;
        this.startY = obj.y;
        this.points.push(obj);
      }
    },
    touchEnd(ev) {
      let e = ev || event;
      e.preventDefault();
      if (e.touches.length == 1) {
        let obj = {
          x: e.targetTouches[0].clientX - this.stage_info.left,
          y: e.targetTouches[0].clientY - this.stage_info.top
        };
        this.startX = obj.x;
        this.startY = obj.y;
        this.ctx.beginPath();
        this.ctx.moveTo(this.startX, this.startY);
        this.ctx.lineTo(obj.x, obj.y);
        this.ctx.stroke();
        this.ctx.closePath();
        this.points.push(obj);
      }
    },
    //清空
    clear() {
      this.ctx.clearRect(
        0,
        0,
        this.$refs.canvas.width,
        this.$refs.canvas.height
      );
      this.points = [];
    },
    //提交签名
    commit() {
      const image = new Image();
      // canvas.toDataURL 返回的是一串Base64编码的URL
      image.src = this.$refs.canvas.toDataURL("image/png"); //签名img
      console.log(image.src); //保存签名的base64字符串
    }
  }
};
</script>

<style lang="less">
.signature {
  min-height: 100vh;
  background: #fff;
  position: relative;
  .canvas {
    border: 2px red solid;
    font-size: 0;
  }
  .save-btn {
    position: absolute;
    top: 90%;
    right: 48px;
    z-index: 9;
    margin-top: -20px;
    transform-origin: center center;
    font-size: 18px;
    color: #fcfcfc;
    line-height: 25px;
    padding: 8px 43px;
    background: linear-gradient(
      90deg,
      rgba(57, 115, 230, 1) 0%,
      rgba(57, 115, 230, 1) 100%
    );
    border-radius: 2px;
  }
  .back-btn {
    position: absolute;
    top: 14px;
    right: -26px;
    z-index: 9;
    transform-origin: left top;
    display: flex;
    flex-direction: column;
    .icon {
      display: inline-block;
      width: 42px;
      height: 42px;
      background: url("../assets/logo.png") no-repeat center center;
      background-size: contain;
    }
    .label {
      font-size: 16px;
      color: #d8d8d8;
      text-align: center;
    }
  }
  .clear-btn {
    position: absolute;
    top: 90%;
    right: 248px;
    z-index: 9;
    margin-top: -20px;
    transform-origin: center center;
    font-size: 18px;
    color: #fcfcfc;
    line-height: 25px;
    padding: 8px 43px;
    background: linear-gradient(
      90deg,
      rgba(57, 115, 230, 1) 0%,
      rgba(57, 115, 230, 1) 100%
    );
    border-radius: 2px;
  }
}
</style>

