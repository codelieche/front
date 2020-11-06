// Vue学习基础组件相关的路由

// 引入子路由
import slotRoutes from "./slot/routes.js"

var routes = [
  {
    path: '',
    // name: 'TutorialHome',
    component: () => import('./home.vue')
  },
  {
    path: 'slot',
    // name: "SlotIndex",
    component: () => import("./slot/index.vue"),
    children: slotRoutes
  }
]

export default routes
