import userLoginRoutes from './login/routes.js'
import userInfoRoutes from './info/routes.js'

var routes = [
  // 前缀：/user/
  {
    path: '',
    // redirect: "/user/login"
    name: 'UserIndex',
    component: () => import('./index/home.vue')
  },
  // 登录相关的页面
  {
    path: 'login',
    name: 'UserLogin',
    component: () => import('@/views/user/login/index.vue'),
    children: userLoginRoutes
  },

  // 用户信息页面
  {
    path: 'info',
    name: 'UserInfoIndex',
    component: () => import('@/views/user/info/index.vue'),
    children: userInfoRoutes // 便于管理，子路由单独放一个文件
  }
]

export default routes
