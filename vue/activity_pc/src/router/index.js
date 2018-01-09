import Vue from 'vue'
import Router from 'vue-router'
import direct from '@/components/direct/direct'
import all from '@/components/all/all'

Vue.use(Router)

export default new Router({
  //重置router 默认类名
  linkActiveClass : "active",
  routes: [
    {
      path:'/',
      redirect:'/direct'
    },{
      path:'*',
      redirect:'/direct'
    },{
      path: '/direct',
      name: 'direct',
      component: direct
    },{
      path: '/all',
      name: 'all',
      component: all
    }
  ]
})
