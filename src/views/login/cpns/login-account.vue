<template>
  <div class="login-account">
    <!-- :rules="rules"传入验证规则  :model="account"相当于把account的值永远传给el-form-->
    <el-form
    :rules="rules"
    :model="account"
    label-width="60px"
    ref="formRef"
  >
    <el-form-item label="账号" prop="name">
      <!-- v-model="account.name"实现name和account.name的双向绑定 -->
      <el-input
        v-model="account.name"
      ></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input
        v-model="account.password"
        show-password
      ></el-input>
    </el-form-item>
    <!-- <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRef)"
        >Submit</el-button
      >
      <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
    </el-form-item> -->
  </el-form>
  </div>
</template>

<script lang="ts">
import { defineComponent, reactive, ref } from 'vue'
import {ElForm} from 'element-plus'  //为了拿到ElForm的类型
import {useStore} from 'vuex' //引入useStore

import {rules} from "../config/account-config"
import localCache from '@/utils/cache'

export default defineComponent({

  setup () {
    //获取useStore
    const store = useStore()

    const account = reactive({ //创建一个reactive的account对象
      name: localCache.getCache('name') ?? '', //从本地缓存中查找缓存，若存在则显示在输入框中，不存在则显示空字符串
      password: localCache.getCache('password') ?? '',
    })

    const formRef = ref<InstanceType<typeof ElForm>>()
    //实现登录操作相关的逻辑
    const loginAction = (isKeepPassword: boolean) => {
      // formRef.value就代表formRef绑定的组件对象   该组件对象里面存在validate（验证），验证之后存在一个回调，该回调会返回一个boolean类型的值valid，验证通过则返回true
      formRef.value?.validate((valid: boolean) => {
        if (valid) {
          //1.判断是否需要记住密码
          if(isKeepPassword) {
            //如果需要记住密码，则进行本地缓存(sessionstorage：当窗口关闭就清除缓存 或者localstorage：不会在窗口关闭时清除)
            //调用cache里面的缓存方法
            localCache.setCache('name', account.name)
            localCache.setCache('password', account.password)
          } else {
            //如果没有勾选记住密码，则不填充密码输入框
            localCache.deleteCache('password')
          }

          //2.开始登录验证
          // 这里应该要传参进去吧？不太清楚vue3，还没学过，我觉得应该是这样
          store.dispatch('login/accountLoginAction')
        }
      })
    }

    return {
      account,
      rules,
      loginAction,
      formRef
    }
  }
})
</script>

<style scoped>

</style>
