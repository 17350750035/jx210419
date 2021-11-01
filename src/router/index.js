import Vue from 'vue'
import Router from 'vue-router'
import login from '../components/login'
import register from '../components/register'
import selfInfor from '../components/selfInfor'
import updateInfor from '../components/updateInfor'
import index from '../components/index'
import goods from '../components/goods'
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/login',
      name: 'login',
      component: login
    },
    {
      path: '/register',
      name: 'register',
      component: register
    },
    {
      path: '/selfInfor',
      name: 'selfInfor',
      component: selfInfor
    },
    {
      path: '/updateInfor',
      name: 'updateInfor',
      component: updateInfor
    },
    {
      path: '/index',
      name: 'index',
      component: index
    },
    {
      path: '/goods',
      name: 'goods',
      component: goods
    },
    {
      path: '/',
      redirect: '/index'
    }
  ]
})
