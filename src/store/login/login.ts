import {Module} from 'vuex'

import {
  accountLoginRequest,
   requestUserInfoById,
   requestUserMenusByRoleId
  } from '@/service/login/login' //导入账号登录请求 和 用户信息获取请求 和 获取用户菜单信息请求

  import router from '@/router'

import { IAccount } from '@/service/login/types'
import { IRootState } from '../types'
import { ILoginState } from './types'
import localCache from '@/utils/cache'

const loginModule: Module<ILoginState, IRootState> = {  //规定必须传入这两个泛型
  namespaced: true, //命名空间主要目的是将一个模块内部再进行作用域的划分，防止一些命名冲突的问题
  state() {
    return {
      token: '',
      userInfo: {},
      userMenus: []
    }
  },
  mutations: {
    //修改state的唯一方式就是通过mutation
    // 定义changeToken存储改变后的token的值
    changeToken(state, token: string) {
      state.token = token  //将传过来的token给state里面
    },
    //定义changeUserInfo存储改变后的用户的信息
    changeUserInfo(state, userInfo: any) {
      state.userInfo = userInfo
    },
    //定义changeUserMenus存储改变后的用户菜单的信息
    changeUserMenus(state, userMenus: any) {
      state.userMenus = userMenus
    }
  },
  actions: {
    //账号登录的操作  点击登录的时候触发
    async accountLoginAction({commit}, payload: IAccount) {
      console.log('执行accountLoginAction', payload)

      const obj = {
        name: localCache.getCache('name'),
        password: localCache.getCache('password')
      }

      //1.实现登录的逻辑
      const loginResult = await accountLoginRequest(obj)
      console.log(loginResult) //打印登录结果
      const {id, token} = loginResult.data
      commit('changeToken', token)
      console.log(loginResult.data.id, loginResult.data.token) //打印携带的id和token
      localCache.setCache('token', token) //将token进行本地缓存

      //2.请求用户信息
      const userInfoResult = await requestUserInfoById(id)
      const userInfo = userInfoResult.data
      commit('changeUserInfo', userInfo)
      localCache.setCache('userInfo', userInfo) //将userInfo进行本地缓存  则下次进入直接展示该用户信息

      //3. 获取相对应用户的菜单栏
      const UserMenusResult = await requestUserMenusByRoleId(userInfo.role.id)
      const UserMenus = UserMenusResult.data
      console.log(UserMenus) //打印用户菜单信息
      commit('changeUserMenus', UserMenus)
      localCache.setCache('userMenus', UserMenus)//将userMenus进行本地缓存

      //4. 跳转至首页
      router.push('/main')
    },
    //保证在刷新页面的时候保存已获取到的数据
    loadLocalLogin({commit}) {
      const token = localCache.getCache('token') //获取本地的token
      if(token) {//有值的情况下调用changeToken
        commit('changeToken', token)
      }

      const userInfo = localCache.getCache('userInfo') //获取本地的userInfo
      if(token) {//有值的情况下调用changeUserInfo
        commit('changeUserInfo', userInfo)
      }

      const userMenus = localCache.getCache('userMenus') //获取本地的userMenus
      if(token) {//有值的情况下调用changeUserMenus
        commit('changeUserMenus', userMenus)
      }
    }
    //手机登录的操作  点击登录的时候触发
    // phoneLoginAction({commit}, payload: any) {
    //   console.log('执行phoneLoginAction', payload)
    // }
  }
}

export default loginModule
