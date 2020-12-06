var routes = [
  {
    path: '',
    name: 'TodosHome',
    // component: () => import("./home.vue"),
    // redirect: "/project/todos/list/"
    redirect: 'list'
  }
  // {
  //     path: "001",
  //     name: "Slot001Page",
  //     component: () => import("./001.vue")
  // },
]

var subComponents = [
  'add',
  {
    path: 'list'
  },
  {
    path: 'detail/:id',
    filepath: 'detail'
  }
]

subComponents.forEach(item => {
  var filename = ''
  var path = ''
  if (typeof(item)=='string') {
    filename = item
    path = item
  } else {
    path = item.path
    if (item.filepath) {
      filename = item.filepath
    } else {
      filename = item.path
    }
  }

  // console.log(filename, path)

  routes.push({
    path: path,
    component: () => import(`./${filename}.vue`)
  })
})

export default routes
