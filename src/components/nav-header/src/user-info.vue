<template>
      <div class="user-info">
        <el-dropdown>
          <span class="el-dropdown-link">
            <el-icon> <user-filled /> </el-icon>
            <span> {{ name }}</span>
            <el-icon class="el-icon--right">
              <arrow-down />
            </el-icon>
          </span>
          <template #dropdown>
            <el-dropdown-menu >
              <el-dropdown-item class="userCenter">用户信息</el-dropdown-item>
              <el-dropdown-item>系统管理</el-dropdown-item>
              <el-dropdown-item divided>
                <el-icon><close-bold /></el-icon>
                退出登录
                </el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
</template>

<script lang="ts">
import { ArrowDown, UserFilled, CloseBold} from '@element-plus/icons-vue'
import { defineComponent, computed } from 'vue'
import {useStore} from '@/store'

export default defineComponent({
  components: {
    ArrowDown,
    UserFilled,
    CloseBold
  },
  setup () {
    const store = useStore()
    const name = computed(() => store.state.login.userInfo.name)

    return {
      name
    }
  }
})
</script>

<style scoped lang="less">
  .el-dropdown-link{
    //鼠标放上去显示小手
    cursor: pointer;
    display: flex;
    justify-content: center;
    align-items: center;
  }
</style>
