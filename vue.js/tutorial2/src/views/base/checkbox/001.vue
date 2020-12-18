<template>
  <div class="full">
    <div class="header">
      <div class="title">elements CheckBox基本示例</div>
      <div class="description">
        参考文档：<a
          href="https://element.eleme.cn/#/zh-CN/component/checkbox"
          target="_blank"
          >https://element.eleme.cn/#/zh-CN/component/checkbox</a
        >
      </div>
    </div>
    <div class="content">
      <!-- 第1个Checkbox -->
      <el-checkbox v-model="checked01" size="medium" border>选择框</el-checkbox>

      <!-- 分割线 -->
      <el-divider></el-divider>

      <!-- 第2个示例 -->
      <div>
        <el-checkbox-group v-model="languagesChecked">
          <el-checkbox-button
            v-for="item in languages"
            :label="item"
            :key="item"
            >{{ item }}</el-checkbox-button
          >
        </el-checkbox-group>
        <div class="info">当前选中的语言：{{ languagesChecked.join(',') }}</div>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'CheckBoxDemo001',
  data() {
    return {
      // 第1个示例
      checked01: false,
      // 第2个示例
      languages: ['Python', 'Golang', 'JavaScript', 'Scala', 'Dart', 'C'],
      languagesChecked: ['Golang'],
    }
  },
}
</script>
<style lang="less" scoped>
.full {
  .info {
    margin: 5px 0;
    padding: 5px 10px;
    display: inline-block;
    background-color: #eee;
  }
}
</style>