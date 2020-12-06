<template>
  <div class="full">
    <el-card>
      <!-- 卡片头部 -->
      <div slot="header" class="header">
        <!-- <template v-slot:header> -->
        <el-input placeholder="请输入内容" v-model="inputValue" clearable>
        </el-input>
        <el-button
          icon="el-icon-plus"
          type="primary"
          @click="handleInputCommit"
        >
          添加
        </el-button>

        <!-- </template> -->
      </div>

      <div class="content">
        <!-- 列表 -->
        <!-- <ul>
          <li v-for="item in todoItems" :key="item.id">
            <div>
                <el-checkbox :checked="item.finished" @change="handleItemFinished(item)">{{ item.title }}</el-checkbox>
            </div>
          </li>
        </ul> -->

        <!-- 表格 -->
        <el-table :data="todoItems" name="todos-list" style="width: 100%">
          <el-table-column prop="id" label="ID" width="50"> 
            <template slot-scope="scope">
              <router-link :to="{path: '/project/todos/detail/' + scope.row.id}">
                {{scope.row.id}}
              </router-link>
            </template>
          </el-table-column>
          <el-table-column prop="title" label="标题"> </el-table-column>
           <el-table-column label="完成" width="100">
            <template slot-scope="scope">
              <div>
                <el-switch :value="scope.row.finished" 
                @change="handleItemFinished(scope.row)">

                </el-switch>
              </div>
            </template>
          </el-table-column>
          <el-table-column label="操作" width="100">
            <template slot-scope="scope">
              <div>
                <el-button type="danger" size="small" @click="handleItemRemove(scope.row.id)">删除</el-button>
              </div>
            </template>
          </el-table-column>
        </el-table>
      </div>
    </el-card>
  </div>
</template>
<script>
import { mapState,  } from 'vuex'
export default {
  name: 'TodosList',
  mounted() {
    window.state = this.$store.state
    // console.log(this.$store.state.todoItems, this.$store.state.todoNextID)
    // if (this.$store.state.todoNextID <= 1) {
    //   this.$store.commit('addOrUpdateTodoItem', '测试用例1')
    //   this.$store.commit('addOrUpdateTodoItem', '测试用例2')
    //   this.$store.commit('addOrUpdateTodoItem', '测试用例3')
    // }
  },
  data() {
    return {
      inputValue: '',
    }
  },
  computed: {
    ...mapState(['todoItems']),
    // ...mapGetters(['todoItemsList']),
    // todoItemsList: function () {
    //   var items = []
    //   for (var key in this.$store.state.todoItems) {
    //     items.push(this.$store.state.todoItems[key])
    //   }
    //   return items
    // },
  },
  methods: {
    handleInputCommit() {
      // console.log(this.inputValue)
      if (this.inputValue === '') {
        this.$message({ message: '请输入Todo内容', type: 'warning' })
        return
      }
      // 添加
      this.$store.commit('addOrUpdateTodoItem', this.inputValue)
      this.inputValue = ''
    },
    handleItemFinished(item) {
      // console.log(item)
      item.finished = !item.finished
      // this.todoItems[item.id] = item
      this.$store.commit('addOrUpdateTodoItem', item)
    },
    handleItemRemove(id){
      // console.log("handleItemRemove", id)
      this.$store.commit('removeTodoItem', id)
    }
  },
}
</script>

<style lang="less" scoped>
.full {
  .header {
    display: flex;
    flex-direction: row;
    // .el-input {
    //     display: inline-block;
    // }
    // .el-button {
    //     display: inline-block;
    // }
  }

  .el-card__body {
    padding: 0px 5px;
  }

  ul {
    text-align: left;
    padding-left: 10px;
    margin: 0;
    list-style: none;
    li {
      padding: 10px;
      border-bottom: 1px solid #dcdfe6;
    }
  }
}
</style>