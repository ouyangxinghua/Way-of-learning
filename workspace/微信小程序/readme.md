微信小程序appID  wx67d280fad061e04d
AppSecret(小程序密钥)  dfb2b4921880f558a32ec22ce6303dde

腾讯地图OURBZ-I5GK5-2PJIH-Q6M4G-H6AI6-B5FWU

npm install --save wx-server-sdk@latest

1、wx.navigateTo
保留当前页面，跳转到应用内的某个页面，使用wx.navigateBack可以返回到原页面。
2、wx.redirectTo
关闭当前页面，跳转到应用内的某个页面。
3、wx.switchTab
跳转到 tabBar 页面，并关闭其他所有非 tabBar 页面
4、wx.navigateBack
关闭当前页面，返回上一页面或多级页面。可通过 [getCurrentPages()] 获取当前的页面栈，决定需要返回几层。
5、wx.reLaunch
关闭所有页面，打开到应用内的某个页面。


## 小程序template和component区别
微信小程序template模板与component组件的区别和使用
template主要是展示，方法则需要在调用的页面中定义。而component组件则有自己的业务逻辑，可以看做一个独立的page页面。简单来说，如果只是展示，使用template就足够了，如果涉及到的业务逻辑交互比较多，那就最好使用component组件了。

template模板没有配置文件(.json)和业务逻辑文件（.js）,所以template模板中的变量引用和业务逻辑事件都需要在引用页面的js文件中进行定义


因为wx:if之中也可能包含数据绑定，所以当wx:if的条件值切换时，框架有一个局部渲染的过程，他会确保条件在切换是销毁或者重新渲染。同时wx:if也是有惰性的，如果初始渲染条件为false,框架什么也不会做，只有在条件第一次变为真的时候才会开始渲染。相比之下hidden就简单的多，组件始终都会被渲染，只是简单的控制显示和隐藏，一般来说，wx：if 有更高的切换消耗，而hidden有更高的初始渲染消耗，你可以根据自己的需求来调用。

频繁切换：用 hidden。
偶尔切换：用 wx:if。


①e.currentTarget 代表的是，注册了监听点击事件的组件。currentTarget：事件处理程序注册的元素， 

②e.target 代表的是，实际触发了点击事件的组件。 target：事件的实际目标元素

deltaX 水平位置偏移位，每次滑动一次触发一次，所以需要记录从第一次触发滑动起，一共滑动了多少距离