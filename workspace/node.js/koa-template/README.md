## koa
node的一个框架
tj : koa co command

## 中间件 middleWare
流水线
一个中间件处理完 可以交给下一个中间件
koa 特色
是一个 async 方法

洋葱模型
作用: 解耦 一个中间件负责一件事  (高内聚 低耦合)

## http
自定义响应头, 通常 以 X 开头  例如 X-Response-Time

##blog
yarn add ejs koa-views -S

## ejs
<% %>  js 代码
<%= %>  输出数据到模板 (转义过后的)
<%- %>  输出数据到模板 (但它是未转义过后的)
include 引入其他模块