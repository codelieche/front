// 判断是否登录
// GET: /api/v1/account/login

// 设置个开关，模块是否使用Mock拦截，模拟数据
let toogle = true
// toogle = false

const userLoginResponse = {
  'id|+1': 1,
  username: '@first@last',
  nick_name: '@cname',
  is_superuser: '@boolean',
  is_active: '@boolean',
  guid: '@guid'
}

const userLoginResponse2 = {
  'id|+1': 1,
  username: '@first@last',
  nick_name: '@cname',
  is_active: '@boolean',
  status: '@boolean',
  message: '登录成功'
}

// 用户列表数据
const userListResponse = {
  count: 1000,
  'results|10': [
    {
      'id|+1': 1,
      username: '@first@last',
      nick_name: '@cname',
      is_superuser: '@boolean',
      is_active: '@boolean',
      phone: '@phone',
      email: '@email',
      city: '@city'
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
    path: '/api/v1/account/user/',
    method: 'get',
    data: userListResponse,
    toogle: true
  }
]

if (!toogle) {
  datasource = []
}

export default datasource
