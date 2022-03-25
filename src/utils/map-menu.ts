//定义usermenus和routes的映射关系

//导入路由的类型的约束
import { IBreadcrumb } from '@/base-ui/breadcrumb'
import type {RouteRecordRaw} from 'vue-router'

let firstMenu: any = null

//把usermenus映射到该数组当中  再将该数组里的所有路由添加到对应的main的children中
export function mapMenusToRoutes(userMenus: any[]): RouteRecordRaw[] {
  const routes: RouteRecordRaw[] = []

  //1.先加载默认的所有的routes
  const allRoutes: RouteRecordRaw[] = []
  //routeFiles:路由文件  require.context（）属于webpack里面的工具，可以帮助查找某一个文件夹， /\.ts/代表需要查找的是.ts的文件
  //表示在../router/main里面去查找所有以.ts结尾的文件，true代表要找到该文件夹下面的所有.ts为后缀的文件
  const routeFiles = require.context('../router/main', true, /\.ts/)
  //此处表示拿到routeFile里面的文件的路径
  routeFiles.keys().forEach((key) => {//需要进行遍历 此处拿到的key代表所需的路径
    //加载对应的路由对象  commonjs里面的require()用于加载某个具体的文件
    const route = require('../router/main' + key.split('.')[1]) //'../router/main' + key.split('.')[1]进行文件路径的拼接，
                //key.split('.')[1]表示将拿到的key通过 . 来进行切割，然后再取后面的内容
    //然后将取到的route对象push进allRoutes中
    allRoutes.push(route.default)
  })
  // console.log(allRoutes)

  //2.根据菜单获取需要添加的routes
  //递归的调用route
  const _recurseGetRoute = (menus: any[]) => {
    for(const menu of menus) { //遍历menus里面的menu
      if(menu.type === 2) { //当menu.type等于2的时候才是真正点击后要进行映射的url
        const route = allRoutes.find((route) => { //find函数帮助从数组里面找到某一个对象  此处为遍历所有的route对象
          return route.path === menu.url //让menu里面的URL赋值给route的路径
        })
        if(route) {//如果找到了则将该路由对象push进routes里面
          routes.push(route)
        }
        if(!firstMenu) {
          firstMenu = menu
        }
      } else { //当不等于2的时候，说明里面的文件还不是需要进行映射的文件，就需要继续调用_recurseGetRoute函数
        _recurseGetRoute(menu.children)
      }
    }
  }
  _recurseGetRoute(userMenus)
  return routes
}

//映射到面包屑的路径
export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
  const breadcrumbs: IBreadcrumb[] = []
  pathMapToMenu(userMenus, currentPath, breadcrumbs)
  return breadcrumbs //这时return出去的值就包含menu和findMenu的name
}

//参数一：用户菜单 参数二：当前路由路径
export function pathMapToMenu(userMenus: any[], currentPath: string, breadcrumbs?: IBreadcrumb[]): any { //返回值为any类型
  for(const menu of userMenus) { //遍历userMenu里面的菜单
    if(menu.type === 1) { //type=1为一级菜单（点击的时候只会做一个展开，不会有路径的匹配） 该菜单里面有子菜单

      // menu.children ?? []表示如果menu.children没有值的话，则传入一个空数组
      const findMenu = pathMapToMenu(menu.children ?? [], currentPath) //递归调用
      if(findMenu) {
        breadcrumbs?.push({name: menu.name}) //把menu的name push进去
        breadcrumbs?.push({name: findMenu.name})//把findMenu的name也push进去
        return findMenu
      }//type=2为二级菜单（点击的时候有路径的匹配）且当currentPath等于menu.url时，就找到了当前的menu，直接return出去
    }else if (menu.type === 2 && menu.url === currentPath) {
      return menu
    }
  }
}

// export function pathMapBreadcrumbs(userMenus: any[], currentPath: string) {
//   const breadcrumbs: IBreadcrumb[] = []
//   for(const menu of userMenus) {
//     if(menu.type === 1) {
//       const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
//       if(findMenu) {
//         breadcrumbs.push({name: menu.name, path: menu.url})
//         breadcrumbs.push({name: findMenu.name, path: findMenu.url})
//         return findMenu
//       }
//     }else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//   }
// }

// //保证每次刷新的时候页面保持在当前页面的状态
// export function pathMapToMenu(userMenus: any[], currentPath: string): any { //返回值为any类型
//   for(const menu of userMenus) {
//     if(menu.type === 1) {
//       const findMenu = pathMapToMenu(menu.children ?? [], currentPath)
//       if(findMenu) {
//         return findMenu
//       }
//     }else if (menu.type === 2 && menu.url === currentPath) {
//       return menu
//     }
//   }
// }

export {firstMenu}
