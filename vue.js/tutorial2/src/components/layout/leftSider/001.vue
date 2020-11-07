<template>
  <div class="left-sider" :class="{ collapsed: collapsed }"  key="left-sider">
    <div class="header" @click="handleCollapseedToogle">
      <div class="collapsed-toogle">
          <span :class="collapsed ? 'el-icon-s-unfold' : 'el-icon-s-fold'"></span>
      </div>
    </div>
    <div class="content">
      <LeftNavItem
        v-for="(item, index) in items"
        :item="item"
        :index="index"
        :key="index"
        :collapsed="collapsed"
      ></LeftNavItem>
    </div>
    <!-- <div class="footer"></div> -->
  </div>
</template>

<script>
import navData from '../nav/NavData.js'
import LeftNavItem from '../nav/leftNav'

export default {
  name: 'LeftSider001',
  components: {
    LeftNavItem,
  },

  // 数据
  data() {
    return {
      items: navData,
      collapsed: false,
    }
  },
  methods: {
    handleCollapseedToogle() {
      this.collapsed = !this.collapsed
    },
  },
}
</script>

<style lang="less" scoped>
// 导航的背景色
@left-sider-backgroud: #333744;
@left-sider-collapsed-toogle-background: #4a5064;

.left-sider {
  width: 200px;
  &.collapsed {
    width: 65px;
  }
  height: 100%;
  background: @left-sider-backgroud;
  color: #f8f8f8;
  display: flex;
  flex-direction: column;
  .header {
    // height: 50px;
    min-height: 35px;
    .collapsed-toogle {
      height: 35px;
      background: @left-sider-collapsed-toogle-background;
      line-height: 35px;
      cursor: pointer;
      span {
          font-size: 20px;
          font-weight: normal;
          line-height: 35px;
      }
    }
  }

  // 左侧导航的主体内容
  .content {
    flex: 1;
    .nav-list {
      
    }
  }
}
</style>