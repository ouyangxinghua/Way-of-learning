yarn add awesome-typescript-loader html-webpack-plugin -D
yarn global add @types/react  @types/react-dom -D

- typeScript  将js 弱类型变成强类型
  类型声明文件 @types/react
- webpack-dev-server  不会刷新浏览器
  webpack-dev-server --inline  刷新浏览器
  webpack-dev-server --inline --hot  刷新浏览器需要更新的部分(很重要)  热更新  加载需要改变的部分

- typescript 是 js 超集, js 是在 ts 里可以完全运行的
    跟 java一样, 静态类型 语言, 先编译一下
- 强制类型声明

## interface 接口
1. 在面向对象语言中，接口（Interfaces）是一个很重要的概念，它是对行为的抽象，而具体如何行动需要由类（classes）去实现（implements）。
2. TypeScript 中的接口是一个非常灵活的概念，除了可用于对类的一部分行为进行抽象以外，也常用于对「对象的形状（Shape）」进行描述。
3. 注意，在赋值时：变量的形状必须和接口的形状保持一致。

1. 必选属性 => "："   带冒号的属性是必须存在的，不可以多也不能少
2. 可选属性 => " ? "  表示有选择的选项，可有可无
3. 只读属性 => " readonly "  对象的字段只在创建的时候赋值，注意哦，注意，只读的约束存在于第一次给对象赋值的时候，而不是第一次给只读属性赋值的时候：
4. 任意属性 [ propName : 类型 ]  : any    表示定义了任意属性取string 类型的值
需要注意的是，一旦定义了任意类型，那么确定属性和可选属性都必须是它的子属性

## typeScript泛型
1. 软件工程中，我们不仅要创建一致的定义良好的API，同时也要考虑可重用性。 组件不仅能够支持当前的数据类型，同时也能支持未来的数据类型，这在创建大型系统时为你提供了十分灵活的功能。
2. 在像C#和Java这样的语言中，可以使用  泛型  来创建可重用的组件，一个组件可以支持多种类型的数据。 这样用户就可以以自己的数据类型来使用组件。
