// service统一出口
import HYRequest from './request'
import {BASE_URL, TIME_OUT} from './request/config'
import localCache from '@/utils/cache'

const hyRequest = new HYRequest({
  baseURL: BASE_URL,
  timeout: TIME_OUT,
  interceptors: {
    requestInterceptor: (config) => {
     // 携带token的拦截
      const token = localCache.getCache('token') //从缓存中获取token
      if (token) { // 每次发送请求之前判断是否存在token，如果存在，则统一在http请求的header都加上token，不用每次请求都手动添加
        config.headers = {}
        config.headers.Authorization = `Bearer ${token}`
        // config = {
        //   headers: {
        //     Authorization: `Bearer ${token}`
        //   }
        // }
      }
      // console.log("reqsuc")
      return config
    },
    requestInterceptorCatch: (err) => {
      // console.log("reqloss")
      return err
    },
    responseInterceptor: (res) => {
      // console.log("repsuc")
      return res
    },
    responseInterceptorCatch: (err) => {
      // console.log("reploss")
      return err
    }
  }
})
 export default hyRequest


