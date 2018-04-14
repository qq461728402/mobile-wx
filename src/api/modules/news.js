import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'
import {enpar} from '@/utils/defaultParameter'
import merge from 'lodash/merge'

//获取信息列表
export  function getNewsList(_this,params,msg,callback,key,isDES=false,noWxurl = true){
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
  var  service={'service':'newsMobileBP.getNewsList'};
  return request({
    url: requestUrl(noWxurl?'action/InvokeActionPhoneContact':'mobile/service/jsonProvider'),
    method: 'post',
    params:requestParam(merge(service,params))
  }).then(function (respones) {
    console.log(respones);
    if (respones.statusCode==0){
      if (callback){
        _this.$dialog.loading.close();
        callback(respones);
      }
    }else{
      _this.$dialog.toast({
        mes: respones.message,
        timeout: 1500
      });
    }
  })
}

//获取信息列表
export  function getNewsTypeTree(_this,params,msg,callback,key,isDES=false,noWxurl = true){
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
  var  service={'service':'newsMobileBP.getNewsTypeTree'};
  return request({
    url: requestUrl(noWxurl?'action/InvokeActionPhoneContact':'mobile/service/jsonProvider'),
    method: 'post',
    params:requestParam(merge(service,params))
  }).then(function (respones) {
    console.log(respones);
    if (respones.statusCode==0){
      if (callback){
        _this.$dialog.loading.close();
        callback(respones);
      }
    }else{
      _this.$dialog.toast({
        mes: respones.message,
        timeout: 1500
      });
    }
  })
}

//调取读书档案
export  function getMyBookStatList(_this,params,msg,callback,key,isDES=false,noWxurl = true){
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
  var  service={'method':'getMyBookStatList'};
  return request({
    url: requestUrl(noWxurl?'action/InvokeActionPhoneContact':'mobile/service/jsonProvider'),
    method: 'post',
    params:requestParam(merge(service,params))
  }).then(function (respones) {
    console.log(respones);
    if (respones.statusCode==200){
      if (callback){
        _this.$dialog.loading.close();
        callback(respones);
      }
    }else{
      _this.$dialog.toast({
        mes: respones.message,
        timeout: 1500
      });
    }
  })
}
//读书统计
export  function getMyBookStat(_this,params,msg,callback,key,isDES=false,noWxurl = true){
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
  var  service={'method':'getMyBookStat'};
  return request({
    url: requestUrl(noWxurl?'action/InvokeActionPhoneContact':'mobile/service/jsonProvider'),
    method: 'post',
    params:requestParam(merge(service,params))
  }).then(function (respones) {
    console.log(respones);
    if (respones.statusCode==0){
      if (callback){
        callback(respones);
      }
    }else{
      _this.$dialog.toast({
        mes: respones.message,
        timeout: 1500
      });
    }
  })
}

//是否具有发布权限
export  function getPublishPopedom(_this,params,callback,key,isDES=false,noWxurl = true){
  if (isDES==true){
    if (typeof key ==='string'){
      params[key] =enpar(params[key]);
    }else{
      key.forEach(function (itemkey) {
        params[itemkey] =enpar(params[itemkey]);
      })
    }
  }
  var  service={'service':'UserMobileBP.getPublishPopedom'};
  return request({
    url: requestUrl(noWxurl?'action/InvokeActionPhoneContact':'mobile/service/jsonProvider'),
    method: 'post',
    params:requestParam(merge(service,params))
  }).then(function (respones) {
    console.log(respones);
    if (respones.statusCode==0){
      if (callback){
        callback(respones);
      }
    }else{
      _this.$dialog.toast({
        mes: respones.message,
        timeout: 1500
      });
    }
  })
}



//初始化发布消息
export  function getNewsTypeInfo(_this,params,msg,callback,key,isDES=false,noWxurl = true){
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
  var  service={'service':'NewsMobileBP.getNewsTypeInfo'};
  return request({
    url: requestUrl(noWxurl?'action/InvokeActionPhoneContact':'mobile/service/jsonProvider'),
    method: 'post',
    params:requestParam(merge(service,params))
  }).then(function (respones) {
    console.log(respones);
    if (respones.statusCode==0){
      if (callback){
        _this.$dialog.loading.close();
        callback(respones);
      }
    }else{
      _this.$dialog.toast({
        mes: respones.message,
        timeout: 1500
      });
    }
  })
}

//发布消息
export  function saveNewsInfo(_this,params,data,msg,callback,key,isDES=false,noWxurl = true){
  if(msg){
    _this.$dialog.loading.open(msg);
  }
  console.log(123);
  if (isDES==true){
    if (typeof key ==='string'){
      params[key] =enpar(params[key]);
    }else{
      key.forEach(function (itemkey) {
        params[itemkey] =enpar(params[itemkey]);
      })
    }
  }
  var  service={'service':'NewsMobileBP.saveNewsInfo'};
  return request({
    url: requestUrl(noWxurl?'action/InvokeActionPhoneContact':'mobile/service/jsonProvider'),
    method: 'post',
    params:requestParam(merge(service,params)),
    data:data
  }).then(function (respones) {
    console.log(respones);
    if (respones.statusCode==0){
      if (callback){
        _this.$dialog.loading.close();
        callback(respones);
      }
    }else{
      _this.$dialog.toast({
        mes: respones.message,
        timeout: 1500
      });
    }
  })
}