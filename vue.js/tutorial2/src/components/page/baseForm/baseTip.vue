<template>
  <component :is="type" v-bind="props ? props : {}" v-if="type">
    <slot name="text" v-if="typeof children === 'string'">
      {{ children }}
    </slot>
    <BaseTip
      v-if="typeof children === 'object' && children.type"
      v-bind="children"
    ></BaseTip>
    <slot name="children" v-else-if="Array.isArray(children)">
      <BaseTip
        v-for="(item, index) in children"
        :key="index"
        :type="item.type"
        :props="item.props"
        :children="item.children"
      ></BaseTip>
    </slot>
    <slot></slot>
  </component>
</template>
<script>
export default {
  name: 'BaseTip',
  props: {
    type: {
      // 类型：span、div、p、等
      type: String,
      default: () => 'span',
    },
    props: {
      type: Object,
      default: () => {},
    },
    children: {
      type: [Array, String, Object],
      default: () => [],
    },
  },
}
</script>