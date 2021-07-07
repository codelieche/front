<template>
  <!-- <div class="base-content"> -->
  <Card shadow :class="['base-content', { fixed: fixHeader }]">
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
        <slot name="tools" :activeTab="activeTab"></slot>
      </template>
      <!-- </div> -->
    </BaseContentHeader>

    <!-- 主体内容区域 -->
    <div class="content">
      <!-- 显示消息 -->
      <!-- <Alert v-if="message" :type="messageType" :closable="true" show-icon>
        {{ message }}
      </Alert> -->

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
      type: Boolean,
      default: () => true,
    }, // 是否显示头部
    title: {
      // 标题内容
      type: String,
      default: () => '',
    },
    fixHeader: {
      type: Boolean,
      default: () => false,
    }, // 固定头部
    showBack: {
      // 是否显示返回按钮
      type: Boolean,
      default: () => false,
    },
    // message: {
    //   // 消息内容，当消息为空的时候，不显示
    //   type: String,
    //   default: () => '',
    // },
    // messageType: {
    //   type: String,
    //   default: () => 'success',
    // },
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
  data() {
    return {
      activeTab: '',
      // currentMessage: ''
    }
  },
  methods: {
    handleTabChange: function (value) {
      this.activeTab = value
    },
    // onAlertClose: function(){
    //   this.currentMessage = ''
    // }
  },
  watch: {
    // message: {
    //   handler: function(newValue){
    //     this.currentMessage = newValue
    //   },
    //   immediate: true,
    // }
  },
}
</script>