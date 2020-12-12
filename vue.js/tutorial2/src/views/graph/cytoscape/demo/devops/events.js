// cy示例事件监听

var handleCytoscapeInstanceEvents = (cy) => {

    // 高亮、点击选中节点，高亮时候的元素
    var checkedTargetElement = []
    var checkedSourceElement = []
    var highlightElements = []


    var hightlightSource = (ele) => {
      if (checkedSourceElement.indexOf(ele) >= 0) {
        return
      } else {
        checkedSourceElement.push(ele)
      }
      var neighborhoods = ele.neighborhood()
      // 得到了所有邻居，可能是node和edge
      neighborhoods.forEach((item) => {
        if (item.isEdge() && item.target() == ele) {
          item.addClass('highlight')
          item.source().addClass('highlight')

          // 高亮的列表
          if (highlightElements.indexOf(item) < 0) {
            highlightElements.push(item)
          }
          if (highlightElements.indexOf(item.source()) < 0) {
            highlightElements.push(item.source())
          }

          // 遍历
          hightlightSource(item.source())
        }
      })
    }

    var hightlightTarget = (ele) => {
      if (checkedTargetElement.indexOf(ele) >= 0) {
        return
      } else {
        checkedTargetElement.push(ele)
      }
      var neighborhoods = ele.neighborhood()
      // 得到了所有邻居，可能是node和edge
      neighborhoods.forEach((item) => {
        if (item.isEdge() && item.source() == ele) {
          item.addClass('highlight')
          item.target().addClass('highlight')
          // 高亮的列表
          if (highlightElements.indexOf(item) < 0) {
            highlightElements.push(item)
          }
          if (highlightElements.indexOf(item.target()) < 0) {
            highlightElements.push(item.target())
          }
          // 遍历
          hightlightTarget(item.target())
        }
      })
    }

    // 鼠标进入进出事件
    cy.on('mouseover', 'node', function (evt) {
        // 有高亮的就不处理
        if(highlightElements.length > 0){
          return 
        }

        var node = evt.target
        node.addClass('highlight')
        // 把它临近的节点也高亮
        // var nodeID = node.id()
        // 元素的邻居：ele.neighborhood()()
        node.neighborhood().forEach((item) => {
          // console.log(item, item.isNode(), item.isEdge())
          // 给相连的node或者edge添加highlight类
          item.addClass('highlight')
        })
      })
      cy.on('mouseout', 'node', function (evt) {
        // 有高亮的就不处理
        if(highlightElements.length > 0){
          return 
        }

        var node = evt.target
        node.removeClass('highlight')

        // 元素的邻居：ele.neighborhood()()
        node.neighborhood().forEach((item) => {
          // console.log(item, item.isNode(), item.isEdge())
          // 给相连的node或者edge添加highlight类
          item.removeClass('highlight')
        })
      })
      cy.on('mouseover', 'edge', function (evt) {
         // 有高亮的就不处理
        if(highlightElements.length > 0){
          return 
        }
        var edge = evt.target
        window.ddd = evt
        // edge.activate()
        edge.addClass('highlight')
      })
      cy.on('mouseout', 'edge', function (evt) {
         // 有高亮的就不处理
        if(highlightElements.length > 0){
          return 
        }
        var edge = evt.target
        // window.ddd = evt
        // edge.unactivate()
        edge.removeClass('highlight')
      })

    // 当节点点击的时候，选中出其所有关联的元素
    cy.on('click', 'node', function (evt) {
        var centerElement = evt.target
        // var neighborhoods = centerElement.neighborhood()
        // 得到了所有邻居，可能是node和edge
        // console.log(neighborhoods)
        // 根据Edge来处理：
        // 如果target是中心元素，那么就对source高亮，对source的source高亮。
        // 如果source是中心元素，那么就对target高亮，对target的target高亮
         highlightElements.forEach((item) => {
          item.removeClass('highlight')
        })
        highlightElements = [centerElement]
        hightlightTarget(centerElement)
        hightlightSource(centerElement)
      })

      // 当节点点击的时候，选中出其所有关联的元素
      cy.on('click', 'edge', function (evt) {
        var centerElement = evt.target
        // var neighborhoods = centerElement.neighborhood()
        // 得到了所有邻居，可能是node和edge
        // console.log(neighborhoods)
        // 根据Edge来处理：
        // 如果target是中心元素，那么就对source高亮，对source的source高亮。
        // 如果source是中心元素，那么就对target高亮，对target的target高亮
         highlightElements.forEach((item) => {
          item.removeClass('highlight')
        })

        highlightElements = [centerElement, centerElement.target(), centerElement.source()]
        highlightElements.forEach(item => {
          item.addClass('highlight')
        })
        hightlightTarget(centerElement.target())
        hightlightSource(centerElement.source())
      })

      cy.on('unselect', 'node', function (evt) {
        // console.log(evt)
        evt == evt
        highlightElements.forEach((item) => {
          item.removeClass('highlight')
        })
        checkedTargetElement = []
        checkedSourceElement = []
        highlightElements = []
      })

       cy.on('unselect', 'edge', function (evt) {
        // console.log(evt)
        evt == evt
        highlightElements.forEach((item) => {
          item.removeClass('highlight')
        })
        checkedTargetElement = []
        checkedSourceElement = []
        highlightElements = []
      })

}

export default handleCytoscapeInstanceEvents
