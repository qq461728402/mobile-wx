import Vue from 'vue'
import Router from 'vue-router'
import {getStore} from '@/utils/storeUtils'
const _import = require('./import-' + process.env.NODE_ENV)
Vue.use(Router)
export default new Router({
  mode: 'hash',
  routes: [
    {path: "*", redirect: '/home'},
    {path:'/index',name:'index',component:_import('layOut/index'),meta:{keepAlive:true,title:'掌上数字校园'},
      children:[
        {path:'/home',name:'home',component:_import('homePage/index'),meta:{keepAlive:true,title:'首页'}},
        {path:'/phonebook',name:'phonebook',component:_import('phoneBook/index'),meta:{keepAlive:true,title:'电话本'}},
        {path:'/personcenter',name:'personcenter',component:_import('personCenter/index'),meta:{keepAlive:true,title:'个人中心'}},
      ],
      beforeEnter(to,from,next){
        if(getStore('userInfo')){
          next();
        }else{
          next({ name: 'login' });
        }
      }
    },
    { path: '/login', component: _import('login/index'), name: 'login', meta: {title:'登录',keepAlive:false} },
    { path: '/iframe', component: _import('iframe/index'), name: 'iframe', meta: {title:'消息',keepAlive:false}},
    { path: '/news', component: _import('news/index'), name: 'news', meta: {keepAlive:false}},
  ]
})
