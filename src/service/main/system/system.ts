import hyRequest from '../../index' //导入请求函数

import {IDataType} from '../../types'

export function getPageListData(url: string, queryInfo: any) { //导出获取页面列表数据的网络请求函数
  return hyRequest.post<IDataType>({
    url: url,
    data: queryInfo
  })
}
