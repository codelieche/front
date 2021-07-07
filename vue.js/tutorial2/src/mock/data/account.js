// 账号相关的接口
// GET: /api/v1/account/

// 设置个开关，模块是否使用Mock拦截，模拟数据
let toogle = true
// toogle = false

// 用户分组详情数据
const groupDetail = {
  'id|+1': 1,
  name: '@cname',
  description: '@title',
  time_created: '@datetime'
}

const groupList = {
  count: 666,
  'results|10': [groupDetail]
}

let datasource = [
  // 分组详情
  {
    path: '/api/v1/account/group/\\d+/',
    method: 'get',
    data: groupDetail,
    toogle: true
  },
  {
    path: '/api/v1/account/group/',
    method: 'get',
    data: groupList,
    toogle: true
  }
]

if (!toogle) {
  datasource = []
}

export default datasource
