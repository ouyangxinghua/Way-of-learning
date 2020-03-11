# BFC 是一个什么概念
Block Formatting Context (块级格式化上下文)

# BFC 的原理 (渲染规则)
1. 正常的文档流会存在边距折叠的问题 (父子元素，兄弟元素),水平方向的外边距不存在折叠的情况 (因为水平方向不存在块级元素)
2. BFC容器不会与浮动元素的box重叠
3. BFC在页面上是一个独立的容器，最显著的效果就是一个隔离的空间，外面的元素不会影响里面的元素，反之，里面的元素也不会影响外面的元素。
4. 计算BFC容器高度时，浮动元素也会参与高度的计算 (也是通常清楚浮动的原理)

# 创建BFC的条件
1. float属性不为none
2. position为absolute或fixed
3. display为inline-block, table-cell, table-caption, flex, inline-flex
3. overflow不为visible