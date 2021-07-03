
// 设置个开关，模块是否使用Mock拦截，模拟数据
let toogle = true
// toogle = false

// 文章列表数据
const articleListResponse = {
  count: 666,
  'results|10': [
    {
      'id|1-1000': 10,
      title: '@ctitle(10, 20)',
      user: '@cname',
      is_active: '@boolean',
      time_added: '@datetime',
      time_updated: '@datetime',
      cover: '@image(400x100)',
      description: '@title(10,30)'
    }
  ]
}

let datasource = [
  // 文章列表
  {
    path: '/api/v1/docs/article/list',
    method: 'get',
    data: articleListResponse,
    toogle: true
  }
]

if (!toogle) {
  datasource = []
}

export default datasource
