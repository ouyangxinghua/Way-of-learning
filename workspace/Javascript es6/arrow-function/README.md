## 怎么用
- 只有一个参数可以省略括号
- 函数只有一条语句可以省略 {} return 
返回对象的时候 ()

## arguments
- 所以函数中(除了箭头函数之外)都可以用的局部变量
- [arg1, arg2, arg3]

## 普通函数和箭头函数的区别
- 箭头函数不支持重名形参，普通函数可以
- 箭头函数没有 this,  
它的 this 指向定义时所处的上下文(外部函数) this
- 箭头函数不能通过 .call .apply ... 改变箭头函数的 this 
- 箭头函数没有 .prototype 
- 箭头函数不能作为构造函数
- 箭头函数没有 arguments
- 箭头函数没有  new.target

## new.target
es6 新增 
一般用在构造函数之内 返回的是 new 作用于的那个构造函数


## 类数组
1. 有 length 属性
2. 可以通过 索引 获取值
3. Array.from 从类数组对象中创建一个新的数组
