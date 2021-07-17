<template>
  <div class="full grey">
    <BaseContent
      title="内容布局示例001"
      :showBack="false"
      :tabs="tabs"
      :defaultTab="defaultTab"
      :message="message"
      messageType="error"
    >
      <!-- 右侧的按钮 -->
      <div slot="tools">
        <Button @click="reFreshTimes += 1">刷新</Button>
        <Button type="primary" @click="message += 'add '">添加</Button>
        <Button type="primary" @click="visible = true">添加标签</Button>
      </div>

      <!-- 默认 -->
      <template #default="{ activeTab }">
        <TableDemo v-if="activeTab === 'info'" />

        <div v-if="activeTab === 'base'">
          <TopBar title="表单基本示例" />
          <BaseForm
            :data="formData"
            :fields="formFields"
            :visible="visible"
            title="给资源添加标签"
            :labelWidth="100"
            :handleSubmit="handleSubmit"
            :afterCloseHandle="afterCloseHandle"
          >
          </BaseForm>
          <TopBar title="详情信息" />
          <div>
            {{ data }}
          </div>
        </div>
        <div v-else>
          {{ activeTab }}
        </div>

        <!-- 表单对话框 -->
        <BaseFormModal
          :data="formData"
          :fields="formFields"
          :visible="visible"
          title="添加标签"
          :labelWidth="100"
          :handleSubmit="handleSubmit"
          :afterCloseHandle="afterCloseHandle"
        >
        </BaseFormModal>
      </template>
    </BaseContent>
  </div>
</template>

<script>
import BaseContent from '@/components/layout/content/base.vue'
import BaseForm from '@/components/page/baseForm/baseForm.vue'
import BaseFormModal from '@/components/page/baseForm/baseFormDialog.vue'
import setFetchDetailDataMixin from '@/mixins/setFetchDetailDataMixin'
import TableDemo from '../table/demo.vue'

export default {
  name: 'BaseContentDemo001',
  mixins: [setFetchDetailDataMixin('.', 200)],
  components: {
    BaseContent,
    TableDemo,
    BaseForm,
    BaseFormModal,
  },
  mounted() {
    // setFetchDetailDataMixin需要设置获取信息
    this.apiUrl = '/api/v1/docs/article/1'
    // 修改详情数据的路径
    this.detailDataPath = '.'
    // this.detailDataPath = '.auth'
  },
  data() {
    const formData = {
      tag: 'key',
      value: 'value',
    }
    const formFields = [
      {
        name: 'tag',
        type: 'input',
        label: '标签',
        props: {
          clearable: true,
          placeholder: 'key',
        },
      },
      {
        name: 'value',
        type: 'input',
        label: '标签值',
        rules: [{ required: true, message: '请输入标签值' }],
        props: {
          clearable: true,
          placeholder: 'value',
        },
      },
    ]
    return {
      tabs: [
        { label: '基本信息', name: 'base' },
        { label: '详细信息', name: 'info' },
        '审计日志',
      ],
      defaultTab: 'info',
      message: '',
      // 表单
      formData,
      formFields,
      visible: false,
    }
  },
  methods: {
    afterCloseHandle: function () {
      this.visible = false
    },
    handleSubmit: function (data) {
      console.log('表单提交：', data)
      this.afterCloseHandle()
      this.$Message.success(`Data:${JSON.stringify(data)}`)
    },
  },
}
</script>