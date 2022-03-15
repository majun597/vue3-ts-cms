<template>
  <div class="login-phone">
    <el-form
    :rules="rules"
    :model="phone"
    label-width="60px"
  >
    <el-form-item label="手机号" prop="num">
      <el-input
        v-model="phone.num"
      ></el-input>
    </el-form-item>

    <el-form-item label="验证码" prop="code">
      <div class="get-code">
        <el-input v-model="phone.code"></el-input>
        <el-button type="primary" class="verify-code">获取验证码</el-button>
      </div>
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
import { defineComponent, reactive } from 'vue'
import {rules} from "../config/phone-config"

export default defineComponent({

  setup () {
    const phone = reactive({ //创建一个reactive的phone对象
      num: '',
      code: ''
    })

    return {
      phone,
      rules
    }
  }
})
</script>

<style scoped>
.get-code {
  display: flex;
}

.verify-code {
  margin-left: 6px;
}
</style>
