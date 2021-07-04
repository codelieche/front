<template>
  <div class="full grey">
    <BaseContent title="表单示例">
      <BaseForm
        :fields="fields"
        title="添加用户"
        :props="formProps"
        :data="formData"
      >
      </BaseForm>
    </BaseContent>
  </div>
</template>

<script>
import BaseContent from '@/components/layout/content/base.vue'
import BaseForm from '@/components/page/baseForm/'
export default {
  name: 'BaseContentDemo003',
  components: {
    BaseContent,
    BaseForm,
  },
  data() {
    const action = 'add'
    const cities = [
      { text: '北京', value: 'beijing' },
      { text: '上海', value: 'shanghai' },
      { text: '广州', value: 'guangzhou' },
      { text: '深圳', value: 'shenzhen' },
      { text: '杭州', value: 'hangzhou' },
    ]
    const fields = [
      {
        name: 'username',
        type: 'input',
        label: '用户名:',
        props: {
          //   size: 'small',
          disabled: action !== 'add',
          placeholder: '用户名',
        },
      },
      {
        name: 'age',
        type: 'number',
        label: '年龄',
        rules: [{ required: true, message: '请输入年龄' }],
        props: {
          'controls-outside': true,
        },
      },
      {
        name: 'password',
        type: 'input',
        label: '密码:',
        props: {
          //   size: 'small',
          disabled: false,
          placeholder: 'password',
          type: 'password',
          password: true,
        },
        hiddle: action !== 'add',
      },
      {
        name: 're_password',
        type: 'input',
        label: '确认密码:',
        props: {
          // size: 'small',
          disabled: false,
          placeholder: '确认密码',
          type: 'password',
          password: true,
        },
        hiddle: action !== 'add',
      },
      {
        name: 'is_active',
        type: 'switch',
        label: '状态:',
        openLabel: 'On',
        closeLabel: 'Off',
        rules: [
          {
            required: false,
            message: '请选择状态',
          },
        ],
        props: {
          size: 'large',
        },
      },
      {
        name: 'city',
        type: 'radio',
        label: '城市',
        choices: cities,
        rules: [
          {
            required: true,
            message: '请选择城市',
          },
        ],
        props: {
          type: 'button',
        },
      },
      {
        name: 'cities',
        type: 'checkbox',
        label: '城市',
        choices: cities,
        rules: [
          {
            required: true,
            message: '请选择去过的城市',
          },
        ],
        props: {
          //   type: "button",
        },
      },
      {
        name: 'love-city',
        type: 'select',
        label: '最爱的城市',
        choices: cities,
        rules: [
          {
            required: true,
            message: '请选择最喜欢的城市',
          },
        ],
        props: {
          filterrable: true,
          clearable: true,
          placeholder: '最爱的城市',
        },
      },
      {
        name: 'groups',
        type: 'transfer',
        label: '分组',
        rules: [
          {
            required: true,
            message: '请选择分组',
          },
        ],
        choices: [
          { key: 'develop', label: '开发' },
          { key: 'front', label: '前端' },
          { key: 'backend', label: '后端' },
          { key: 'devops', label: '运维' },
        ],
        props: {
          //   targetKeys: ['devops']
        },
      },
      {
        name: 'can_view',
        type: 'radio-button',
        label: '访问权限:',
        choices: [
          { text: '能', value: 1 },
          { text: '否', value: 0 },
        ],
        rules: [
          {
            required: false,
            message: '请选择访问权限',
          },
        ],
        props: {
          //   size: 'mini',
        },
      },
      {
        name: 'is_superuser',
        type: 'radio-button',
        label: '超级用户:',
        choices: [
          { text: '是', value: 1 },
          { text: '否', value: 0 },
        ],
        rules: [
          {
            required: false,
            message: '请设置是否是超级用户',
          },
        ],
        props: {
          //   size: 'mini',
        },
      },
      {
        name: 'mobile',
        type: 'input',
        label: '手机号:',
        rules: [
          {
            required: true,
            message: '请设置手机号',
          },
        ],
        props: {
          //   size: 'small',
        },
      },
      {
        name: 'size',
        type: 'slider',
        label: '大小',
        props: {
          //   size: 'small',
          min: 0,
          max: 100,
          step: 10,
          range: true,
          'show-input': true,
          marks: {
            0: '0',
            20: '20',
            50: '50',
            80: '80',
            100: '100',
          },
        },
      },
      {
        name: 'email',
        type: 'input',
        label: '邮箱:',
        props: {
          //   size: 'small',
        },
      },
    ]
    return {
      fields,
      formData: {
        cities: [],
        groups: [],
      },
      formProps: {
        inline: false,
        'show-message': true,
      },
    }
  },
  mounted() {
      const that = this
    setTimeout(function () {
      that.formData['username'] = 'codelieche'
      that.formData['groups'] = ['develop']
      that.formData['is_superuser'] = 1
    }, 1000)
  },
}
</script>