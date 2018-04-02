import Vue from 'vue'
import axios from 'axios'
import router from '@/router'
import  {heards} from '../utils/defaultParameter'
// 创建axios实例
const service = axios.create({
  timeout: 1000 * 10,
  withCredentials: true,
  headers:heards()
})

//request拦截器
service.interceptors.request.use(config => {
  return config
}, error => {
  return Promise.reject(error)
})

//response拦截器
service.interceptors.response.use(response => {
  return response.data
}, error => {
  return Promise.reject(error)
})

export default service
