<template>
  <Modal
    class="base-form-modal"
    v-model="visibleModal"
    :title="title"
    @on-ok="handleModalClose"
    @on-cancel="handleModalClose"
  >
    <BaseForm
      :data="data"
      :fields="fields"
      :labelWidth="labelWidth"
      :props="props"
      :title="buttonTitle"
      :handleSubmit="handleSubmit"
    >
    </BaseForm>
    <div slot="footer">
    </div>
  </Modal>
</template>

<script>
import BaseForm from './baseForm.vue'

export default {
  name: 'BaseFormModal',
  components: {
    BaseForm,
  },
  props: {
    title: {
      type: String,
      default: () => '表单对话框',
    },
    visible: {
      type: Boolean,
      default: () => false,
    },
    width: {
      type: Number,
      default: () => 460,
    },
    // 对话框关闭时候的处理函数
    afterCloseHandle: Function,
    buttonTitle: {
      // 表单的标题
      type: String,
      default: () => '提交',
    },
    fields: {
      // 字段类型，记得别传错了
      type: Array,
      default: () => [],
    },
    data: {
      type: Object,
      default: () => {},
    },
    labelWidth: {
      type: Number,
      default: () => 100,
    },
    props: Object, // 表格的其它属性
    handleSubmit: Function, // 表单提交函数
  },
  data: function () {
    return {
      visibleModal: false,
    }
  },
  methods: {
    handleModalClose: function () {
      // 对话框关闭
      this.visibleModal = false
      if (this.afterCloseHandle) {
        this.afterCloseHandle()
      }
    },
  },
  watch: {
    visible: {
      handler: function (newVvalue) {
        if (this.visibleModal !== newVvalue) {
          this.visibleModal = newVvalue
        }
      },
      immediate: true,
    },
  },
}
</script>