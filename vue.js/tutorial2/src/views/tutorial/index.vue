
<template>
  <!-- 采用基础布局 -->
  <base-layout>
    <template v-slot:header>
      <Header001 v-on:listenToChildEvent="listenToChildEvent"></Header001>
      <!-- <Header001></Header001> -->
    </template>

    <!-- 主体内容 -->
    <template v-slot:right>
      <!-- <keep-alive> -->
          <div class="right">
            <router-view />
          </div>
      <!-- </keep-alive> -->
    </template>

    <!-- 左侧内容 -->
    <template v-slot:left-sider>
        <div class="left-sider">index left sider</div>
    </template>

    <!-- 底部内容 -->
    <template v-slot:footer>
      <Footer001></Footer001>
    </template>
  </base-layout>
</template>

<script>
import BaseLayout from './slot/components/layout.vue'
import Header001 from './slot/components/header/001.vue'
import Footer001 from './slot/components/footer/001.vue'

export default {
  name: 'TutorialIndex',
  components: {
    BaseLayout,
    Header001,
    Footer001,
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