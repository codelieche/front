import Vue from 'vue'
import VueRouter from 'vue-router'

// 引入子路曰
import userRoutes from '@/views/user/routes.js'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'HomeIndex',
    component: () => import('@/views/home/index.vue')
  },

  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () =>
  //     import(/* webpackChunkName: "about" */ '../views/About.vue')
  // },
  {
    path: '/user/',
    name: 'UserPages',
    component: () => import('@/views/user/index/index.vue'),
    children: userRoutes
  },
  
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

// 路由导航访问控制
router.beforeEach((to, from, next) => {
  // console.log(to);
  // console.log(to.path.indexOf("/user/info"))
  if (to.path.indexOf('/user/info') >= 0) {
    // 判断是否登录了系统
    const value = window.sessionStorage.getItem('isLogined')
    // console.log(value);
    if (!value) {
      next('/user/login')
    } else {
      next()
    }
  } else {
    // 直接进行下一步
    next()
  }
})

export default router