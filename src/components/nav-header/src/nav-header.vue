<template>
  <div class="nav-header">
    <!-- <i class="fold-menu el-icon-s-fold" @click="handelFoldChange">fold</i> -->
    <el-icon class="fold-menu" @click="handelFoldChange"><expand v-if="isFold"/> <fold v-if="!isFold"/></el-icon>
    <div class="content">
      <hy-breadcrumb :breadcrumbs="breadcrumbs"/>
      <user-info></user-info>
    </div>
  </div>
</template>

<script lang="ts">
import { Expand, Fold } from '@element-plus/icons-vue'
import { defineComponent, ref, computed } from 'vue'
import UserInfo from './user-info.vue'
import HyBreadcrumb from '@/base-ui/breadcrumb'
import { useStore } from '@/store'
import {useRoute} from 'vue-router'
import {pathMapBreadcrumbs} from '@/utils/map-menu'

export default defineComponent({
  components: {
    Expand,
    Fold,
    UserInfo,
    HyBreadcrumb
  },
  //定义foldchange事件
  emits: ['foldChange'],
  setup (props, {emit}) {
    //定义一个值，当点击折叠按钮时，决定是否折叠
    const isFold = ref(true)

    const handelFoldChange = () => {
      isFold.value = !isFold.value
      // console.log(isFold.value)
      //将foldchange以及isFold的值传出去
      emit('foldChange', isFold.value)
    }

    //面包屑的数据 [{name: , path: }]
    const store = useStore()
    const breadcrumbs = computed(() => { //使用计算属性，当路由发生改变的时候，重新获取下面的数据
      const userMenus = store.state.login.userMenus //取到userMenu
      const route = useRoute()
      const currentPath = route.path//取到当前路由路径
      return pathMapBreadcrumbs(userMenus, currentPath)
    })
    return {
      isFold,
      handelFoldChange,
      breadcrumbs
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  display: flex;
  width: 100%;
  .fold-menu {
    font-size: 25px;
    // 鼠标放上去的时候显示
    cursor: pointer;
  }
  .content {
    display: flex;
    justify-content: space-between;
    align-items: center;
    flex: 1;
    padding: 0 10px;
  }
}
</style>
