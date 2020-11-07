// import userLoginRoutes from './login/routes.js'
import userInfoRoutes from './info/routes.js'
import useGroupRoutes from './group/routes.js'
import useListRoutes from './list/routes.js'
import useMessageRoutes from './message/routes.js'
import useMenuRoutes from './menu/routes.js'
var routes = [
  // 前缀：/user/
  {
    path: '',
    // redirect: "/user/login"
    name: 'UserIndex',
    component: () => import('./index/home.vue')
  },
  // 登录相关的页面
  // {
  //   path: 'login',
  //   // name: 'UserLogin',
  //   component: () => import('@/views/user/login/index.vue'),
  //   children: userLoginRoutes
  // },

  // 用户信息页面
  {
    path: 'info',
    // name: 'UserInfoIndex',
    component: () => import('@/views/user/info/index.vue'),
    children: userInfoRoutes // 便于管理，子路由单独放一个文件
  },
  {
    path: 'group',
    component: () => import('@/views/user/group/index.vue'),
    children: useGroupRoutes // 便于管理，子路由单独放一个文件
  },
  {
    path: 'list',
    component: () => import('@/views/user/list/index.vue'),
    children: useListRoutes // 便于管理，子路由单独放一个文件
  },
  {
    path: 'message',
    component: () => import('@/views/user/message/index.vue'),
    children: useMessageRoutes // 便于管理，子路由单独放一个文件
  },
  {
    path: 'menu',
    component: () => import('@/views/user/menu/index.vue'),
    children: useMenuRoutes // 便于管理，子路由单独放一个文件
  }
]

export default routes
