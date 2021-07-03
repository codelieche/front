<template>
  <div class="full grey">
    <BaseContent
      title="内容布局示例001"
      :showBack="false"
      :tabs="tabs"
      :defaultTab="defaultTab"
    >
      <!-- 右侧的按钮 -->
      <div slot="tools">
        <Button>详情</Button>
        <Button type="primary">添加</Button>
      </div>

      <!-- 默认 -->
      <template #default="{ activeTab }">
        <BaseTable001 />
        <div>
          {{ activeTab }}
        </div>
      </template>
    </BaseContent>
  </div>
</template>

<script>
import BaseContent from '@/components/layout/content/base.vue'

import BaseTable001 from '../table/001.vue'

export default {
  name: 'BaseContentDemo001',
  components: {
    BaseContent,
    BaseTable001,
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