// 设置个开关，模块是否使用Mock拦截，模拟数据
let toogle = true
// toogle = false

// 文章作者
const articleAuth = {
  'id|+1': 1,
  username: '@name',
  nick_name: '@cname',
  email: '@email'
}

// 文章详情数据
const articleDetail = {
  'id|+1': 1,
  title: '@ctitle(10, 20)',
  user: '@cname',
  auth: articleAuth,
  is_active: '@boolean',
  time_added: '@datetime',
  time_updated: '@datetime',
  cover: '@image(400x100)',
  description: '@title(10,30)'
}

// 文章列表数据
const articleListResponse = {
  count: 666,
  'results|10': [articleDetail]
}

let datasource = [
  // 文章列表
  {
    path: '/api/v1/docs/article/list',
    method: 'get',
    data: articleListResponse,
    toogle: true
  },
  // 详情数据
  {
    path: '/api/v1/docs/article/\\d+',
    method: 'get',
    data: articleDetail,
    toogle: true
  }
]

if (!toogle) {
  datasource = []
}

export default datasource
