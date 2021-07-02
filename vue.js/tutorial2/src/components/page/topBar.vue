<template>
  <div class="top-bar">
    <div class="title">
      <h4>{{ title }}</h4>
    </div>
    <slot name="right">
    </slot>
  </div>
</template>

<script>
export default {
  name: 'TopBar',
  props: {
    title: {
      type: String,
      default: () => '标题',
    },
  }
}
</script>