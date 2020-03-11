module.exports = {
    baseUrl: process.env.NODE_ENV === 'production'
        ? '/study'
        : '/',
    // 将构建好的文件输出到哪里
    outputDir: 'study',
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
            }
        }
    }
}
