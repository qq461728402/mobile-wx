/**
 * Created by dx on 18/3/22.
 */
import merge from 'lodash/merge'
import {encrypt} from './desutil'
import {getStore} from './storeUtils'
//获取时间戳
var   timestamp = new Date().getTime() + '';
//参数加密方法
export function enpar(par) {
  var nowDate=timestamp;
  var end8Date = nowDate.substring(nowDate.length - 8, nowDate.length);
  return encrypt(par, end8Date);
}
//获取heade 参数
export  function  heards(){
  var nowDate=timestamp;
  var end8Date = nowDate.substring(nowDate.length - 8, nowDate.length);
  var header={
    'clientctime': encrypt(nowDate, end8Date) + end8Date,
    'clienttype': '4',
    'isuser': '0',
    'clienthm': encrypt('ios95669137-27DD-428F-A089-4314DCA6688B', end8Date)
  };
  return header;
}
//获取默认参数
export function defaultPar() {
  var  unitInfoDic={};
  var  userInfoDic={};
  if(getStore('unitInfo')!=undefined&&getStore('unitInfo').length>0){
    var unitInfo = JSON.parse(getStore('unitInfo'));
    unitInfoDic={'unitid':enpar(unitInfo.unit_id),'unitname':unitInfo.unit_name};
  }
  if(getStore('userInfo')!=undefined&&getStore('userInfo').length>0){
    var userInfo=JSON.parse(getStore('userInfo'));
    userInfoDic={'userid':enpar(userInfo.user_id),'deptid':userInfo.dept_id,'deptname':userInfo.dept_name,'username':userInfo.user_name,'usertype':userInfo.user_type,'loginname':userInfo.user_loginname,'setsession':'1','uid':userInfo.user_id,'schoolid':userInfo.unit_id,'userloginname':userInfo.user_loginname,'user_pwd':userInfo.user_pwd};//用户登录名
    if (userInfo.user_type!=0){
      var currentdic={'currentyear':userInfo.currentyear,'currentsemester':userInfo.currentsemester};
      userInfoDic =merge(userInfoDic,currentdic);
    }
  }
 var unit_Code = {'unit_code':enpar('9999')};
  unitInfoDic =merge(unitInfoDic,unit_Code);
  var tempdic=merge(unitInfoDic,userInfoDic);
  return tempdic
}
