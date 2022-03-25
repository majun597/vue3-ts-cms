<template>
  <div class="role">
    <div class="content">
      <!-- 1.顶部搜索栏 -->
      <page-search :searchFormConfig="searchFormConfig"></page-search>
      <!-- 2.表格数据栏 -->
      <page-content :contentTableConfig="contentTableConfig" pageName="role"></page-content>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

import PageContent from '@/components/page-content'
import PageSearch from '@/components/page-search'

import {searchFormConfig} from './config/search.config'
import {contentTableConfig} from './config/content.config'

export default defineComponent({
  name: 'role',
  components: {
    PageContent,
    PageSearch
  },
  setup() {
    return {
      contentTableConfig,
      searchFormConfig
    }
  }
})
</script>

<style scoped></style>
