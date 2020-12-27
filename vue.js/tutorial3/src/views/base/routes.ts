// Vue 图标相关相关的路由

const routes = [
  {
    path: '',
    // name: 'ChartHome',
    component: () => import('./home.vue')
  }
]

const subComponents = [
  // Input
  'input/001',
  'input/002',

  // CheckBox
  'checkbox/001',
  'checkbox/002',
  'checkbox/003',

  // hooks
  // 'hooks/mousePosition',

  {
    path: 'hooks/mousePosition',
    filename: 'hooks/mousePosition'
  }
]

subComponents.forEach(item => {
  if (typeof item === 'object') {
    routes.push({
      path: item.path,
      component: () => import(`./${item.filename}.vue`)
    })
  } else {
    routes.push({
      path: item,
      component: () => import(`./${item}.vue`)
    })
  }
})

export default routes
