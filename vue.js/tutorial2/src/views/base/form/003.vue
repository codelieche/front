<template>
  <div class="full grey">
    <BaseContent title="表单示例003" :fixHeader="true">
      <BaseForm :data="formData" :fields="formFields" />
      <Divider></Divider>
      {{ formData }}
      <hr />
      {{ formFields }}
    </BaseContent>
  </div>
</template>

<script>
import BaseContent from '@/components/layout/content/'
import BaseForm from '@/components/page/baseForm/'
import useFetchChoices from '@/components/page/baseForm/useFetchChoices'

export default {
  name: 'FormDemo003',
  components: {
    BaseContent,
    BaseForm,
  },
  data() {
    const groupOptionFields = [
      { target: 'value', source: 'id' },
      { target: 'text', source: 'name' },
      { target: 'disabled', handleFunc: (item) => item.id % 5 == 3 },
    ]
    const formFields = [
      {
        name: 'group',
        type: 'select',
        label: '分组',
        rules: [{ required: true, message: '请输入分组' }],
        choices: [],
        props: {
          filterable: true,
          clearable: true,
        },
      },
      {
        name: 'name',
        type: 'input',
        label: '分组名',
        rules: [{ required: true, message: '请输入分组名' }],
      },
    ]
    return {
      formData: {},
      formFields,
      groupOptionFields,
    }
  },
  mounted() {
    useFetchChoices(
      '/api/v1/account/group/',
      this.groupOptionFields,
      this.setFormGroupOptions
    )
  },
  methods: {
    setFormGroupOptions: function (values) {
      //   console.log('values:', values)
      this.formFields.forEach((item) => {
        if (item['name'] === 'group') {
          item['choices'] = values.filter((item) => item.value !== undefined)
          console.log(item)
        }
      })
    },
  },
}
</script>