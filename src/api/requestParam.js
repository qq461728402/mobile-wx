import qs from 'qs'
import merge from 'lodash/merge'
import {defaultPar,wxdefaultPar} from '../utils/defaultParameter'
/**
 * 请求参数统一处理／组装
 * @param {*} params 参数对象
 * @param {*} requestType 类型
 * @param {*} openDefultParams 是否开启默认参数?
 * @param {*} contentType 数据格式
 *  json: 'application/json; charset=utf-8'
 *  form: 'application/x-www-form-urlencoded; charset=utf-8'
 */
export default function (params,openDefultParams = true,wxDefultParams=false) {
  var par=defaultPar();
  var wxpar =wxdefaultPar();
  params = openDefultParams ? merge(par, params) : params;
  params = wxDefultParams ? merge(wxpar, params) : params;
  return params
}
