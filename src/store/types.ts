import {ILoginState} from './login/types'
import { ISystemState } from './main/system/types'

// 专门存放类型的接口
//定义根state的类型接口
export interface IRootState {
  name: string
  age: number
}

export interface IRootWithModule { //为了在别的组件中引用IStoreType时可以知道存在几种类型，须在此处添加类型接口
  login: ILoginState
  system: ISystemState
}

export type IStoreType = IRootState & IRootWithModule
