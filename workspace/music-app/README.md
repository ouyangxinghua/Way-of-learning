# Vue仿qq音乐app

## Switch (react-router-dom)
只显示符合 path 的第一个组件
不加 Switch符合 path 的所有组件都显示

# 
https://c.y.qq.com/musichall/fcgi-bin/fcg_yqqhomepagerecommend.fcg?_=1562038603969&g_tk=5381&uin=0&format=jsonp&inCharset=utf-8&outCharset=utf-8&notice=0&platform=h5&needNewCode=1&jsonpCallback=callback


## setState
1. 异步的
2. 合并

## jsonp
export const OPTION = {
  param: 'jsonpCallback',
  prefix: 'callback'
}
?jsonpCallback=xxx
xxx 可以固定死的
jsonp jquery
每次请求的 callback xxx 都是不一样的 加上 随机指
callback_1
callback_2
callback_3

## Lazyload
监听原生的滚动
css3 transform

## forceCheck
可以手动触发viewport中元素的检查。当LazyLoad组件在没有调整大小或滚动事件的情况下进入视图端口时(例如，当组件的容器被隐藏时)，就会变得可见。

## react属性之exact
exact是Route下的一个属性，react路由会匹配到所有能匹配到的路由组件，exact能够使得路由的匹配更严格一些。
exact的值为bool型，为true时表示严格匹配，为false时为正常匹配。

## Container Component模式 展示组件（Presentational Components)与容器组件(Container Components)
一个container负责数据的获取，然后渲染它对应的下级component。就这些而已。