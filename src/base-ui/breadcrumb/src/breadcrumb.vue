<template>
  <div class="breadcrumb">
     <el-breadcrumb separator="/">
       <template v-for="item in breadcrumbs" :key="item.name">
        <el-breadcrumb-item :to="{ path: item.path }">{{item.name}}</el-breadcrumb-item>
       </template>
      </el-breadcrumb>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType } from 'vue'
import {IBreadcrumb} from '../types/index'

export default defineComponent({
  props: {
    breadcrumbs: { //接收的外部传入的参数
      type: Array as PropType<IBreadcrumb[]>,
      default: () => []
    }
  },

  setup () {


    return {}
  }
})
</script>

<style scoped>

</style>
