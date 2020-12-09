// Vue 图标相关相关的路由

// 引入子路由
import todosRoutes from './todos/routes'

var routes = [
  {
    path: '',
    // name: 'ChartHome',
    component: () => import('./home.vue')
  },
  {
    path: 'todos/',
    // name: "TodosIndex",
    component: () => import("./todos/index.vue"),
    children: todosRoutes
  },
  
]

export default routes
