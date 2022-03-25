<template>
  <div class="hy-form">
      <!-- 定义头部检索插槽 -->
      <div class="header">
        <slot name="header"></slot>
      </div>

      <el-form :label-width="labelwidth">
        <el-row>
          <template v-for="item in formItems" :key="item.label">
             <el-col v-bind="colLayout">
                <el-form-item :label="item.label" :rules="item.rules" :style="itemStyle">

                  <template v-if="item.type === 'input' || item.type === 'password'">
                    <el-input
                      :placeholder="item.placeholder"
                      :show-password="item.type === 'password'"
                      v-model="formData[`${item.field}`]"></el-input>
                  </template>

                  <template v-else-if="item.type === 'select'">
                    <el-select :placeholder="item.placeholder" style="width: 100%" v-model="formData[`${item.field}`]">
                      <el-option v-for="option in item.options" :key="option.value" :value="option.value">
                        {{option.title}}
                      </el-option>
                    </el-select>
                  </template>

                  <template v-else-if="item.type === 'datepicker'">
                    <el-date-picker v-bind="item.otherOptions" style="width: 100%" v-model="formData[`${item.field}`]" ></el-date-picker>
                  </template>
                </el-form-item>
              </el-col>
          </template>
        </el-row>
      </el-form>

      <!-- 定义尾部插槽 -->
      <div class="footer">
        <slot name="footer"></slot>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, PropType,  computed } from 'vue'
import {IFormItem} from '../types/index'

export default defineComponent({
  props: {
    modelValue: { //modelValue值从外部传入
      type: Object,
      require: true
    },
    formItems: { //要求传入数组类型的表单数据
      type: Array as PropType<IFormItem[]>, //表明formItems的类型为接口IFormItem里面定义的类型
      default: () => [] //使用default时，如果是数组或者对象一定要使用箭头函数
    },
    labelwidth: { //要求传入表单的宽度 默认是100px
      type: String,
      default: '100px'
    },
    itemStyle: { //要求传入表单的上下左右的内边距 默认是10px和40px
      type: Object,
      default: () => ({ padding: '10px 40px' })
    },
    colLayout: { //实现表单大小的自适应
      type: Object,
      default: () => ({
        xl: 6,
        lg: 8,
        md: 12,
        sm: 24,
        xs: 24
      })
    }
  },
  emits: ['update: modelValue'],
  setup (props, {emit}) {
    //方法一
    const formData = computed({
      get: () => props.modelValue,  //获取到上面props里面的modelValue值
      set: (newValue) => {  //当输入框输入新的内容时，将新的内容传入到modelValue里面
        emit('update: modelValue', newValue) //然后再发送出去
      }
    })

    //方法二
     //const formData = reactive({...props.modelValue}) //...props.modelValue将原来的对象拷贝一份传给formData
    // 使用watch对formData进行监听 拿到newValue之后，再emit出去  当输入的内容发生改变的时候就发送出去

    // watch(
    //   formData,
    //   (newValue) => {
    //     console.log(newValue)
    //     emit('update: modelValue', newValue)
    //   }, { //进行深度监听
    //   deep: true
    // })

    return {
      formData
    }
  }
})
</script>

<style scoped lang="less">
  .hy-form {
    padding-top: 22px;

    .form-item{
      padding: 5px 30px;
    }
  }
</style>
