
<!-- 定义表格组件 -->
<template>
  <div class="hy-table">
    <!-- 顶部栏 -->
    <div class="header">
      <!-- 定义具名插槽，就可以让使用者来决定是否添加该div -->
      <slot name="header">
        <!-- title由外界传入,使用者决定 -->
        <div class="title">{{title}}</div>
        <div class="handler">
          <slot name="headerHandler"></slot>
        </div>
      </slot>
    </div>
    <!-- 内容表单栏 -->
    <el-table :data="listData" border style="width: 100%" @selection-change="handleSelectionChange">
          <!-- 添加选择框 -->
          <el-table-column v-if="showSelectColumn" type="selection" align="center" width="60"></el-table-column>
          <!-- 添加序号 -->
          <el-table-column v-if="showIndexColumn" type="index" label="序号" align="center" width="80"></el-table-column>
          <!-- 展示数据 -->
          <template v-for="propItem in propList" :key="propItem.prop">
            <el-table-column v-bind="propItem" align="center">
              <template #default="scope">
                <slot :name="propItem.slotName" :row="scope.row">{{scope.row[propItem.prop]}}</slot>
              </template>
            </el-table-column>
          </template>
    </el-table>
    <!-- 底部栏 -->
    <div class="footer">
      <!-- 定义具名插槽，就可以让使用者来决定是否添加该div -->
      <slot name="footer">
        <el-pagination
          v-model:currentPage="currentPage4"
          v-model:page-size="pageSize4"
          :page-sizes="[100, 200, 300, 400]"
          :small="small"
          :disabled="disabled"
          :background="background"
          layout="total, sizes, prev, pager, next, jumper"
          :total="40"
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
        />
      </slot>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent,ref } from 'vue'

export default defineComponent({
  //定义在使用这个组件时需要传入的参数
  props: {
    title: {
      type: String,
      default: ''
    },
    listData: {
      type: Array,
      required: true
    },
    propList: {
      type: Array,
      required: true
    },
    showIndexColumn: {
      type: Boolean,
      default: false
    },
    showSelectColumn:{
      type: Boolean,
      default: true
    },
  },
  emits: ['selectionChange'], //定义发送数据的函数
  setup (props, {emit}) {
    //定义当checkbox被选中时触发的函数
    const handleSelectionChange = (value: any) => {
      emit('selectionChange', value) //将拿到的value发送出去给相应的组件
    }

    const currentPage4 = ref(1)
    const pageSize4 = ref(10)
    const small = ref(false)
    const background = ref(false)
    const disabled = ref(false)

    const handleSizeChange = (val: number) => {
      console.log(`${val} items per page`)
    }
    const handleCurrentChange = (val: number) => {
      console.log(`current page: ${val}`)
    }
    return {
      handleSelectionChange,
      currentPage4,
      pageSize4,
      small,
      background,
      disabled,
      handleSizeChange,
      handleCurrentChange
    }
  }
})
</script>

<style lang="less" scoped>
.header {
  display: flex;
  height: 45px;
  padding: 0 5px;
  justify-content: space-between;
  align-items: center;

  .title {
    font-size: 20px;
    font-weight: 700;
  }

  .handler {
    align-items: center;
  }
}

.footer {
  display: flex;
  margin-top: 15px;
  justify-content: right;
  .el-pagination {
    text-align: right;
  }
}
</style>
