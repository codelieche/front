<template>
  <div class="todos full">
    <div class="title">
      <h3>Todos App</h3>
    </div>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'TodosIndex',
}
</script>

<style lang="less" scoped>
.todos {
  margin: 10px auto;
  width: 60%;
  max-width: 650px;

  .title {
      border-bottom: 1px solid #dcdfe6;
      margin-bottom: 10px;
  }
}
</style>