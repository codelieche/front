<template>
  <Resizeable
    :minWidth="collapsed ? 65 : 156"
    :maxWidth="400"
    :disabled="collapsed"
    :defaultWidth="defaultWidth"
    :afterSizeChange="afterSizeChange"
  >
    <div class="left-sider" :class="{ collapsed: collapsed }" key="left-sider">
      <div class="header" @click="handleCollapseedToogle">
        <div class="collapsed-toogle">
          <span
            :class="collapsed ? 'el-icon-s-unfold' : 'el-icon-s-fold'"
          ></span>
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
  </Resizeable>
</template>

<script>
import navData from '../nav/NavData.js'
import LeftNavItem from '../nav/leftNav'
import Resizeable from '@/components/base/resizable.vue'

export default {
  name: 'LeftSider001',
  props: {
    items: {
      type: Array,
      default() {
        return navData
      },
    },
  },
  components: {
    LeftNavItem,
    Resizeable,
  },

  // 数据
  data() {
    // 从localStorage中获取宽度
    let defaultWidth = 200
    const widthValue = localStorage.getItem('leftSiderWidth')
    if (widthValue) {
      try {
        const result = parseInt(widthValue)
        // console.log(widthValue, isNaN(widthValue), typeof widthValue, result);
        if (result) {
          defaultWidth = result >= 156 && result <= 460 ? result : 240
        } else {
          defaultWidth = 240
        }
      } catch (error) {
        console.log('获取宽度出错：', error)
      }
    }

    return {
      // items: navData,
      collapsed: false,
      defaultWidth,
    }
  },
  methods: {
    handleCollapseedToogle() {
      this.collapsed = !this.collapsed
    },
    // 尺寸变更后修改
    afterSizeChange: function (width) {
      this.defaultWidth = width
      // console.log('afterSizeChange2', width, this)
      localStorage.setItem('leftSiderWidth', width.toString())
    },
  },
}
</script>

<style lang="less" scoped>
// 导航的背景色
@left-sider-backgroud: #333744;
@left-sider-collapsed-toogle-background: #4a5064;

.left-sider {
  overflow: auto;
  // width: 200px;
  &.collapsed {
    width: 65px;
  }
  height: 100%;
  max-height: 100%;
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
      text-align: center;
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
    // 当导航超过高度的时候，这里滑动
    overflow: hidden auto;
  }
}

// 默认的滑块样式
::-webkit-scrollbar {
  // width: 8px;
  // height: 8px;
  width: 0px;
  height: 0px;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
  // background: @left-sider-collapsed-toogle-background;
  background: rgba(255, 255, 255, 0.1);
  // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.1);
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  // -webkit-box-shadow: inset 0 0 6px rgba(0,0,0,0.8);
}
</style>