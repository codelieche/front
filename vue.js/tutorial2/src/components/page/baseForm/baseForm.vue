<template>
  <Form
    :model="formData"
    :label-width="labelWidth"
    ref="formRef"
    v-bind="props"
    class="base-form"
  >
    <FormItem
      :label="labelWidth > 0 ? item.label : ''"
      v-for="(item, index) in fields"
      :key="index"
      :prop="item.name"
      :rules="item.rules"
    >
      <slot :name="item.name" :field="item">
        <!-- Input类型的 -->
        <Input
          v-model="formData[item.name]"
          v-if="item.type === 'input'"
          v-bind="item.props"
        ></Input>

        <!-- Input Number -->
        <InputNumber
          v-model="formData[item.name]"
          v-else-if="item.type === 'number'"
          v-bind="item.props"
        ></InputNumber>

        <!-- 选择Switch -->
        <ISwitch
          v-model="formData[item.name]"
          v-else-if="item.type === 'switch'"
          v-bind="item.props"
        >
          <span slot="open"> {{ item.openLabel ? item.openLabel : '开' }}</span>
          <span slot="close">
            {{ item.closeLabel ? item.closeLabel : '关' }}</span
          >
        </ISwitch>

        <!-- 单选框 -->
        <RadioGroup
          v-model="formData[item.name]"
          v-else-if="item.type === 'radio'"
          v-bind="item.props"
        >
          <Radio
            :label="choice.value"
            v-for="(choice, index) in item.choices"
            :key="index"
            >{{ choice.text }}</Radio
          >
        </RadioGroup>
        <!-- 单选按钮 -->

        <!-- 单选框 -->
        <RadioGroup
          v-model="formData[item.name]"
          v-else-if="item.type === 'radio-button'"
          type="button"
          button-style="solid"
          v-bind="item.props"
        >
          <Radio
            :label="choice.value"
            v-for="(choice, index) in item.choices"
            :key="index"
            >{{ choice.text || choice.label }}</Radio
          >
        </RadioGroup>

        <!-- 多选框 -->
        <CheckboxGroup
          v-model="formData[item.name]"
          v-else-if="item.type === 'checkbox' && !item.hiddle"
          v-bind="item.props"
        >
          <Checkbox
            :label="choice.value"
            v-for="(choice, index) in item.choices"
            :name="item.name"
            :key="index"
            >{{ choice.text }}</Checkbox
          >
        </CheckboxGroup>

        <!-- Select:选择器 -->
        <Select
          v-model="formData[item.name]"
          v-else-if="item.type === 'select'"
          v-bind="item.props"
        >
          <Option
            :label="choice.text"
            :value="choice.value"
            v-for="(choice, index) in item.choices"
            :key="index"
            :disabled="choice.disabled !== undefined ? choice.disabled : false"
          ></Option>
        </Select>

        <!-- 穿梭框 -->
        <Transfer
          :data="item.choices"
          :target-keys="formData[item.name]"
          v-else-if="item.type === 'transfer'"
          v-bind="item.props"
          @on-change="
            (value, direction) => {
              handleTransferOnChange(value, direction, item.name)
            }
          "
        >
        </Transfer>

        <!-- 滑块 -->
        <Slider
          v-model="formData[item.name]"
          v-else-if="item.type === 'slider'"
          v-bind="item.props"
        >
        </Slider>
        <span v-else-if="!item.hiddle">
          {{ item }}
        </span>
        <!-- 内联 -->

        <!-- 兄弟元素 -->
        <div
          v-if="Array.isArray(item.sibling) && item.sibling.length > 0"
          class="siblings"
        >
          <span v-for="(item2, index2) in item.sibling" :key="index2">
            <div class="label-text" v-if="item2.type === 'text'">
              {{ item2.label }}
            </div>
            <!-- Input类型的 -->
            <Input
              v-model="formData[item.name]"
              v-if="item2.type === 'input'"
              v-bind="item2.props"
            ></Input>

            <!-- Input Number -->
            <InputNumber
              v-model="formData[item2.name]"
              v-else-if="item2.type === 'number'"
              v-bind="item2.props"
            ></InputNumber>

            <!-- 选择Switch -->
            <ISwitch
              v-model="formData[item2.name]"
              v-else-if="item2.type === 'switch'"
              v-bind="item2.props"
            >
              <span slot="open">
                {{ item2.openLabel ? item2.openLabel : '开' }}</span
              >
              <span slot="close">
                {{ item2.closeLabel ? item2.closeLabel : '关' }}</span
              >
            </ISwitch>

            <!-- Select:选择器 -->
            <Select
              v-model="formData[item2.name]"
              v-else-if="item2.type === 'select'"
              v-bind="item2.props"
            >
              <Option
                :label="choice.text"
                :value="choice.value"
                v-for="(choice, index) in item2.choices"
                :key="index"
                :disabled="
                  choice.disabled !== undefined ? choice.disabled : false
                "
              ></Option>
            </Select>

            <el-button v-else-if="item2.type === 'button'" v-bind="item2.props"
              >{{ item2.label }}
            </el-button>
          </span>
        </div>
        <span class="tip-text" v-if="item.tipText">{{ item.tipText }}</span>
      </slot>
    </FormItem>

    <!-- 底部按钮 -->
    <slot name="footer" :onSubmit="onSubmit" :title="title">
      <div class="buttons">
        <Button
          type="primary"
          @click.stop.prevent="onSubmit"
          style="width: 100%"
        >
          {{ title }}
        </Button>
      </div>
    </slot>

    <!-- 测试 -->
    <!-- <div>
      <Divider></Divider>
      {{ data }}
      <Divider></Divider>
      {{ formData }}
    </div> -->
  </Form>
</template>

<script>
/**
 * 注意事项：传递data的时候，如果fields中有列表值的，一定记得传递
 */
export default {
  name: 'BaseForm',
  props: {
    name: String, // 表格的名字
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
    title: {
      type: String,
      default: () => '提交',
    },
    props: Object, // 表格的其它属性
    handleSubmit: Function, // 表单提交函数
  },
  data() {
    // 上级通过provide提供数据，当前组件通过inject获取数据
    const formData = {}
    return { formData }
  },
  methods: {
    handleTransferOnChange: function (value, direction, fieldName) {
      // 穿梭框数据变更时的操作
      //   console.log('handleTransferOnChange:', value, direction, fieldName)
      var newValue = this.formData[fieldName]
      //   console.log('oldValue', newValue)
      if (!Array.isArray(newValue)) {
        newValue = []
      }
      if (direction === 'right') {
        newValue = newValue.concat(value)
      } else {
        // 向左，那么value就是新的值
        newValue = newValue.filter((item) => value.indexOf(item) >= 0)
      }
      //   console.log('newValue', newValue)

      this.formData[fieldName] = newValue
    },
    onSubmit() {
      // 提交函数: 注意上一级处理数据
      // console.log('form subbmit', this.formData)
      this.$refs.formRef.validate((valid) => {
        if (valid) {
          //   开始提交表单
          if (this.handleSubmit && typeof this.handleSubmit === 'function') {
            this.handleSubmit(this.formData)
          } else {
            console.log('formData:', this.formData)
          }
        } else {
          this.$Message.warning('请填写必要的信息!')
        }
      })
    },
  },
  watch: {
    data: {
      // 监控传递的Data
      handler: function (newValue) {
        // console.log(newValue)
        if (newValue !== this.formData && typeof newValue === 'object') {
          this.formData = newValue
        }
      },
      immediate: true,
    },
  },
}
</script>