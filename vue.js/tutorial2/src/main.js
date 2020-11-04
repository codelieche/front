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
  store,
  render: h => h(App)
}).$mount('#app')
