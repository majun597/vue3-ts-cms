<template>
  <div class="nav-header">
    <i class="fold-menu el-icon-s-fold" @click="handelFoldChange">fold</i>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue'

export default defineComponent({
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

    return {
      isFold,
      handelFoldChange
    }
  }
})
</script>

<style scoped lang="less">
.nav-header {
  .fold-menu {
    font-size: 25px;
    // 鼠标放上去的时候显示
    cursor: pointer;
  }
}
</style>
