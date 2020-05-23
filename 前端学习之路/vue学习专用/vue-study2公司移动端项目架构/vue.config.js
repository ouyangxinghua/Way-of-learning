module.exports = {
    baseUrl: process.env.NODE_ENV === 'production'
        ? '/study'
        : '/',
    // 将构建好的文件输出到哪里
    outputDir: 'study',
    lintOnSave: false,  //用来控制是否关闭eslint校验
    pages: {
        reserve: {
            // page 的入口
            entry: 'src/pages/reserve/main.js',
            // 模板来源
            template: 'src/pages/reserve/tpl.html',
            // 在 dist/reserve.html 的输出
            filename: 'study.html',
            // 当使用 title 选项时，
            // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
            title: '学习',
            // 在这个页面中包含的块，默认情况下会包含
            // 提取出来的通用 chunk 和 vendor chunk。
            chunks: ['chunk-vendors', 'chunk-common', 'reserve']
        }
    },
    // 请求代理
    devServer: {
        proxy: {
            '/ApprReserveInterface': { // 预约接口包
                target: 'http://192.168.0.152:8888',
                ws: true,
                changeOrigin: true
            },
            '/ApprNetInterface': {
                target: 'http://192.168.0.152:8888',
                ws: true,
                changeOrigin: true
            },
            '/ApprNetUserInterface': {
                target: 'http://192.168.0.152:8888',
                ws: true,
                changeOrigin: true
            }
        }
    },
    // 生产环境下的sourceMap
    productionSourceMap: true,
    chainWebpack: config => {
        if (process.env.NODE_ENV === 'production') {
            // 为生产环境修改配置...
            config
                .externals({
                    'vue': 'Vue',
                    'vue-router': 'VueRouter'
                })
        } else {
            // 为开发环境修改配置...
        }
    },
    css: {
        loaderOptions: {
            sass: {
                data: `@import '@/assets/scss/utils.scss';`
            },
            // https://blog.csdn.net/u013379933/article/details/84107878   https://www.cnblogs.com/taohuaya/p/10274993.html  vue-cli2、vue-cli3的postcss-pxtorem插件 px转换rem
            postcss: {
                plugins: [
                    require('postcss-plugin-px2rem')({ // 把px单位换算成rem单位
                        rootValue: 75,
                        exclude: /(node_modules)/,
                        unitPrecision: 5, // 最小精度，小数点位数
                        propList: ['*'],  // !不匹配属性（这里是字体相关属性不转换）
                        minPixelValue: 2,
                        // selectorBlackList: ['weui', 'mu'], // 忽略转换正则匹配项
                    })
                ]
            }
        },
    }
}
