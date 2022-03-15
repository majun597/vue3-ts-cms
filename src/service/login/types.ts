// 登录接口 发起请求的类型
export interface IAccount {
  name: string
  password: string
}

// 登录接口 返回值类型
export interface ILoginResult {
  id: number
  name: string
  token: string
}

export interface IDataType<T = any> {
  code: number
  data: T
}

