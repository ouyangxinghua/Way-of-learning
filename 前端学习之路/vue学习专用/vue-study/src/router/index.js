import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/components/index'
import Echarts from '@/components/echarts'
import Child from '@/components/echarts'
import Filter from '@/components/VueFilter'
import Canvas from '@/components/canvas'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/echarts',
      name: 'Echarts',
      component: Echarts
    },
    {
      path: '/child',
      name: 'Child',
      component: Child
    },
    {
      path: '/filter',
      name: 'Filter',
      component: Filter
    },
    {
      path: '/canvas',
      name: 'Canvas',
      component: Canvas
    }
  ]
})
