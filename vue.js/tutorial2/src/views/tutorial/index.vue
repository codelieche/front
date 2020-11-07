
<template>
  <!-- 采用基础布局 -->
  <base-layout v-bind="layoutDisplay">
    <template v-slot:header>
      <Header001 v-on:listenToChildEvent="listenToChildEvent"></Header001>
      <!-- <Header001></Header001> -->
    </template>

    <!-- 左侧内容 -->
    <template v-slot:left-sider>
      <div class="left-sider" style="width: 200px">index left sider</div>
    </template>

     <!-- 主体内容 -->
    <template v-slot:right>
      <!-- <keep-alive> -->
      <div class="content">
        <router-view />
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
import Footer001 from '@/components/layout/footer/001.vue'

export default {
  name: 'TutorialIndex',
  components: {
    BaseLayout,
    Header001,
    Footer001,
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
}
</script>