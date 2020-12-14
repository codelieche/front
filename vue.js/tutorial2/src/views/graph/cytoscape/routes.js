var routes = [
  {
    path: '',
    name: 'GraphHome',
    component: () => import('./home.vue')
  }
  // {
  //     path: "001",
  //     name: "Slot001Page",
  //     component: () => import("./001.vue")
  // },
]

var subComponents = [
  'base/001',
  'base/002',
  'base/003',
  'base/004',
  'base/005',
  'base/006',
  'base/curve-style',

  // 自定义的页面
  'custom/classes',
  'custom/color',
  'custom/event',
  {
    path: 'custom/nodeHtmlLabel',
    filename: 'custom/nodeHtmlLabel/index'
  },

  // 示例
  {
    path: 'demo/devops',
    filename: 'demo/devops/index'
  },
  {
    path: 'demo/bookstore',
    filename: 'demo/bookstore/index'
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
