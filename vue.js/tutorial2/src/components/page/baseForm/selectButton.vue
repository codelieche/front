<template>
  <Select
    v-model="value"
    :placeholder="placeholder"
    v-bind="props"
    class="select-button"
    :style="{ width: width > 0 ? `${width}px` : '100%' }"
  >
    <Option
      v-for="(item, index) in options"
      :value="item.value"
      :key="index"
      :disabled="item.disabled !== undefined ? item.disabled : false"
    >
      {{ item.label || item.text }}
    </Option>
  </Select>
</template>
<script>
/**
 * SelectButton
 * 传递一个Url，配置好optionFields就会自动生成好Select
 * optionFields示例：
 * [
 *     {target: 'value', source: 'id'},
 *     {target: 'value', source: ['username', 'nick_name'], separator: '-'},
 *     {target: 'label', source: (value) => return `${value.username}-${value.nick_name}`},
 * ]
 * 那么设置Select按钮有3种方式，一个字段/多个字段/处理函数
 *
 * url和optionFields组合之后，经过处理得到：options
 */
import useFetchChoices from '@/components/page/baseForm/useFetchChoices'

export default {
  name: 'SelectButton',
  props: {
    url: String, // 获取Select选项的api地址
    optionFields: Array, // 选项字段
    initValue: String, // 选项初始化的值，数值类型/字符
    placeholder: {
      type: String,
      default: () => '请选择',
    },
    width: {
      type: Number,
      default: () => 120,
    },
    handleValueChange: Function, // 当值变更的时候，触发变更
    listDataPath: String, // 选项列表的路径(不同后端，api返回结构不一样)
    props: {
      // Select相关的属性配置
      type: Object,
      default: () => {
        return {
          filterable: true,
          clearable: true,
        }
      },
    },
  },
  data() {
    return {
      value: null, // Select的值
      options: [],
    }
  },
  mounted() {
    useFetchChoices(this.url, this.optionFields, this.setOptions, this.listDataPath)
  },
  methods: {
    setOptions(options) {
      // console.log(options.filter((item) => item.value !== undefined))
      this.options = options.filter((item) => item.value !== undefined)
    },
  },
  watch: {
    initValue: {
      handler: function (newValue) {
        this.value = newValue
      },
      immediate: true,
    },
    value: function (newValue) {
      if (this.handleValueChange) {
        this.handleValueChange(newValue)
      } else {
        console.log('Select Button的值发生了改变:', newValue)
      }
    },
  },
}
</script>