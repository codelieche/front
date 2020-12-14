var elements = {
  nodes: [],
  edges: []
}

var generateNodes = count => {
  for (var i = 0; i < count; i++) {
    elements.nodes.push({
      data: {
        description: 'DevOps System',
        label: 'devops-' + i,
        color: '#2196f3',
        meta: {
          namespace: 'default'
        },
        id: 'devops-' + i,
        type: count > 200 ? 'circle' : 'custom-pod'
        //   type: 'circle',
      }
    })
  }
}
var generateEdges = count => {
  for (var i = 0; i < count * 1; i++) {
    var s = Math.floor(Math.random() * count)
    var t = Math.floor(Math.random() * count)
    if (s != t) {
      elements.edges.push({
        data: {
          id: `devops-${s}-devops-${t}`,
          source: 'devops-' + s,
          target: 'devops-' + t,
          label: '50ms',
          type: 'cubic-horizontal',
          style: {
            endArrow: true
          }
        }
      })
    }
  }
}
var count = 10
generateNodes(count)
generateEdges(count)

export default elements
