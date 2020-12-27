import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import { useElementPlugins } from './plugins/element'
import './styles/main.less'
import { stateSymbol, createState } from './store/headerSlug'


const app = createApp(App)
useElementPlugins(app)

app.provide(stateSymbol, createState())

app.use(router).mount('#app')
