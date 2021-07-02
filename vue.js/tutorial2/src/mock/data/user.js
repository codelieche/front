// 判断是否登录
// GET: /api/v1/account/login

// 设置个开关，模块是否使用Mock拦截，模拟数据
const toogle = true

const userLoginResponse = {
  id: '@id',
  username: '@first@last',
  nick_name: '@cname',
  is_superuser: '@boolean',
  guid: '@guid'
}

const userLoginResponse2 = {
  id: '@uuid',
  username: '@first@last',
  nick_name: '@cname',
  status: '@boolean',
  message: '登录成功'
}

// 用户列表数据
const userListResponse = {
  count: 1000,
  'results|10': [
    {
      id: '@id',
      username: '@first@last',
      nick_name: '@cname',
      is_superuser: '@boolean',
      email: '@email'
    }
  ]
}

let datasource = [
  // 登录
  {
    path: '/api/v1/account/login',
    method: 'get',
    data: userLoginResponse,
    toogle: true
  },
  {
    path: '/api/v1/account/login',
    method: 'post',
    data: userLoginResponse2,
    toogle: true
  },
  {
    path: '/api/v1/account/user/list',
    method: 'get',
    data: userListResponse,
    toogle: true
  }
]

if (!toogle) {
  datasource = []
}

export default datasource
