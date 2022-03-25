<template>
  <div class="role">
    <div class="content">
      <!-- 1.顶部搜索栏 -->
      <page-search :searchFormConfig="searchFormConfig" @resetBtnClick="handleResetClick" @queryBtnClick="handleQueryClick"></page-search>
      <!-- 2.表格数据栏 -->
      <page-content ref="pageContentRef" :contentTableConfig="contentTableConfig" pageName="users"></page-content>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent} from 'vue'

//引入组件
import PageSearch from '@/components/page-search'
import PageContent from '@/components/page-content'

//引入组件对应的配置文件
import {searchFormConfig} from './config/search.config'
import {contentTableConfig} from './config/content.config'

import {usePageSearch} from '@/hooks/usePageSearch'

export default defineComponent({
  name: 'users',
  components: {
    PageSearch,
    PageContent,
  },
  setup() {
    const [pageContentRef, handleResetClick, handleQueryClick] = usePageSearch()

    return {
      searchFormConfig,
      contentTableConfig,
      pageContentRef,
      handleQueryClick,
      handleResetClick
    }
  }
})
</script>

<style scoped>

</style>
