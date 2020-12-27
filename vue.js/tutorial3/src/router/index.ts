import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
// import Home from '../views/home/index.vue'

// 引入子路曰
import baseRoutes from '@/views/base/routes'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    // name: 'Home',
    component: () => import('@/views/home/index.vue'),
    children: [
      {
        path: '',
        name: 'HomePage',
        component: () => import('@/views/home/home.vue')
      }
    ]
  },
  {
    path: '/base',
    // name: 'BaseIndex',
    component: () => import('@/views/base/index.vue'),
    children: baseRoutes
  }
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  // }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
