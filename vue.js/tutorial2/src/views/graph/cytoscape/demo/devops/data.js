var data = {
  nodes: [
    {
      data: {
        id: 'istio-gateway',
        type: 'service',
        label: 'istio-gateway'
      }
    }
  ],
  edges: [
    {
      data: {
        id: 'istio-gateway--devops-front',
        source: 'istio-gateway',
        target: 'devops-front'
      }
    }
  ]
}

// 列表的方式加入其它几个服务
var apps = [
  'front',
  'account',
  'cmdb',
  'cloud',
  'operation',
  'database',
  'project',
  'workflow',
  'logs',
  'monitor',
  'message'
]

apps.forEach(item => {
  data.nodes.push({
    data: {
      id: `devops-${item}`,
      type: apps,
      label: `devops-${item}`
    }
  })
})

// 构造边的数据
var edges = {
  front:
    'account cmdb cloud operation database project workflow',
  account:
    'logs monitor message',
  cmdb:
    'account database logs monitor',
  cloud:
    'account cmdb project logs monitor message',
  operation:
    'account cmdb cloud database logs message',
  database:
    'account cloud project logs monitor message',
  project:
    'account cmdb cloud operation database logs',
  workflow:
    'account cmdb cloud project logs message',
  logs:
    'account',
  monitor:
    'cmdb cloud database',
  message: 'account project'
}

for (var source in edges) {
  var targets = edges[source].split(' ')
  targets.forEach(item => {
    if (item.trim() !== '') {
      data.edges.push({
        data: {
          id: `devops-${source}--devops-${item}`,
          source: `devops-${source}`,
          target: `devops-${item}`
        }
      })
    }
  })
}
export default data
