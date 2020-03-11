stylus 
1. @import 文件引入，一个文件做一件事，有利于代码的维护和管理  可以多人协作
/base/reset 基础的reset任务
base 是核心 widget是前端的一个插件
@import 让我们可以做文件的分离和管理，多人协作，目录让我们看到了思想和野心。
variable 当是个大项目时，有大量的变量要维护，
variable 就成为了目录
weui-styl 是一个入口文件 里面再分成好多部门
@import 负责把各个部分串起来
base  /  widget  
- reset.styl
- variable   定义变量 
  - global.styl
  - weui-button.styl
- weui-button 
    