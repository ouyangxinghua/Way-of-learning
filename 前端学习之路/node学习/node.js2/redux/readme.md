## redux
action {}
reducer
store
状态管理的 思路

applyMiddleware 中间件根本原理：对store.dispatch进行改造。

中间件出现的原因：由于很多时候执行dispatch并不仅仅是立即去更新reducer,这时需要执行其他函数来满足项目需求，这些函数就是中间件，最后执行过一系列中间件后再去执行reducer

中间件就是一个函数，对store.dispatch方法进行了改造，在发出 Action 和执行 Reducer 这两步之间，添加了其他功能。
## react-redux
和 redux不一样

