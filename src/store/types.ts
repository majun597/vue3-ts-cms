import {ILoginState} from './login/types'

// 专门存放类型的接口
//定义根state的类型接口
export interface IRootState {
  name: string
  age: number
}

export interface IRootWithModule {
  login: ILoginState
}

export type IStoreType = IRootState & IRootWithModule
