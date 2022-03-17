import {createStore, Store, useStore as useVuexStore} from 'vuex'

import login from './login/login'

import { IRootState, IStoreType } from './types'

const store = createStore<IRootState>({
  state: () => {
    return {
      name: "majun",
      age: 18
    }
  },

  mutations: {
    changeName(state) {
      state.name
    }
  },

  modules: {
    login
  }
})

export function setupStore() { //表示要对store里面的东西进行初始化
  store.dispatch('login/loadLocalLogin') //loadLocalLogin代表本地相关的登录数据
}

//此处导出自己定义的useStore函数
export function useStore(): Store<IStoreType> { //自己定义的useStore
  return useVuexStore()
}

export default store
