<template>
  <div class="page-search">
      <hy-form v-bind="searchFormConfig" v-model="formData">
        <!-- 使用插槽 -->
        <template #header>
          <h1 class="header">高级检索</h1>
        </template>
        <template #footer>
          <div class="handle-btns">
            <el-button @click="handleResetClick">
              <el-icon style="margin-right: 5px;"><refresh /></el-icon>
              重置
            </el-button>
            <el-button style="background-color: deepskyblue;" @click="handleQueryClick">
              <el-icon style="margin-right: 5px;"><search /></el-icon>
                search
            </el-button>
          </div>
        </template>
      </hy-form>
  </div>
</template>

<script lang="ts">
import { defineComponent,reactive } from 'vue'
import HyForm from '@/base-ui/form'
import { Search,Refresh } from '@element-plus/icons-vue'

export default defineComponent({
  props: {
    searchFormConfig: {
      type: Object,
      require: true
    }
  },
  components: {
    HyForm,
    Search,
    Refresh
  },
  emits:['resetBtnClick', 'queryBtnClick'],
  setup (props, {emit}) {
    //优化一： formData里面的属性应该动态来决定
    //双向绑定的属性应该是由配置文件的field来决定
    const formItems = props.searchFormConfig?.formItems ?? [] //取到searchFormConfig里面的formItems
    const formOriginData: any = {} // 定义一个原始的数据对象
    for(const item of formItems) {//遍历items
      formOriginData[item.field] = ''  //将取到的item的field放入这个原始数据对象里面
    }//这样就可以取到一个动态的origindata数据
    const formData = reactive(formOriginData)

    //优化二：当用户点击重置时
    //从formOriginData拿到所有的key，通过key取到formOriginData的值，然后将其赋值给formData里面的value的某些属性
    const handleResetClick = () => {
      for (const key in formOriginData) {
        // formOriginData[key] 这里面是有值的，是你输入的值，想要重置，全部置空就行
        // formData[`${key}`] = formOriginData[key] //将原始的数据再赋值给formData
        formData[key] = ""
        emit('resetBtnClick')
      }
    }

    //优化二：当用户点击搜索时
    const handleQueryClick = () => {
      emit('queryBtnClick', formData.value) //将formData里面的数据发送出去，这样才能拿到并进行搜索
    }
    return {
      formData,
      handleResetClick,
      handleQueryClick
    }
  }
})
</script>

<style scoped>
  .header {
    padding-left: 20px;
    color: red;
    text-align: left;
  }

  .handle-btns {
    padding: 0 50px 20px 0;
    text-align: right;
  }
</style>
