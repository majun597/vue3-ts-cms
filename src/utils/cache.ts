//做一些缓存的工作

//封装成类，类具有更强的封装性
class LocalCache {
  //封装一些方法
  //保存缓存
  setCache(key: string, value: any) {
    window.localStorage.setItem(key, JSON.stringify(value)) //value传入有可能是各种类型，但是setItem里面的value定义为字符串类型，所以通过stringify进行转化，转化为字符串
  }

  //获取缓存
  getCache(key: string) {
    const value = window.localStorage.getItem(key)
    if(value) {
      return JSON.parse(value) //假如获取到的value有值，则将其通过JSON.parse转回其本身的类型
    }
  }

  //删除缓存
  deleteCache(key: string) {
    window.localStorage.removeItem(key)
  }

  //清空缓存
  clearCache() {
    window.localStorage.clear()
  }
}

export default new LocalCache()
