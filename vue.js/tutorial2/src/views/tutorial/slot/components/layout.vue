<template>
  <div class="container">
    <!-- 头部区域开始 -->
    <slot name="header">
      <!-- <div class="header">
        <h1>头部内容</h1>
      </div> -->
    </slot>
    <!-- 头部区域结束 -->

    <!-- 页面主体内容 -->
    <slot name="main">
      <div class="main">
        <slot name="left-sider">
            <!-- 左侧内容 -->
        </slot>
        <slot name="right">
          <router-view></router-view>
        </slot>
      </div>
    </slot>
    <!-- 页面主体内容结束 -->

    <!-- 底部内容 -->
    <slot name="footer">
      <div class="footer">
        <div>底部的内容</div>
      </div>
    </slot>
    <!-- 底部内容结束 -->
  </div>
</template>

<script>
export default {
  name: 'BaseLayout',
}
</script>

<style lang="less" scoped>
.container {
  width: 100%;
  height: 100%;
  background-color: #f9f9f9;
  display: flex;
  flex-direction: column;

  //   .header {
  //     color: #f9f9f9;
  //   }

  .main {
    flex: 1;
    background: #fff;
    display: flex;

    .left-sider {
        width: 200px;
        height: 100%;
        background-color: #eee;
    }
    .right {
        flex: 1;
        background-color: #fff;
    };
  }

  //   .footer {
  //     background-color: #f9f9f9;
  //   }
}
</style>