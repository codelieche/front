var elements = {
  nodes: [],
  edges: []
}

// 节点类型
var nodeTypes = ['service', 'app', 'workload', 'operation', 'serviceEntry']
var edgeTypes = ['error', 'warn', 'success', 'tcp', 'idle', 'mtls']

var generateNodes = count => {
  for (var i = 0; i < count; i++) {
    // 随机NodeType，50%是app
    var index = Math.floor(Math.random() * 10)
    if (index > 4) {
      index = 1
    }
    elements.nodes.push({
      data: {
        description: 'DevOps System',
        label: 'devops-' + i,
        id: 'devops-' + i,
        nodeType: nodeTypes[index]
        //   type: 'circle',
      }
    })
  }
}
var generateEdges = count => {
  for (var i = 0; i < count * 1; i++) {
    // 随机EdgeType，80%是success
    var index = Math.floor(Math.random() * 20)
    if (index > 5) {
      index = 2
    }
    var s = Math.floor(Math.random() * count)
    var t = Math.floor(Math.random() * count)
    if (s != t) {
      elements.edges.push({
        data: {
          id: `devops-${s}-devops-${t}`,
          source: 'devops-' + s,
          target: 'devops-' + t,
          label: '50ms',
          edgeType: edgeTypes[index],
        }
      })
    }
  }
}

function generateElements(count=20) {
  elements = { nodes: [], edges: [] }
  generateNodes(count)
  generateEdges(count)
  return elements
}

export default generateElements
