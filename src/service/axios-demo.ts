import axios from 'axios'

//1.模拟get请求
axios.get('http://123.207.32.32:8000/home/multidata').then((res) => {
  console.log(res)
})

//2.get请求，并且传入参数
// axios.get('http://httpbin.org/get', {
//   params: {
//     name: 'majun',
//     age: 18
//   }
// }).then((res) => {
//   console.log(res.data)
// })

//3.post请求，并且传入参数
// axios.post('http://httpbin.org/post', {
//   data: {
//     name: 'majun21',
//     age: 18
//   }
// }).then((res) => {
//   console.log(res.data)
// })

//4.axios的配置选项
axios.defaults.baseURL = 'http://httpbin.org'
axios.defaults.timeout = 10000 //定义默认超时时间，若超过这个时间，则显示网络错误
// axios.defaults.headers = {}
//配置了baseURL之后就可以写成下面的形式
// axios.get('/get', {
//   params: {
//     name: 'majun',
//     age: 18
//   },
//   timeout: 5000 //也可以单独定义超时时间
// }).then((res) => {
//   console.log(res.data)
// })
// axios.post('/post', {
//   data: {
//     name: 'majun21',
//     age: 18
//   }
// }).then((res) => {
//   console.log(res.data)
// })

//5.axios.all  多个请求，一起返回
axios.all([
  axios.get('/get', {params: {name: 'why', age: 18}}),
  axios.post('/post', {data: {name: 'why', age: 18}})
]).then((res) => {
  console.log(res)
})

//6.axios的拦截器
//fn1: 请求发送成功会执行的函数  fn2： 请求发送失败会执行的函数
// axios.interceptors.request.use(fn1, fn2) //拦截请求
axios.interceptors.request.use((config) => {
  //想做的一些操作
  return config
}, (err) => {
  return err
})

//fn1: 响应发送成功（服务器正常返回了数据）会执行的函数  fn2： 响应发送失败会执行的函数
// axios.interceptors.response.use(fn1, fn2) //拦截响应
axios.interceptors.response.use((res) => {
  return res.data
}, (err) => {
  return err
})


