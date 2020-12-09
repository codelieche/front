<template>
    <div class="full">
       
        <!-- 列表 -->
        <ul>
            <li v-for="item in todoItems" :key="item.id">
                {{item.id}} -- {{item.title}}
            </li>
        </ul>
    </div>
</template>
<script>
import { mapState } from 'vuex'
export default {
    name: "TodosList",
    mounted(){
        window.state = this.$store.state
        console.log(this.$store.state.todoItems, this.$store.state.todoNextID)
        if(this.$store.state.todoNextID < 2){
            this.$store.commit('addOrUpdateTodoItem', "测试用例1")
            this.$store.commit('addOrUpdateTodoItem', "测试用例2")
            this.$store.commit('addOrUpdateTodoItem', "测试用例3")
        }
    },
    computed: {
        ...mapState(['todoItems']),
    }
}
</script>