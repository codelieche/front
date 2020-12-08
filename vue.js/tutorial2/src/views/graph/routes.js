// Vue 图标相关相关的路由

// 引入子路由
import cytoscapeRoutes from './cytoscape/routes'

var routes = [
  {
    path: '',
    // name: 'ChartHome',
    component: () => import('./home.vue')
  },
  {
    path: 'cytoscape/',
    // name: "CytoscapeIndex",
    component: () => import("./cytoscape/index.vue"),
    children: cytoscapeRoutes
  },
  
]

export default routes
