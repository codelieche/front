<template>
  <div :class="['info-property', {border: showBorder}]">
    <div class="title" v-if="title">
      <h4>{{ title }}</h4>
    </div>
    <!-- 信息字段:先设置自定义的slot -->
    <div class="info">
      <dl v-for="(item, index) in columns" :key="index">
        <dt :style="{ width: `${leftWidth}px` }">
          {{ item.title }}
        </dt>
        <dd>
          <!-- 有可能是传递了slot的 -->
          <template :name="item.slot" v-if="item.slot">
            <slot :name="item.slot" :data="data"></slot>
          </template>
          <!-- 传递了key的情况 -->
          <span v-else-if="item.key">
            {{ data[item.key] }}
          </span>
        </dd>
      </dl>
    </div>
  </div>
</template>

<script>
export default {
  name: 'BaseInfo',
  props: {
    title: {
      // 信息的标题：比如：基本信息
      type: String,
      default: () => '',
    },
    leftWidth: {
      // 信息左侧的宽度：默认150
      type: Number,
      default: () => 150,
    },
    data: {
      // 需要展示的信息列
      type: Object,
      default: () => {
        return {}
      },
    },
    columns: {
      // 需要展示的列，比如：[{title: '用户名', key:'username'}, {title: '昵称': key: 'nick_name'}]
      // 简单的直接传title和key即可，复杂的需要传递slot
      type: Array,
      default: () => [],
    },
    showBorder: {
      // 是否显示边框
      type: Boolean,
      default: () => false,
    }
  },
}
</script>