import Vue from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
// 插件
import "./plugins/element.js"
import "./plugins/fetchApi.js"


new Vue({
  router,
  // 将共享数据对象，挂载到Vue实例中，这样所有的组件，就可以直接从store中获取全局的数据了
  store,
  render: h => h(App)
}).$mount('#app')
