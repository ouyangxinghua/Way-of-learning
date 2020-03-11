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
- config
- 