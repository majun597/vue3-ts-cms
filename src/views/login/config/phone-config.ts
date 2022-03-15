//将表单的输入规则放到这个文件里面，需要的时候导入即可

//编写表单输入的规则
//将规则定义为对象，里面有对应的item的验证规则，可以直接传入给el-form
export const rules = {
  num: [
    {
      //规则1
      require: true,  //是否必传
      message: '手机号为必传内容！', //若没有传入内容则显示该message
      trigger: 'blur', //trigger有两个值：blur和change，blur代表失去焦点的时候进行表单验证，change代表每改变一次值就进行一次验证
    },
    {
      //规则2
      pattern: /^[0-9]{11,11}$/,  //正则表达式，^代表开始，$代表结束，此处表示必须传入11个数字
      message: '手机号必须传入11个数字!', //若没有传入内容或内容传入错误则显示该message
      trigger: 'blur'
    }
  ],
  code: [
    {
      //规则1
      require: true,  //是否必传
      message: '验证码为必传内容！', //若没有传入内容则显示该message
      trigger: 'blur', //trigger有两个值：blur和change，blur代表失去焦点的时候进行表单验证，change代表每改变一次值就进行一次验证
    },
    {
      //规则2
      pattern: /^[0-9]{6,6}$/,  //正则表达式，^代表开始，$代表结束，此处表示必须传入6位数字
      message: '验证码必须传入必须传入6位数字!', //若没有传入内容或内容传入错误则显示该message
      trigger: 'blur'
    }
  ]

}
