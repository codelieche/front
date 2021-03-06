import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

// 将共享数据对象，挂载到Vue实例中，这样所有的组件，就可以直接从store中获取全局的数据了
// 这里在@src/main.js中挂载了store
export default new Vuex.Store({
  // state提供唯一的公共数据源，所有共享的数据都要统一放到这里存储
  state: {
    // 当前登录系统的用户
    currentUser: {},
    // 访问示例：
    // 示例1：this.$store.state.currentUser
    // 示例2：import { mapState } from 'vuex;
    //       ...mapState(['currentUser'])

    // 顶部高亮显示的url
    headerSlug: '/',

    // 示例项目Todos的数据
    todoItems: [], // 对象的字段有：id, title, content, finished,
    todoNextID: 1
  },

  // Mutation用于变更Store中的数据：
  // 不要用this.$store.state.xxx = xxx的方式修改Store的数据，而是推荐用Mutation
  // 1. 只能通过Mutation变更store数据，不可以直接操作Store的数据
  // 2. 通过这种方式操作数据虽然稍微繁琐一些，但是可以集中监控所有数据的变化
  // 3. 在Mutation中不要使用异步的操作，有异步需求，请用Action
  mutations: {
    // 第1个参数是自身的state，第2个参数就是需要传递的参数
    // 使用示例：this.$store.commit('updateHeaderSlug', '/tutorial')
    // 方式2：import { mapMutations } from 'vuex'
    //       mapMutations(['updateHeaderSlug'])
    updateHeaderSlug(state, slug) {
      // console.log(state, slug)
      if (state.headerSlug !== slug) {
        state.headerSlug = slug
      } else {
        // console.log(state, slug)
      }
    },

    // 示例项目Todos相关的方法
    initTodoItems(state, todoItems) {
      state.todoItems = todoItems

      for(var key in todoItems){
        key = parseInt(key, 10)
        if(key >= state.todoNextID){
          state.todoNextID = key + 1
        }
      }
    },
    // 添加或者更新Todo对象
    addOrUpdateTodoItem(state, obj) {
      // 如果是字符串，就实例化对象
      if (typeof obj === 'string') {
        obj = {
          title: obj,
          content: obj,
          finished: false
        }
      }
      // 判断ID：没有传递ID就使用全局的
      if (!obj.id) {
        obj.id = state.todoNextID
        state.todoNextID += 1
      }

      // 遍历：性能不优，测试项目
      var isUpdate = false
      state.todoItems.forEach((item, index) => {
        if(item.id.toString() === obj.id.toString()){
          state.todoItems[index] = obj
          isUpdate = true
          return
        }
      })

      // 新添加的
      if(!isUpdate){
        state.todoItems.push(obj)
      }

      // state.todoItems[obj.id] = obj

      // 把todoItems保存一下
      localStorage.setItem(
        'todoItems',
        JSON.stringify(state.todoItems)
      )
    },
    // 删除Todo对象
    removeTodoItem(state, id) {
      // delete state.todoItems[id]
      // state.todoItems = {
      //   ...state.todoItems
      // }

       // 遍历：性能不优，测试项目
       state.todoItems.forEach((item) => {
        if(item.id.toString() === id.toString()){
          state.todoItems.pop(item)
          return
        }
      })

      // 把todoItems保存一下
      localStorage.setItem(
        'todoItems',
        JSON.stringify(state.todoItems)
      )
    }
  },

  // Action用于处理异步任务
  // 如果通弄个异步操作变更数据，必须通过Action，而不要使用Mutation，
  // 但是在Action中还是要通过触发Mutation的方式间接变更数据
  actions: {
    // 异步操作，触发方式：
    // this.$store.dispatch('updateHeaderSlugAsync', '/tutorial')
    updateHeaderSlugAsync(context, slug) {
      setTimeout(() => {
        context.commit('updateHeaderSlug', slug)
      }, 2000)
    }
  },
  modules: {},

  // Getter用于对Store中的数据进行加工处理成新的数据
  // 1. Getter可以读取Store中的数据，然后包装一下返回，有点类似于只读的计算属性
  // 2. Store中数据发生变化，Getter的数据也会发生变化
  getters: {
    // 访问方式：this.$store.getters.hello
    // 方式2：import { mapGetters } from 'vuex'
    //       ...mapGetters(['hello'])
    hello(state) {
      return '你好：' + state.currentUser
    },

  }
})
