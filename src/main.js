// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import YDUI from 'vue-ydui'
import VueWechatTitle from 'vue-wechat-title'
import 'vue-ydui/dist/ydui.rem.css'
import '@/assets/js/ydui.flexible.js'
import App from './App'
import router from './router'
import '@/assets/font/iconfont.css'
import VueLazyload from 'vue-lazyload'
Vue.use(VueLazyload,{
  attempt: 1,
  preLoad: 1.3
})
Vue.use(VueWechatTitle);
Vue.use(YDUI)
Vue.config.productionTip = false
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})

Vue.filter('picture12', function (value) {
  var pictureUrl=value;
  if (value.indexOf('http://')<=-1){
    process.env.API
    if(value.charAt(0)=='/'){
      pictureUrl='http://debug.dctrain.cn:8080/debug'+ value;
    }else{
      pictureUrl='http://debug.dctrain.cn:8080/debug/'+ value;
    }
  }
  pictureUrl+='?jsessionid=5104wv4PPEa9BsIj7HuPRNOJEQ==6081'
  return pictureUrl;
})
