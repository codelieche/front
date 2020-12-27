<template>
  <!-- 采用基础布局 -->
  <base-layout v-bind="layoutDisplay">
    <template v-slot:header>
      <Header001 v-on:listenToChildEvent="listenToChildEvent"></Header001>
      <!-- <Header001></Header001> -->
    </template>

    <!-- 左侧内容 -->
    <template v-slot:left-sider>
      <!-- <div class="left-sider" style="width: 200px">index left sider</div> -->
      <LeftSide001 :items="items"></LeftSide001>
    </template>

    <!-- 主体内容 -->
    <template v-slot:right>
      <!-- <keep-alive> -->
      <div class="content">
        <router-view />
      </div>
      <!-- </keep-alive> -->
    </template>
  </base-layout>
</template>

<script>
import { defineComponent } from 'vue'
import BaseLayout from '@/components/layout/layout.vue'
import Header001 from '@/components/layout/header/001.vue'
import LeftSide001 from '@/components/layout/leftSider/001.vue'

import useHeaderSlug from '@/hooks/store/useHeaderSlug'
import navData from './navData'

export default defineComponent({
  name: 'BaseIndex',
  components: {
    BaseLayout,
    Header001,
    LeftSide001,
  },
  props: {
    items: {
      type: Array,
      default() {
        return navData
      },
    },
  },
  setup() {
    //  使用hooks，加载这个页面后，设置顶部的导航选中/base, 组件卸载的时候，重新设置为/
    useHeaderSlug('/base', '/')
    return {
      //   updateHeaderSlug,
    }
  },

  data() {
    return {
      // 采用一个通用的布局，然后传参来显示各个区域
      layoutDisplay: {
        showHeader: true,
        showLeft: true,
        showRight: true,
        showFooter: false,
      },
    }
  },
  methods: {
    onClick() {
      console.log('on click' + new Date())
    },
    listenToChildEvent(data) {
      print(data)
      this.$router.push(data)
    },
  },
})
</script>

<style lang="less">
</style>