import hyRequest from '../index' //导入请求函数

import { IAccount, IDataType, ILoginResult } from './types'

enum LoginAPI {  //枚举登录相关的API类型
  AccountLogin = '/login',
  LoginUserInfo = '/users/', //用户登录信息 /user/1
  UserMenus = '/role/', //用户菜单 /role/1/menu
}

//实现登录逻辑
export function accountLoginRequest(account: IAccount) { //导出账号登录的请求  需要传入账号信息（由接口IAccount定义）
  return hyRequest.post<IDataType<ILoginResult>>({
    url: LoginAPI.AccountLogin,
    data: account
  })
}

//通过id请求用户数据逻辑
export function requestUserInfoById(id: number) {
  return hyRequest.get<IDataType>({
    url: LoginAPI.LoginUserInfo + id , //拼接id之后就可以知道请求的是哪一个用户
    showLoading: false
  })
}

//通过id加载相对应用户的菜单栏
export function requestUserMenusByRoleId(id: number) {
  return hyRequest.get<IDataType>({ //返回对应的决策
    url: LoginAPI.UserMenus + id + '/menu',
    showLoading: false
  })
}
