var data = {
  nodes: [
    {
      data: {
        id: 'istio-gateway',
        type: 'service',
        label: 'istio-gateway'
      }
    },
    {
      data: {
        id: 'istio-kiali',
        type: 'service',
        label: 'istio-kiali'
      }
    },
    {
      data: {
        id: 'prometheus',
        type: 'service',
        label: 'prometheus'
      }
    },
    {
      data: {
        id: 'grafana',
        type: 'service',
        label: 'grafana'
      }
    },
    {
      data: {
        id: 'mysql',
        type: 'pod',
        label: 'grafana'
      }
    }
  ],
  edges: [
    {
      data: {
        id: 'istio-gateway--devops-front',
        source: 'istio-gateway',
        target: 'devops-front',
        label: '10ms'
      }
    },
    {
      data: {
        id: 'grafana--prometheus',
        source: 'grafana',
        target: 'prometheus',
        label: '12ms'
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
  front: 'account cmdb cloud operation database',
  account: 'logs message',
  cmdb: 'database logs monitor',
  cloud: 'monitor message',
  operation: 'cmdb cloud database logs',
  database: 'logs monitor',
  project: 'database logs',
  workflow: 'logs',
  logs: 'message',
  monitor: 'cmdb cloud database',
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
          target: `devops-${item}`,
          label: '15ms'
        }
      })
    }
  })
}
export default data
