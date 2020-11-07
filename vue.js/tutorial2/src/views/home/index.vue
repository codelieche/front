<template>
  <!-- 采用基础布局 -->
  <base-layout v-bind="layoutDisplay">
    <template v-slot:header>
      <Header001></Header001>
      <!-- <Header001></Header001> -->
    </template>

    <!-- 左侧内容 -->
    <template v-slot:left-sider>
        <LeftSider001></LeftSider001>
    </template>

    <!-- 主体内容 -->
    <template v-slot:right>
      <!-- <keep-alive> -->
      <div class="content">
        <!-- 路由各个区域重点编写的代码 -->
        <router-view></router-view>
        <!-- 路由各个区域重点编写的代码 -->
      </div>
      <!-- </keep-alive> -->
    </template>

    <!-- 底部内容 -->
    <template v-slot:footer>
      <Footer001></Footer001>
    </template>
  </base-layout>
</template>


<script>
import BaseLayout from '@/components/layout/layout.vue'
import Header001 from '@/components/layout/header/001.vue'
import LeftSider001 from '@/components/layout/leftSider/001.vue'
import Footer001 from '@/components/layout/footer/001.vue'

export default {
  name: 'HomeIndex',
  components: {
    BaseLayout,
    Header001,
    LeftSider001,
    Footer001,
  },
  props: {
    layoutDisplay: {
      type: Object,
      default() {
        return {
          showHeader: true,
          showLeft: false,
          showMain: true,
          showRight: true,
          showFooter: false,
        }
      },
    },
  },
}
</script>
<style lang="less">
body {
  height: 100vh;
}
</style>