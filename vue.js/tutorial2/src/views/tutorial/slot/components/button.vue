<template>
  <div @click="onClick" class="btn" :class="type">
    <slot>按钮</slot>
  </div>
</template>

<script>
export default {
  name: 'SlotButton',
  props: {
    onClick: Function,
    type: {
      type: String,
      default: 'default',
    },
  },
}
</script>

<style lang="less" scoped>
.btn {
  display: inline-block;
  padding: 4px 10px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 3px;
  margin: 0 5px;
  &.default {
      background-color: #eee;
  }
  &.primary{
      background-color: #409EFF;
      color: #fff;
  }
  &.error{
      background-color: #ec3a3a;
      color: #fff;
  }
}
</style>