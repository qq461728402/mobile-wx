import request from '../request'
import requestUrl from '../requestUrl'
import requestParam from '../requestParam'
import {enpar} from '@/utils/defaultParameter'
import merge from 'lodash/merge'
//获取报修栏目数量
export  function getRepaireClassList(_this,params,msg,callback,key,isDES=false,noWxurl = true){
  if (isDES==true){
    if (typeof key ==='string'){
      params[key] =enpar(params[key]);
    }else{
      key.forEach(function (itemkey) {
        params[itemkey] =enpar(params[itemkey]);
      })
    }
  }
  if(msg){
    _this.$dialog.loading.open(msg);
  }
  var  service={'service':'OaMobileBP.getRepaireClassList'};
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
      _this.$dialog.loading.close();
    }else{
      _this.$dialog.toast({
        mes: respones.message,
        timeout: 1500
      });
    }
  })
}
//获取报修列表
export  function getRepaireList(_this,params,msg,callback,key,isDES=false,noWxurl = true){
  if (isDES==true){
    if (typeof key ==='string'){
      params[key] =enpar(params[key]);
    }else{
      key.forEach(function (itemkey) {
        params[itemkey] =enpar(params[itemkey]);
      })
    }
  }
  if(msg){
    _this.$dialog.loading.open(msg);
  }
  var  service={'service':'OaMobileBP.getRepaireList'};
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
      _this.$dialog.loading.close();
    }else{
      _this.$dialog.toast({
        mes: respones.message,
        timeout: 1500
      });
    }
  })
}