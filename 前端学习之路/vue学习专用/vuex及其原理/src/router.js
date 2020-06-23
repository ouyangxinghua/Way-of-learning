import Router from 'vue-router';
import Vue from 'vue'
const Index = () => import('./components/element-ui.vue');
const ouyang = () => import('./components/ouyang.vue');

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/ouyang',
            name: 'element-ui',
            component: Index,
            meta: {
                title: '首页',
                requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
            }
        },
        {
            path: '/xinghua',
            name: 'ouyang',
            component: ouyang,
            meta: {
                title: '首页',
                requireAuth: false // 添加该字段，表示进入这个路由是需要登录的
            }
        },

    ]
})

export default router