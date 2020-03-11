数值 字符串 布尔值 null undefined   基本数据类型
其他的都是Object Array 可遍历的对象 for()
JSON Object 对象字面量 可枚举的对象 
function 也是对象
document.querySelectorAll('a');  类数组  
arr.push() 
- 字符串是字符的数组
   .length str[0]
- 运算符匹配的问题时，选择数组作为数据结构
  只在顶部做操作(push pop) 栈Stack
  算法+数据结构"()"
  sta = [] 空
  1. ( sta.push("(") 入栈 sta.length = 1
  sta[0] = "("
  2.) 栈不为空 跟顶部元素进行比较 如果是一对 
  顶部的元素pop()  
  或者 push 为新的顶
  3. sta 为空 true | false 
  pop() 方法用于删除并返回数组的最后一个元素。
  shift() 方法用于把数组的第一个元素从其中删除，并返回第一个元素的值。
  unshift() 方法可向数组的开头添加一个或更多元素，并返回新的长度。
  push() 方法可向数组的末尾添加一个或多个元素，并返回新的长度。