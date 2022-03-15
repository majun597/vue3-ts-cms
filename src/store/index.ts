import {createStore} from 'vuex'

import login from './login/login'

import { IRootState } from './types'

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

export default store
