- 组件思维
  弹窗组合了一些标签，形成了独立的弹窗功能，
  在其他页面里也要用到，组合成一个独立的组件, 方便复用
  <dialog />
  页面是由组件拼装而成。面向组件编程

- 组件语法
  同于Page 又有不同
  Component({
      data:{ },
      properties:{
          <!-- 属性类型定义 -->
          title:{
              type:String,
              value:"标题"
          }
      },
      methods:{
          <!-- 方法 -->
      }
  })

- bind tap 区别
  bindtap 向外冒泡
  catchtap 不会

  bindtap 会向下传递  
  catchtap 不会向下传递，直接在当前标签拦截

  冒泡事件：当一个组件上的事件被触发后，该事件会向父节点传递。
  非冒泡事件：当一个组件上的事件被触发后，该事件不会向父节点传递。

  子元素用bindtap绑定事件后，执行的时候，会冒泡到父元素（触发父亲元素上绑定的bindtap事件）
  如果不想冒泡到父元素，可以用catchtap代替