## 静态资源
不会随着服务运行而改变内容: html css JavaScript 图片
1. 如果 有 index.html 打开
2. 否则 列出所有文件
3. 请求 路径 和 磁盘路径 一一 对应

请求:
/static/*.*  磁盘位置static 下面 一一对应
1. 拿到 req.url
2. 读取 磁盘下面同一个位置 返回
3. 静态资源 通常会放在某一个目录下面 /static/  所以请求都以某个 目录开头  ^

## 打开方式
file:// 本地文件读取协议 ./xx.png  ok 双击打开
http://localhost:8080/  http 协议
html 里面引入的资源 都会发出请求
## 上传图片
### formidable
处理请求的第三方包
fileds对象  非input[type="file"]的提交项
files对象  input[type="file"]的提交项
根据 input 的 name 属性 来获取值