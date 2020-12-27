<template>
  <div class="full">
    <div class="header">
      <div class="title">hooks: 鼠标点击显示位置</div>
    </div>
    <div class="content">
      <div class="center">
        当前鼠标的位置：x: {{ position.x }} ==> y: {{ position.y }}
      </div>
    </div>
  </div>
</template>
<script lang="ts">
import { defineComponent } from 'vue'

import useMousePosition from '@/views/base/hooks/useMousePosition'

export default defineComponent({
  name: 'MousePoint',
  setup() {
    const { position } = useMousePosition()

    return {
      position,
    }
  },
})
</script>
