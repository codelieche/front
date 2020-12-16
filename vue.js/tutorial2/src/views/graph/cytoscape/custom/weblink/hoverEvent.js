// cy示例事件监听

var handleHoverEvents = cy => {
  // 鼠标进入进出事件
  cy.on('mouseover', 'node', function(evt) {
    var node = evt.target
    node.addClass('highlight')
    // 把它临近的节点也高亮
    // var nodeID = node.id()
    // 元素的邻居：ele.neighborhood()()
    node.neighborhood().forEach(item => {
      // console.log(item, item.isNode(), item.isEdge())
      // 给相连的node或者edge添加highlight类
      item.addClass('highlight')
    })
  })
  cy.on('mouseout', 'node', function(evt) {
    var node = evt.target
    node.removeClass('highlight')

    // 元素的邻居：ele.neighborhood()()
    node.neighborhood().forEach(item => {
      // console.log(item, item.isNode(), item.isEdge())
      // 给相连的node或者edge添加highlight类
      item.removeClass('highlight')
    })
  })
  cy.on('mouseover', 'edge', function(evt) {
    var edge = evt.target
    window.ddd = evt
    // edge.activate()
    edge.addClass('highlight')
    edge.source().addClass('highlight')
    edge.target().addClass('highlight')
  })
  cy.on('mouseout', 'edge', function(evt) {
    var edge = evt.target
    // window.ddd = evt
    // edge.unactivate()
    edge.removeClass('highlight')
    edge.source().removeClass('highlight')
    edge.target().removeClass('highlight')
  })
}

export default handleHoverEvents
