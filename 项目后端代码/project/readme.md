# 常用MySQL命令
net start mysql
net stop mysql
exit
use mysql
show databases;
show tables;
describe tables;
---
启动
net start mysql
net stop mysql
登录
mysql -u root -p
修改密码
mysqladmin -u root -password ab12    https://jingyan.baidu.com/article/454316ab4e9e65f7a7c03ad1.html



## mongodb
https://www.cnblogs.com/wzlblog/p/6364045.html


# 常用MySQL命令
net start mysql
net stop mysql
exit
use mysql
show databases;
show tables;
describe tables;
---
登录
mysql -h localhost -u root -p
修改密码
mysqladmin -u root -password ab12

ALTER TABLE parkinfo CONVERT TO CHARACTER SET utf8mb4 COLLATE utf8mb4_bin;   解决MySQl不能插入中文的问题

npm init -y
yarn add mysql2 sequelize sequelize-cli
./node_modules/.bin/sequelize init
./node_modules/.bin/sequelize db:created 创建数据库
./node_modules/.bin/sequelize migration:create --name create-shops-table   建表或修改表都叫迁移文件
./node_modules/.bin/sequelize db:migrate 执行迁移
./node_modules/.bin/sequelize db:migrate:undo 撤销上一个命令
./node_modules/.bin/sequelize seed:create --name init-shops  初始化
./node_modules/.bin/sequelize db:seed:all 执行seed里js文件代码对数据库的操作


- sequelize 数据库脚手架
  MySQL2 数据库驱动
  sequelize orm 工具 table -> object
  对底层的sql API 化 model
  sequelize-cli 命令行工具

# 目录的作用 

windows系统使用tree命令生成项目目录结构
先通过CMD进入到项目目录；
使用命令：tree /f > list.txt
之后在list.txt文件内查看生成的目录结构。


app.get('/getData/test')相当于
app.use('/getData')+router.get('/test')


Express获得get和post请求参数

get请求用req.query获取参数
获得post请求参数,post发送的参数是在请求体中的,Express没有提供获取表单post请求体的api,我们需要使用到第三方包body-parser

application/x-www-form-urlencoded：我们form表单提交就是这个模式，并且将提交的数据进行urlencode。默认情况下，我们所有的表单提交都是通过这种默认的方式实现的。最常用的一种。 application/json：采用json格式提交，比如我们常用的ajax

https://www.cnblogs.com/liunanjava/p/5710376.html

Express是一个自身功能极简，完全是路由和中间件构成一个web开发框架：从本质上来说，一个Express应用就是在调用各种中间件。

https://blog.csdn.net/huang100qi/article/details/80220012  express中间件的理解

## sequlize 关联查询
https://segmentfault.com/a/1190000020403846    Sequelize详细用法
https://www.onlyling.com/archives/347     Sequelize 关联查询数据合并字段
https://blog.csdn.net/lvyuan1234/article/details/86727703    使用sequelize实现关联查询
https://cnodejs.org/topic/5829631dd3abab717d8b4c2c    用Node和Express打造restful API
https://gershonv.github.io/2019/01/03/sequelize-query/   Sequelize - 使用 model 查询数据