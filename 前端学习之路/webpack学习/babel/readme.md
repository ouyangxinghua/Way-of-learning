生产线 Webpack  代码生产工艺  工作流  Work Flow

命令
 npm install -g yarn
 yarn add babel-core babel-cli babel-preset-env
 npm run
 npm run build
 yarn add babel-plugin-proposal-object-reset-spread
 yarn add eslint
 yarn add webpack-cli webpack-dev-server

- html + css + js = 
development   开发阶段
    html template  {{}}
    css  stylus
    js es6,7,8,9 => es5
最后代码运行的env(环境)

- js 
  babel
  使用最新的技术开发，由babel 编译成es5,

- babel-core  核心的转译库
  npm run build "babel ...."
  babel-cli
  babel-preset-env .babelrc(配置文件)
  {
      "presets": ["env"]
  }

  build
  dev

- preset 预处理一下
  env 搞不定  安装插件

- webpack 是一切工作流的主宰
  webpack --mode development
  /src 开发目录
  /dist 上线目录

- 开发时  development  代码的可读性 dev
- 上线时  production  代码要压缩, 混淆 build 服务器上 域名
- 测试  test  局域网