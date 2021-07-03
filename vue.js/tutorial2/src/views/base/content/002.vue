<template>
  <div class="full grey">
    <BaseContent
      title="内容布局示例002"
      :showBack="true"
      :tabs="tabs"
      :defaultTab="defaultTab"
    >
      <!-- <template #title>
        <h2>自定义的标题咯</h2>
      </template> -->

      <!-- 右侧的按钮 -->
      <div slot="tools">
        <Button>详情</Button>
        <Button type="primary">添加</Button>
      </div>

      <!-- Tab区域 -->
      <template v-slot:tabContent="{ activeTab: activeTab }">
        <div>
          当前选中的Tab为：{{ activeTab }}
          <div v-if="activeTab === '基本信息'">你好我是基本信息</div>
        </div>
      </template>

      <!-- 默认 -->
      <template #default="{ activeTab }">
        <TopBar title="表单基本使用001" />
        <h1>Good</h1>
        <p style="height: 100px; background: #eee">wode test</p>
        <p style="height: 100px; background: #999">wode test {{ activeTab }}</p>

        <div>good this is default slot content.</div>
      </template>
    </BaseContent>
  </div>
</template>

<script>
import BaseContent from '@/components/layout/content/base.vue'

export default {
  name: 'BaseContentDemo001',
  components: {
    BaseContent,
  },
  data() {
    return {
      tabs: [
        { label: '基本信息', name: 'base' },
        { label: '详细信息', name: 'info' },
        '审计日志',
      ],
      defaultTab: 'info',
    }
  },
}
</script>