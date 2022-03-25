import { IForm } from "@/base-ui/form";

export const searchFormConfig: IForm = {
    labelWidth: '120px',
    itemStyle: {
    padding: '10px 40px'
    },
    // colLayout: { //也可以直接将span设置为一个固定值
    // span: 8
    // },
    formItems: [
      {
        field: 'name',
        type: 'input',
        label: '权限名称',
        placeholder: '请输入权限名称'
      },
      {
        field: 'intro',
        type: 'input',
        label: '权限介绍',
        placeholder: '请输入权限介绍'
      },
        {
          field: 'createtime',
          type: 'datepicker',
          label: '创建时间',
          otherOptions: {
            startPlaceholder: 'start time',
            endPlaceholder: 'end time',
            type: 'daterange'
          }
        },
      ]
}
