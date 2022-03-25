import {createRouter, createWebHashHistory} from 'vue-router'
//导入路由的类型的约束
import type {RouteRecordRaw} from 'vue-router'

import localCache from '@/utils/cache'
// import router from '@/router'
import {firstMenu} from '@/utils/map-menu'

//映射关系
const routes: RouteRecordRaw[] = [
  {
    path: '/',
    redirect: '/login'
  },
  {
    path: '/login',
    name: 'login',
    //懒加载的方式
    component: () => import('@/views/login/login.vue')
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('@/views/main/main.vue')
    //children:[] -> 根据usermenu来决定
  },
  {
    //当页面找不到的时候跳转至这个not found页面
    path: '/:pathMatch(.*)*',
    name: 'not-found',
    component: () => import('@/views/not-found/not-found.vue')
  },
]

const router = createRouter({
  routes,
  history: createWebHashHistory()
})

//使用导航守卫，判断是否登录，如果登录了则跳转至首页，没有登录则跳转至登录页面
router.beforeEach((to) => {//to.path代表即将要跳转过去的路径
  if (to.path !== '/login' ) {  //代表当to.path不是登录页面的时候，获取本地缓存中的token，如果token没有值，则跳转至登录页面
    const token = localCache.getCache('token')
    if(!token) {
      return '/login'
    }
  }

  if(to.path === '/main') {
    return firstMenu.url
  }
})

//导出router
export default router
