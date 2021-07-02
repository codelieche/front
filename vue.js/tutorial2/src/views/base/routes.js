// Vue 图标相关相关的路由

var routes = [
  {
    path: '',
    // name: 'ChartHome',
    component: () => import('./home.vue')
  },
]

var subComponents = [
  // Input
  'input/001',
  'input/002',

  // CheckBox
  'checkbox/001',
  'checkbox/002',
  'checkbox/003',

  // Table
  'table/001',
  'table/002',

  {
    path: 'custom/shape',
    filename: 'custom/shape/index'
  },
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
