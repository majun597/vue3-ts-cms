import { IRootState } from '@/store/types'
import {Module} from 'vuex' //导入模块

import {ISystemState} from './types' //导入system的状态类型接口
import { getPageListData } from '@/service/main/system/system' //导入获取页面列表数据的网络请求函数

// 系统模块
const systemModule: Module<ISystemState, IRootState> = {
  namespaced: true,
  //传入state
  state() {
    return {
      usersList: [],
      usersCount: 0,
      roleList: [],
      roleCount: 0
    }
  },

  mutations: {
    changeUsersList(state, usersList: any[]) {
      state.usersList = usersList
    },
    changeUsersCount(state, usersCount: number) {
      state.usersCount = usersCount
    },
    changeRoleList(state, list: any[]) {
      state.roleList = list
    },
    changeRoleCount(state, count: number) {
      state.roleCount = count
    }
  },

  //封装getters，通过getters间接的去获取state里面的数据
  getters: {
    pageListData(state) {
      return (pageName: string) => {
        //方法一
        return (state as any)[`${pageName}List`]
        //方法二
        // switch(pageName) {
        //   case 'users':
        //     return state.usersList
        //   case 'role':
        //     return state.roleList
        // }
      }
    }
  },
  actions: {
    // 1.获取url
    async getPageListAction({commit}, payload:any) {//commit获取上下文的对象
      // console.log(payload)
      const pageName = payload.pageName
      const pageUrl = `/${pageName}/list`
      // switch (pageName) {
      //   case 'users':
      //     pageUrl = '/users/list'
      //     break
      //   case 'role':
      //     pageUrl = '/role/list'
      //     break
      // }

      //2.对页面发送请求
      const pageResult = await getPageListData(
        // payload.pageUrl, //payload里面没有pageUrl这个key，只有pageName，你这里已经做了处理，判断payload.pageName，然后赋值给pageUrl
        pageUrl,
        payload.queryInfo
      )
      // console.log(pageResult)

      //3.将数据存储到state中
      const {list, totalCount} = pageResult.data
      // 方法一
      const changePageName = pageName.slice(0, 1).toUpperCase() + pageName.slice(1) //将接收到的pageName的首字母转成大写
      commit(`change${changePageName}List`, list)
      commit(`change${changePageName}Count`, totalCount)
      // 方法二
      // switch (pageName) {
      //   case 'users':
      //     commit('changeUserList', list)
      //     commit('changeUserCount', totalCount)
      //     break
      //   case 'role':
      //     commit('changeRoleList', list)
      //     commit('changeRoleCount', totalCount)
      //     break
      // }
    }
  }
}

export default systemModule
