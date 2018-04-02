import Vue from 'vue'
import Router from 'vue-router'
import {getStore} from '@/utils/storeUtils'
const _import = require('./import-' + process.env.NODE_ENV)
Vue.use(Router)
export default new Router({
  mode: 'hash',
  routes: [
    {path: "*", redirect: '/home'},
    {path:'/home',name:'home',component:_import('homePage/index'),meta:{keepAlive:false,title:'首页'},
    beforeEnter(to,from,next){
        if(getStore('userInfo')){
          if(to)next();
        }else{
          next({ name: 'login' });
        }
      }
    },
    { path: '/login', component: _import('login/index'), name: 'login', meta: {title:'登录',keepAlive:false} },
    { path: '/iframe', component: _import('iframe/index'), name: 'iframe', meta: {title:'消息',keepAlive:false}},
  ]
})
