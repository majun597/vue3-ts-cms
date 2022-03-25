<!-- 左侧的菜单栏 -->
<template>
  <div class="nav-menu">
    <!-- logo设计 -->
    <div class="logo">
      <img class="img" src="~@/assets/img/logo.svg" alt="">
      <span class="title" v-if="!collapse">vue3+TS</span>
    </div>

    <!-- 菜单设计 -->
      <!-- :default-active="defaultValue" 拿到路径--根据路径去匹配menu--拿到menu.id作为defaultValue  这样就可以保证刷新的时候保持当前页面 -->
    <el-menu
      :default-active="defaultValue"
      class="el-menu-vertical"
      background-color="#0c2135"
      :collapse="collapse"
      text-color="#b7bdc3"
      active-text-color="#0a60bd">
      <!-- item.id代表数据里面的唯一标识 -->
      <template v-for="item in userMenus" :key="item.id">
        <!-- 当取到的item里面的type为1时代表它有二级菜单 然后继续遍历元素-->
        <!-- 二级菜单 -->
        <template v-if="item.type === 1">
          <!-- 二级菜单里面可以展开的标题 -->
          <el-sub-menu :index="item.id + ''">
            <template #title>
              <el-icon v-if="item.icon">
                <monitor v-if="item.sort === 1"/>
                <setting v-if="item.sort === 2"/>
                <goods v-if="item.sort === 3"/>
                <chat-line-round v-if="item.sort === 4"/>
              </el-icon>
              <span>{{item.name}}</span>
            </template>

             <!-- 遍历里面的item -->
            <template v-for="subitem in item.children" :key="subitem.id">
              <el-menu-item :index="subitem.id + ''" @click="handleMenuItemClick(subitem)">
                <el-icon v-if="item.icon" :class="item.icon"></el-icon>
                <span>{{subitem.name}}</span>
              </el-menu-item>
            </template>

          </el-sub-menu>
        </template>

        <!-- 当取到的item里面的type为2时，则没有二级菜单，内容用el-menu-item直接显示-->
        <template v-else-if="item.type === 2">
          <el-menu-item :index="item.id + ''">
            <!-- 表示如果数据里面的icon有值则显示该icon  没有则为空 -->
            <el-icon v-if="item.icon" :class="item.icon"></el-icon>
            <span>{{item.name}}</span>
          </el-menu-item>
        </template>

      </template>
    </el-menu>
  </div>
</template>

<script lang="ts">
import { Monitor,Setting,Goods,ChatLineRound } from '@element-plus/icons-vue'

import { defineComponent, computed, ref } from 'vue'
import {useStore} from '@/store' //导入自己定义的useStore

import {useRouter, useRoute} from 'vue-router' //useRoute可以拿到当前路由

import {pathMapToMenu} from '@/utils/map-menu'

export default defineComponent({
  components:{
    Monitor,
    Setting,
    Goods,
    ChatLineRound
  },
  props: {
    collapse: {
      type: Boolean,
      default: false
    }
  },
  setup () {
    //store相关
    const store = useStore() //使用useStore
    const userMenus = computed(() => store.state.login.userMenus)
    //router相关
    const router = useRouter() //使用useRouter
    const route = useRoute() //取到当前路由对象
    const currentPath = route.path //取到当前路由对象的路径

    //data相关
    const menu = pathMapToMenu(userMenus.value, currentPath) //根据路径匹配到对应的菜单上面
    const defaultValue = ref(menu.id + '') //要求放入字符串，则加上一个' '将其转为字符串


    //事件处理相关
    const handleMenuItemClick = (item:any) => {
      router.push({ //将item.url的值push进router中  没有值则跳转至not-found界面
        path: item.url ?? '/not-found'
      })
    }

    return {
      userMenus,
      defaultValue,
      handleMenuItemClick
    }
  }
})
</script>

<style scoped lang="less">
.nav-menu {
  height: 100%;
  background-color: #001529;

  .logo {
    display: flex;
    height: 28px;
    padding: 12px 10px 8px 10px;
    flex-direction: row;
    justify-content: flex-start;
    align-items: center;

    .img {
      height: 100%;
      margin: 0 10px;
    }

    .title {
      font-size: 16px;
      font-weight: 700;
      color: white;
    }
  }

  .el-menu {
    border-right: none;
  }

  .el-menu {
    border-right: none;
  }

  // 目录
  .el-submenu {
    background-color: #001529 !important;
    // 二级菜单 ( 默认背景 )
    .el-menu-item {
      padding-left: 50px !important;
      background-color: #0c2135 !important;
    }
  }

  :deep(.el-submenu__title) {
    background-color: #001529 !important;
  }

  // hover 高亮
  .el-menu-item:hover {
    color: #fff !important; // 菜单
  }

  .el-menu-item.is-active {
    color: #fff !important;
    background-color: #0a60bd !important;
  }
}

.el-menu-vertical:not(.el-menu--collapse) {
  width: 100%;
  height: calc(100% - 48px);
}
</style>
