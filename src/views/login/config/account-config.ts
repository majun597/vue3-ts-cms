//将表单的输入规则放到这个文件里面，需要的时候导入即可

//编写表单输入的规则
//将规则定义为对象，里面有对应的item的验证规则，可以直接传入给el-form
export const rules = {
  name: [
    {
      //规则1
      require: true,  //是否必传
      message: '用户名为必传内容！', //若没有传入内容则显示该message
      trigger: 'blur', //trigger有两个值：blur和change，blur代表失去焦点的时候进行表单验证，change代表每改变一次值就进行一次验证
    },
    {
      //规则2
      pattern: /^[a-z0-9]{5,10}$/,  //正则表达式，^代表开始，$代表结束，此处表示必须传入5-10个字母或者数字
      message: '用户名必须传入5-10个字母或者数字!', //若没有传入内容或内容传入错误则显示该message
      trigger: 'blur'
    }
  ],
  password: [
    {
      //规则1
      require: true,  //是否必传
      message: '密码为必传内容！', //若没有传入内容则显示该message
      trigger: 'blur', //trigger有两个值：blur和change，blur代表失去焦点的时候进行表单验证，change代表每改变一次值就进行一次验证
    },
    {
      //规则2
      pattern: /^[a-z0-9]{3,}$/,  //正则表达式，^代表开始，$代表结束，此处表示必须传入3位以上的字母或者数字
      message: '密码必须传入3位以上的字母或者数字!', //若没有传入内容或内容传入错误则显示该message
      trigger: 'blur'
    }
  ]

}
