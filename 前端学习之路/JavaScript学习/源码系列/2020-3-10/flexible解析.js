(function flexible (window, document) {
    // 获取页面root根元素 html
    // 跟 document.body 获取的是 页面的 body 元素
    var docEl = document.documentElement
    // window.devicePixelRatio设备像素比
    // 默认为 1
    /**
     * [dpr description]
     * @type {[type]}
     * 设备像素比(device pixel ratio)
     * 设备像素比简称为dpr，其定义了物理像素和设备独立像素的对应关系。
     * 它的值可以按下面的公式计算得到：
     * 设备像素比 ＝ 设备物理像素 / 设备独立像素
     * 设备物理像素是指设备的实际像素
     * 设备独立像素就是指平常我们写 CSS 样式的 px 像素
     * 计算公式： 1px = (dpr)^2dp;
     */
    /**
     * [dpr description]
     * @type {[type]}
     * 基于rem的原理，我们要做的就是: 
     * 针对不同手机屏幕尺寸和dpr动态的改变根节点html的font-size大小(基准值)。
     * 这里我们提取了一个公式(rem表示基准值)
     * rem = document.documentElement.clientWidth * dpr / 10
     */
    /**
     * [dpr description]
     * @type {[type]}
     * 乘以dpr，是因为页面有可能为了实现1px border页面会缩放(scale) 1/dpr 倍(如果没有，dpr=1),。
     * 除以10，是为了取整，方便计算(理论上可以是任何值)
     * 所以就像下面这样，html的font-size可能会：
     * iphone3gs: 320px / 10 = 32px
     * iphone4/5: 320px * 2 / 10 = 64px
     * iphone6: 375px * 2 / 10 = 75px
     * 对于动态改变根节点html的font-size，我们可以通过css做，也可以通过javascript做。
     */
    var dpr = window.devicePixelRatio || 1
  
    // adjust body font size
    function setBodyFontSize () {
      if (document.body) {
        // 动态设置body的字体大小
        document.body.style.fontSize = (12 * dpr) + 'px'
      }
      else {
        document.addEventListener('DOMContentLoaded', setBodyFontSize)
      }
    }
    // 页面加载时初始化一次
    setBodyFontSize();
  
    // set 1rem = viewWidth / 10
    /**
     * 如果有一个区块，在psd文件中量出：宽高750×300px的div，
     * 那么如何转换成rem单位呢？
     * 公式如下：
     * rem = px / 基准值;
     * rem = document.documentElement.clientWidth * dpr / 10
     */
    function setRemUnit () {
      var rem = docEl.clientWidth / 10
      docEl.style.fontSize = rem + 'px'
    }
  
    setRemUnit()
  
    // reset rem unit on page resize
    window.addEventListener('resize', setRemUnit)
    window.addEventListener('pageshow', function (e) {
      if (e.persisted) {
        setRemUnit()
      }
    })
  
    // detect 0.5px supports
    // 检测0.5px border
    /**
     * 
     * @param  {Number} dpr >             [description]
     * @return {[type]}     [description]
     * 所以，设计师想要的retina下border: 1px;，其实就是1物理像素宽，
     * 对于css而言，可以认为是border: 0.5px;，
     * 这是retina下(dpr=2)下能显示的最小单位。
     * 然而，无奈并不是所有手机浏览器都能识别border: 0.5px;，
     * ios7以下，android等其他系统里，0.5px会被当成为0px处理，
     * 那么如何实现这0.5px呢？
     * 最简单的一个做法就是这样(元素scale)：
     * .scale{
     *   position: relative;
     * }
     * .scale:after{
     *   content:"";
     *   position: absolute;
     *   bottom:0px;
     *   left:0px;
     *   right:0px;
     *   border-bottom:1px solid #ddd;
     *   -webkit-transform:scaleY(.5);
     *   -webkit-transform-origin:0 0;
     * }
     * 我们照常写border-bottom: 1px solid #ddd;，
     * 然后通过transform: scaleY(.5)缩小0.5倍来达到0.5px的效果，
     * 但是这样hack实在是不够通用(如：圆角等)，写起来也麻烦。
     * 当然还有其他好多hack方法，网上都可以搜索到，但是各有利弊，
     * 这里比较推荐的还是页面scale的方案，是比较通用的，几乎满足所有场景。
     * 对于iphone5(dpr=2)，添加如下的meta标签，设置viewport(scale 0.5)：
     * <meta name="viewport" content="width=640,initial-scale=0.5,maximum-scale=0.5, minimum-scale=0.5,user-scalable=no">
     * 这样，页面中的所有的border: 1px都将缩小0.5，从而达到border: 0.5px;的效果。
     */
    if (dpr >= 2) {
      var fakeBody = document.createElement('body')
      var testElement = document.createElement('div')
      testElement.style.border = '.5px solid transparent'
      fakeBody.appendChild(testElement)
      docEl.appendChild(fakeBody)
      if (testElement.offsetHeight === 1) {
        docEl.classList.add('hairlines')
      }
      docEl.removeChild(fakeBody)
    }
  }(window, document))