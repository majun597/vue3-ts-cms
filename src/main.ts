import { createApp } from "vue";
import App from "./App.vue";
// import './service/axios-demo.ts'
import 'normalize.css'
import './assets/css/index.less' //引入样式文件

//全局引用element-plus
import ElementPlus from 'element-plus';
import 'element-plus/dist/index.css' //引用element-plus里面的样式

import router from "./router";
import store from "./store";
import { setupStore } from "./store";
import { globalRegister } from "./global/index";

// import hyRequest from './service/index'

const app =  createApp(App);

app.use(ElementPlus)

app.use(store); //注册store
setupStore()

app.use(router); //注册路由

app.use(globalRegister)

app.mount("#app");

// console.log(process.env.VUE_APP_BASE_URL)
// console.log(process.env.VUE_APP_BASE_NAME)

// hyRequest.request({
//   url: '/home/multidata',
//   method: 'GET',
//   interceptors: {
//     requestInterceptor: (config) => {
//       console.log('单独请求的config')
//       return config
//     },
//     responseInterceptor: (res) => {
//       console.log('单独响应的config')
//       return res
//     }
//   }
// })

// interface DataType {
//   data: any
//   returnCode: string
//   success: boolean
// }

// hyRequest.request<DataType>({
//   url: '/home/multidata',
//   method: 'GET',
//   showLoading: false
// })
// .then((res) => {
//   console.log(res.data)
//   console.log(res.returnCode)
//   console.log(res.success)
// })
