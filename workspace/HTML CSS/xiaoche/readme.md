## 界面搭框架及经验

水平方向一般禁止滚动条， 垂直反向出现滚动条
- 水平和垂直两个方向都滚动，页面会摇晃，容易产生误操作
- 垂直方向一直滚动是开发的主要方式

- margin: 0 auto ; max-width: 铺满 960px 通用

- flex 布局

  flex-grow放大 
  flex-basis
  flex-shrink缩小
  flex-wrap

  当网页由PC到移动端时，缩小阵仗

经验 简单的适配PC -> 移动端 照顾所有的用户

PC端 大手大脚一点， max-width margin: auto
padding margin

移动端 flex-shrink 让关键的部分坚挺一点

flex属性是flex-grow, flex-shrink 和 flex-basis的简写，默认值为0 1 auto。后两个属性可选。