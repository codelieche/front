<template>
  <!-- 文本注释 -->
  <div class="item">
    <div class="title" @click="onTitleClick">
      <!-- 判断是不是外链 -->
      <span v-if="item.is_link && item.link">
        <!-- 是a连接 -->
        <a
          :href="item.link"
          :target="item.target === '_blank' ? '_blank' : ''"
          :style="{ paddingLeft: paddingLeftValue }"
        >
          <!-- 左侧显示icon -->
          <span
            class="icon"
            :class="item.icon ? item.icon : 'el-icon-arrow-right'"
          ></span>
          {{ item.title }}
        </a>
      </span>

      <!-- 跳转内部Url的情况 -->
      <router-link
        v-else-if="!!item.slug"
        :to="item.slug"
        :style="{ paddingLeft: paddingLeftValue }"
      >
        <span
          class="icon"
          :class="item.icon ? item.icon : 'el-icon-arrow-right'"
        ></span>
        {{ item.title }}
      </router-link>
    
      <span v-else>
        <!-- 不是a连接 -->
        <span
          class="icon"
          :class="item.icon ? item.icon : 'el-icon-arrow-right'"
          :style="{ paddingLeft: paddingLeftValue }"
        ></span>
        {{ item.title }}
      </span>

      <div class="right" v-if="hasChildren">
        <span
          :class="openChildren ? 'el-icon-caret-bottom' : 'el-icon-caret-left'"
        ></span>
      </div>
    </div>

    <!-- 子元素 -->
    <div class="children" v-if="hasChildren" :class="{ active: openChildren }">
      <NavItem
        v-for="(subItem, subIndex) in item.children"
        :item="subItem"
        :key="subIndex"
      >
      </NavItem>
    </div>
    <!-- 子元素结束 -->
  </div>
</template>

<script>
export default {
  name: 'NavItem',
  props: {
    item: Object, // 导航数据对象
    index: Number, // 序号
    collapsed: Boolean, // 是否是折叠的
  },
  data() {
    return {
      openChildren: false, // 是否打开子菜单
    }
  },
  computed: {
    hasChildren() {
      return Array.isArray(this.item.children) && this.item.children.length > 0
    },
    paddingLeftValue() {
      return `${this.item.level * 10}px`
    },
  },
  methods: {
    onTitleClick() {
      // 取反
      this.openChildren = !this.openChildren
    },
  },
}
</script>

<style lang="less" scoped>
// 当行Item的标题鼠标悬放时候的背景色
@nav-tiem-title-hove-backgroud: rgba(112, 119, 143, 0.16);
@nav-item-active-background: #1890ff;
.item {
  position: relative;
  .title {
    position: relative;
    line-height: 35px;
    text-align: left;
    cursor: pointer;
    font-size: 15px;
    font-weight: 500;
    &:hover {
      background: @nav-tiem-title-hove-backgroud;
    }
    .icon {
      display: inline-block;
      margin-right: 4px;
    }
    .right {
      display: inline-block;
      position: absolute;
      right: 8px;
      span {
        font-size: 14px;
        line-height: 35px;
      }
    }
    a {
      line-height: 35px;
      display: inline-block;
      width: 100%;
      box-sizing: border-box;
      text-decoration: none;
      color: #f8f8f8;
      &.router-link-exact-active {
        background-color: @nav-item-active-background;
      }
    }
  }

  .children {
    display: none;

    &.active {
      display: block;
    }
  }
}
</style>