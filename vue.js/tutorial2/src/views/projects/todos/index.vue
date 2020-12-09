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
  mounted() {
    // 把todoItems保存一下
    var todoItemsStr = localStorage.getItem('todoItems')

    if (todoItemsStr != '') {
      var todoItems = JSON.parse(todoItemsStr)
      if (Array.isArray(todoItems)) {
        this.$store.commit('initTodoItems', todoItems)
      }
    }
  },
  beforeDestroy() {
    // 把todoItems保存一下
    localStorage.setItem(
      'todoItems',
      JSON.stringify(this.$store.state.todoItems)
    )
  },
}
</script>

<style lang="less" scoped>
.todos {
  margin: 10px auto;
  width: 60%;
  max-width: 650px;

  .title {
    //   border-bottom: 1px solid #dcdfe6;
    margin-bottom: 10px;
    text-align: left;
  }
}
</style>