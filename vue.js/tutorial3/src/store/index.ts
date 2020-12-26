import { createStore } from 'vuex'

export default createStore({
  state: {
    // 当前登录系统的用户
    currentUser: {},
    // 访问示例：
    // 示例1：this.$store.state.currentUser
    // 示例2：import { mapState } from 'vuex;
    //       ...mapState(['currentUser'])

    // 顶部高亮显示的url
    headerSlug: '/'
  },
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
    }
  },
  actions: {
    // 异步操作，触发方式：
    // this.$store.dispatch('updateHeaderSlugAsync', '/tutorial')
    updateHeaderSlugAsync(context, slug) {
      setTimeout(() => {
        context.commit('updateHeaderSlug', slug)
      }, 2000)
    }
  },
  modules: {}
})
