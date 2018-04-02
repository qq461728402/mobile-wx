import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'
import {enpar} from '@/utils/defaultParameter'
import merge from 'lodash/merge'
import Vue from 'vue'
// 获取单位信息
export function getUnitInfo (params,key,isDES=false,noWxurl = true) {
  if (isDES==true){
    if (typeof key ==='string'){
      params[key] =enpar(params[key]);
    }else{
      key.forEach(function (itemkey) {
        params[itemkey] =enpar(params[itemkey]);
      })
    }
  }
  var  service={'service':'unitBP.getUnitInfo'};
  return request({
    url: requestUrl(noWxurl?'action/InvokeActionPhoneContact':'mobile/service/jsonProvider'),
    method: 'post',
    data: requestParam(merge(service,params)),
    params:requestParam(merge(service,params))
  })
}
//登录接口
export  function login(params,key,isDES=false,noWxurl = true) {
  if (isDES==true){
    if (typeof key ==='string'){
      params[key] =enpar(params[key]);
    }else{
       key.forEach(function (itemkey) {
         params[itemkey] =enpar(params[itemkey]);
       })
    }
  }
  var  service={'service':'userMobileBP.login'};
  return request({
    url: requestUrl(noWxurl?'action/InvokeActionPhoneContact':'mobile/service/jsonProvider'),
    method: 'post',
    data: requestParam(merge(service,params)),
    params:requestParam(merge(service,params))
  })
}
//首页模块接口
export  function getMenuType(_this,params,msg,callback,key,isDES=false,noWxurl = true){
   if(msg){
     _this.$dialog.loading.open(msg);
   }
  if (isDES==true){
    if (typeof key ==='string'){
      params[key] =enpar(params[key]);
    }else{
      key.forEach(function (itemkey) {
        params[itemkey] =enpar(params[itemkey]);
      })
    }
  }
  var  service={'service':'newsMobileBP.getMenuType'};
  return request({
    url: requestUrl(noWxurl?'action/InvokeActionPhoneContact':'mobile/service/jsonProvider'),
    method: 'post',
    data: requestParam(merge(service,params)),
    params:requestParam(merge(service,params))
  }).then(function (respones) {
    console.log(respones);
    if (respones.statusCode==0){
      if (callback){
        _this.$dialog.loading.close();
        callback(respones);
      }
    }else{
      this.$dialog.toast({
        mes: respones.message,
        timeout: 1500
      });
    }
  })
}
// 退出
export function logout () {
  return request({
    url: requestUrl('/sys/logout'),
    method: 'post',
    data: requestParam()
  })
}
