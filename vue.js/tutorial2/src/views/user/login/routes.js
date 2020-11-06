var routers = [
  // 前缀：/user/login/
  {
    path: '',
    name: 'UserLoginIndex',
    component: () => import('./home.vue')
  },
  {
    path: '001',
    name: 'UserLogin001',
    component: () => import('./001.vue')
  }
]

export default routers
