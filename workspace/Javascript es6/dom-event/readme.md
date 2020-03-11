dom event(事件)
- dom
  onclick 事件注册只有一个 dom-0
  addEventListener('click') 不限 dom-2
  addEventListener('keyup') 不限 dom-3
  true - 事件句柄在捕获阶段执行
  false- false- 默认。事件句柄在冒泡阶段执行
- event 
  event.stopProgration() 阻止事件冒泡
  event.stopImmediatePropagation()  阻止后面注册的事件
- dom 事件流
  捕获 (capture)
  window -> document(documentElement)
  -> body -> 父级 -> 目标元素
  冒泡 (bubble)
  window <- document(documentElement)
  <- body <- 父级 <- 目标元素

  事件按照 dom流的顺序执行我们的事件回调
  处于目标阶段的时候 事件调用顺序取决于事件注册的顺序

- 事件代理 (事件委托)
  event-question.html
  原理: 冒泡 

- DOM标准的浏览器事件注册方法是通过addEventListener方法注册，而IE内核的浏览器则是通过attachEvent方法注册。

- 事件的整体执行顺序是：非目标元素捕获 -> 目标元素顺序执行 -> 非目标元素冒泡

  
  