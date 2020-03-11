// 单点入口文件
const Hapi = require('hapi');
const routesHellloHapi = require('./routes/hello-hapi')
const config = require('./config')
const pluginsHapiSwagger = require('./plugins/hapi-swagger')
const routesShop = require('./routes/shops')
const routesOrders = require('./routes/orders')
const server =  new Hapi.Server();

// 配置服务器启动 host 与端口
server.connection({
    port: config.port,
    host: config.host
})

const init = async () => {
  await server.register([
    ...pluginsHapiSwagger
  ])
  server.route([
    ...routesHellloHapi,
    ...routesShop,
    ...routesOrders
  ]);
  await server.start();
  console.log(`server running at : ${server.info.uri}`);
}

init()