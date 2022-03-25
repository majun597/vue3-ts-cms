/* eslint-disable */
// 对axios进行封装
// 引入axios
import axios from 'axios'
//引入类型约束
import { AxiosInstance } from "axios";

import type {HYRequestInterceptors, HYRequestConfig} from './types'

import {ElLoading} from 'element-plus'
import {LoadingInstance} from 'element-plus/lib/components/loading/src/loading'

const DEFAULT_LOADING = true

//通过类来进行封装具有更强的封装性
class HYRequest {
  instance: AxiosInstance
  interceptors?: HYRequestInterceptors
  showLoading: boolean
  loading?: LoadingInstance

  constructor(config: HYRequestConfig) {
    //创建axios实例
    this.instance = axios.create(config)

    //保存基本信息
    this.showLoading = config.showLoading ?? DEFAULT_LOADING
    this.interceptors = config.interceptors

    // 使用拦截器
    // 从config中取出的拦截器是对应的实例的拦截器
    this.instance.interceptors.request.use(
      this.interceptors?.requestInterceptor,
      this.interceptors?.requestInterceptorCatch
    )
    this.instance.interceptors.response.use(
      this.interceptors?.responseInterceptor,
      this.interceptors?.responseInterceptorCatch
    )

  // 添加所有的实例都有的拦截器
  this.instance.interceptors.request.use(
    (config) => {
      // console.log('所有实例都有的拦截器：请求拦截成功')
      if(this.showLoading) {
        this.loading = ElLoading.service({
          lock: true,
          text: '请求资源中...',
          background: 'rgba(0, 0, 0, 0.5)'
        });
      }
      return config
    },
    (err) => {
      // console.log('所有实例都有的拦截器：请求拦截失败')
      return err
    }
  )

  this.instance.interceptors.response.use(
    (res) => {
      // console.log('所有实例都有的拦截器：响应拦截成功')

      //将loading移除
      setTimeout(() => {
        this.loading?.close()
      },2000);

      const data = res.data
      if(data.returnCode === '-1001') {
        // console.log('请求失败，错误信息')
      }else {
         return data
      }
    },
    (err) => {
      // console.log('所有实例都有的拦截器：响应拦截失败')
      //例子：判断不同的HttpErrorCode来显示不同的错误信息
      if(err.response.status === 404) {
        // console.log('404 error~')
      }
      return err
    }
  )
}

request<T = any>(config: HYRequestConfig): Promise<T> {
    return new Promise((resolve, reject) => {
      //1. 单个请求对请求config的处理
      if(config.interceptors?.requestInterceptor) {
        config = config.interceptors.requestInterceptor(config)
      }
      //2.判断是否显示loading
      if(config.showLoading === false) {
        this.showLoading = config.showLoading
      }

      this.instance.request<any, T>(config).then((res) => {
        //1.单个请求对数据的处理
      if(config.interceptors?.responseInterceptor) {
        // res = config.interceptors.responseInterceptor(res)
      }
      // console.log(res)

      // 2.将showLoading设置为true，这样就不会影响下一个请求
      this.showLoading = DEFAULT_LOADING

      //3. 将结果resolve返回出去
      resolve(res)
      }).catch(err => {
        // 将showLoading设置为true，这样就不会影响下一个请求
      this.showLoading = DEFAULT_LOADING
      reject(err)
      return err
      })
    })
  }

  get<T = any>(config: HYRequestConfig): Promise<T> {
    return this.request({
      ...config,
      method: "GET"
    });
  }
  post<T = any>(config: HYRequestConfig): Promise<T> {
    return this.request({
      ...config,
      method: "POST"
    });
  }
  delete<T = any>(config: HYRequestConfig): Promise<T> {
    return this.request({
      ...config,
      method: "DELETE"
    });
  }
  patch<T = any>(config: HYRequestConfig): Promise<T> {
    return this.request({
      ...config,
      method: "PATCH"
    });
  }
} //创建类

export default HYRequest //导出类
