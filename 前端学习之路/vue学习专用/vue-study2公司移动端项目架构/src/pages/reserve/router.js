import Vue from 'vue';
import Router from 'vue-router';
import {
    getCookie,
    setCookie,
    getParams
} from '../../utils/utils.js';
// 404notFound
const NotFoundComponent = () => import('@/components/public/NotFound404.vue')
// 首页
const Index = () => import('./views/index.vue');
const Vmodel = () => import('./views/v-model.vue');

Vue.use(Router)

const router = new Router({
    // 是否使用history模式
    // mode: 'history',
    // base: process.env.BASE_URL,
    routes: [
        {
            path: '*',
            component: NotFoundComponent,
            meta: {
                level: 0, // 路由层级
                title: '404NotFound', // 页面标题
                keepAlive: false // 是否缓存
            }
        },
        {
            path: '/index',
            name: 'index',
            component: Index,
            meta: {
                title: '首页',
                requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        {
            path: '/vmodel',
            name: 'vmodel',
            component: Vmodel,
            meta: {
                title: 'vmodel原理',
                requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
            }
        }
    ]
})

// 路由拦截
// router.beforeEach((to, from, next) => {
    // 设置全局标题
    // document.title = to.meta.title || '在线预约'
    // const paramsToken = getParams('access_token');
    // const cookieToken = getCookie('access-token');
    // if (to.meta.requireAuth) { // 判断该路由是否需要登录权限
    //     if (paramsToken || cookieToken) {
    //         if (!cookieToken && paramsToken) setCookie('access-token', paramsToken);
    //         next();
    //     } else {
    //         // 跳转到统一认证登录
    //         goLogin()
    //     }
    // } else {
    //     next();
    // }
// })

export default router
