<template>
  <div class="page-content">
    <hy-table
        :listData="dataList"
        v-bind="contentTableConfig"
        >
        <!-- header中的插槽 -->
        <template #headerHandler>
          <el-button size="small" type="primary">新建用户</el-button>
        </template>

        <!-- 列中的插槽 -->
        <!-- 状态栏 是否禁用 scope代表作用域插槽-->
        <template #enable="scope">
          <el-button
            plain
            size="small"
            :type="scope.row.enable ? 'success' : 'danger' "
          >{{scope.row.enable ? '启动' : '禁用'}}</el-button>
        </template>
        <!-- 创建时间栏 scope代表作用域插槽-->
        <template #createAt="scope">
          <span>{{$filters.formatTime(scope.row.createAt)}}</span>
        </template>
        <!-- 更新时间栏 scope代表作用域插槽 -->
        <template #updateAt="scope">
          <span>{{$filters.formatTime(scope.row.updateAt)}}</span>
        </template>
        <!-- 操作栏 -->
        <template #handler>
          <div class="handle-btns">
            <el-button type="text" size="small">
              <el-icon><edit /></el-icon>
              编辑
              </el-button>
            <el-button type="danger" size="small">
              <el-icon><delete /></el-icon>
              删除
              </el-button>
          </div>
        </template>
    </hy-table>
  </div>
</template>

<script lang="ts">
import { defineComponent,computed } from 'vue'
import { Edit, Delete} from '@element-plus/icons-vue'
import HyTable from '@/base-ui/table'

import { useStore } from '@/store'

export default defineComponent({
  components: {
    HyTable,
    Edit,
    Delete
  },
  props: {
    contentTableConfig: {
      type: Object,
      required: true
    },
    pageName: {
      type: String,
      required: true
    }
  },
  setup (props) {
    const store = useStore()
    //发送网络请求
    const getPageData = (queryInfo: any = {}) => {
      store.dispatch('system/getPageListAction', {  //dispatch调用getPageListAction函数
        pageName: props.pageName,
        queryInfo: {
          offset: 0,
          size: 10,
          ...queryInfo
        }
      })
    }
    getPageData()

    //从vuex中获取数据
    const dataList = computed(() =>
      store.getters[`system/pageListData`](props.pageName)
    )

    return {
      dataList,
      getPageData
    }
  }
})
</script>

<style scoped>
.page-content {
  padding: 20px;
  border-top: 20px solid #f5f5f5;
}
</style>
