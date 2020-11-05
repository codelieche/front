var routers = [
  // 前缀：/user/info/
  {
    path: '',
    name: 'UserInfoHome',
    component: () => import('@/views/user/info/home.vue')
  },
  {
    path: '001',
    name: 'UserInfo001',
    component: () => import('@/views/user/info/001.vue')
  }
]

export default routers
