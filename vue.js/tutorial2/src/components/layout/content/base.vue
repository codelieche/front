<template>
  <!-- <div class="base-content"> -->
  <Card shadow class="base-content">
    <!-- 头部区域 -->
    <BaseContentHeader
      slot="title"
      v-if="showHeader"
      :title="title"
      :showBack="showBack"
      :tabs="tabs"
      :defaultTab="defaultTab"
      @onTabChange="handleTabChange"
    >
      <!-- 传递了title，就传递进去 -->
      <!-- <div slot="title" v-if="$slots.title"> -->
      <template #title>
        <slot name="title"></slot>
      </template>
      <!-- </div> -->

      <!-- 是否有相关操作 -->
      <!-- <div slot="tools" v-if="$slots.tools"> -->
      <template #tools>
        <slot name="tools"></slot>
      </template>
      <!-- </div> -->
    </BaseContentHeader>

    <!-- 主体内容区域 -->
    <div class="content">
      <slot name="tabContent" :activeTab="activeTab"></slot>

      <slot name="content" :activeTab="activeTab">
          <!-- 内容顶部左侧区域 -->
          <slot name="default" :activeTab="activeTab"></slot>
      </slot>
    </div>

    <!-- 底部区域 -->
  </Card>
  <!-- </div> -->
</template>

<script>
import BaseContentHeader from './baseHeader.vue'
export default {
  name: 'BaseContent',
  components: {
    BaseContentHeader,
  },
  props: {
    showHeader: {
      // 是否显示头部
      type: Boolean,
      default: () => true,
    },
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
  // mounted() {
  //   console.log(this)
  // },
  data(){
    return {
      activeTab: ''
    }
  },
  methods: {
    handleTabChange: function(value) {
      this.activeTab = value
    }
  }
}
</script>