<template>
  <div class="login-panel">
    <h1 class="title">后台管理系统</h1>
      <!-- 登录界面 -->
      <el-tabs type="border-card" class="demo-tabs" :stretch="true" v-model="currentTab">
        <el-tab-pane name="account">
          <template #label>
            <span class="custom-tabs-label">
              <span><i class="el-icon-user-solid"></i></span>
              <!-- <el-icon><avatar /></el-icon> -->
              <span>账号登录</span>
            </span>
          </template>
          <login-account ref="accountRef"/>
        </el-tab-pane>
        <el-tab-pane name="phone">
          <template #label>
            <span class="custom-tabs-label">
              <span><i class="el-icon-date"></i></span>
              <!-- <el-icon><cellphone /></el-icon> -->
              <span>手机登录</span>
            </span>
          </template>
          <login-phone ref="phoneRef"/>
        </el-tab-pane>
      </el-tabs>

      <!-- 用户控制处 -->
      <div class="account-control">
        <el-checkbox v-model="isKeepPassword">记住密码</el-checkbox>
        <el-link type="primary" class="forget-password">忘记密码</el-link>
      </div>

      <!-- 立即登录 -->
      <el-button type="primary" class="login-btn" @click="handleLoginClick">立即登录</el-button>
  </div>
</template>

<script lang="ts">
import {defineComponent} from 'vue'
import {ref} from 'vue'

import LoginAccount from './login-account.vue'
import LoginPhone from './login-phone.vue'

export default defineComponent({
  components: {
    LoginAccount,
    LoginPhone
  },
  setup () {
    //1.定义属性
    const isKeepPassword = ref(true)  //是否需要记住密码，默认为true
    //在此处调用login-account里面的loginAction：先拿到组件对象(代理proxy)
    const accountRef = ref<InstanceType<typeof LoginAccount>>() //<InstanceType<typeof LoginAccount>>拿到该对象的实例类型
    const phoneRef = ref<InstanceType<typeof LoginPhone>>()
    const currentTab = ref<string>('account') //默认点进来是账号登录

    //2.定义方法
    const handleLoginClick = () => {
      if(currentTab.value === 'account') { //如果当前的值为account，则进入账号登录界面，进行账号登录的一些逻辑
        accountRef.value?.loginAction(isKeepPassword.value) //通过accountRef.value拿到组件对象 value有值才调用
      } else { //否则进入手机登录界面，进行手机登录的逻辑
        console.log("调用phoneRef的loginAction")
      }

    }

    return {
      isKeepPassword,
      handleLoginClick,
      currentTab,
      accountRef,
      phoneRef
    }
  }
})
</script>

<style scoped lang="less">
.login-panel {
  width: 320px;
}

.title {
  text-align: center;
}

.account-control {
  margin-top: 10px;
  //实现内容分别靠两边
  display:flex;
  justify-content:space-between;

}

.login-btn {
  width: 100%;
  height: 40px;
  margin-top: 20px;
}
</style>
