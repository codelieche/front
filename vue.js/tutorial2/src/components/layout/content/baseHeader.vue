<template>
  <div class="header">
    <div class="title">
      <!-- 返回按钮 -->
      <div class="back" @click="handleRouterBack" v-if="showBack">
        <Icon type="ivu-icon ivu-icon-md-arrow-round-back" />
      </div>
      <!-- 标题 -->
      <slot name="title">
        <h2 v-if="title">{{ title }}</h2>
        <!-- 分隔符：有Tabs才显示垂直的分割线 -->
      </slot>
      <Divider
        type="vertical"
        v-if="Array.isArray(tabs) && tabs.length > 0"
      ></Divider>
    </div>
    <!-- Tab选项 -->
    <Tabs
      class="tabs"
      v-model="activeTab"
      name="content-header-tabs"
      @on-click="handleTabClick"
    >
      <!-- 兼容是传字符/对象的{label: '基本信息', name: 'base'} -->
      <TabPane
        v-for="(item, index) in tabs"
        :label="typeof item === 'object' ? item.label : item"
        :name="typeof item === 'object' ? item.name : item"
        :disabled="typeof item === 'object' ? item.disabled : false"
        :key="index"
      >
      </TabPane>
    </Tabs>

    <!-- 右侧的按钮 -->
    <div class="tools">
      <slot name="tools"> </slot>
    </div>
  </div>
</template>

<script>
import Icon from '@/components/base/icon/'

export default {
  name: 'BaseContentHeader',
  components: {
    Icon,
  },
  props: {
    title: {
      // 标题内容
      type: String,
      default: () => '',
    },
    showBack: {
      // 是否显示返回按钮
      type: Boolean,
      default: () => false,
    },
    tabs: {
      // 一般是详情页中的多个TabPan列表
      type: Array,
      default: () => [],
    },
    defaultTab: {
      // 默认选择的Tab Key
      type: String,
      default: () => '',
    },
  },
  data() {
    // 当前选中的Tab Key
    return {
      activeTab: '',
    }
  },
  methods: {
    handleRouterBack: function () {
      this.$router.back(-1)
    },
    handleTabClick: function (value) {
      //   console.log(value)
      // 触发onTabChange事件
      this.$emit('onTabChange', value)
    },
  },
  watch: {
    defaultTab: {
      handler: function (newValue) {
        this.activeTab = newValue
        this.handleTabClick(newValue)
      },
      immediate: true,
    },
  },
}
</script>
