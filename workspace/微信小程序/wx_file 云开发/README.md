云开发是腾讯云在大力推广
快速上手

- 云开发提供可视化的mongodb云数据库 NOsql
  连接数据库
  const db = wx.cloud.dataBase()
  db.collection('userInfo')
  支持直接存JSON
  后端即服务 CRUD 增删改查
  add  增加

  要做列表，
  先建collection add
  再 get

  where({})
  count()
  数据库里有吗？ 有， 不存， 没有存