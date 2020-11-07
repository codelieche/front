// Vue 图形相关相关的路由

// 引入子路由
import antvG6Routes from './antv-g6/routes'

var routes = [
  {
    path: '',
    // name: 'ChartHome',
    component: () => import('./home.vue')
  },
  {
    path: 'antv/g6/',
    // name: "AntvG6Index",
    component: () => import("./antv-g6/index.vue"),
    children: antvG6Routes
  },
  
]

export default routes
