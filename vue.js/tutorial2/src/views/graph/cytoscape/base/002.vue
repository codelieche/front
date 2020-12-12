<template>
  <div id="cy" class="full"></div>
</template>

<script>
import Cytoscape from 'cytoscape'
// import canvas from 'cytoscape-canvas'
// import cytoscapeCola from 'cytoscape-cola' // 推荐
// import dagre from 'cytoscape-dagre' // 推荐
// import cise from 'cytoscape-cise'
// import nodeHtmlLabel from 'cy-node-html-label'
// import GroupCompoundLayout from './GroupCompoundLayout'

// Cytoscape.use(canvas)
// Cytoscape.use(cytoscapeCola)
// Cytoscape.use(dagre)
// Cytoscape.use(cise)
// Cytoscape('layout', 'group-compound-layout', GroupCompoundLayout);

// nodeHtmlLabel(Cytoscape)

export default {
  name: 'CytoscapeBaseDemo002',
  mounted() {
    this.buildGraph()
    window.buildGraph = this.buildGraph
  },
  data() {
    return {
      count: 30,
      nodes: [
        // { data: { id: 'a' } },
      ],
      edges: [
        // { data: { id: 'ad', source: 'a', target: 'd' } },
      ],
    }
  },
  beforeDestroy() {
    // console.log("即将销毁");
    // this.cy.destroy();
    this.destroy()
  },
  methods: {
    generateNodes() {
      for (var i = 0; i < this.count; i++) {
        this.nodes.push({
          data: {
            description: 'DevOps System',
            label: 'devops-xxxx-' + i,
            color: '#2196f3',
            meta: {
              namespace: 'default',
            },
            id: 'devops-xxxx-' + i,
            type: this.count > 200 ? 'circle' : 'custom-pod',
            //   type: 'circle',
          },
        })
      }
    },
    generateEdges() {
      for (var i = 0; i < this.count * 1; i++) {
        var s = Math.floor(Math.random() * this.count)
        var t = Math.floor(Math.random() * this.count)
        if (s != t) {
          this.edges.push({
            data: {
              id: `devops-xxxx-${s}-devops-xxxx-${t}`,
              source: 'devops-xxxx-' + s,
              target: 'devops-xxxx-' + t,
              label: '50ms',
              type: 'cubic-horizontal',
              style: {
                endArrow: true,
              },
            },
          })
        }
      }
    },
    buildGraph() {
      this.generateNodes()
      this.generateEdges()
      if (this.cy) {
        this.cy.destroy()
        this.cy = undefined
      }

      var cy = (window.cy = Cytoscape({
        container: document.getElementById('cy'),
        boxSelectionEnabled: false,
        style: [
          {
            selector: 'node',
            css: {
              content: 'data(id)',
              'text-valign': 'bottom',
              'text-halign': 'center',
              shape: 'round-rectangle', // 默认的形状是ellipse
              width: '25px',
              height: '25px',
              'font-size': 6,
            },
          },
          {
            selector: 'node.highlight',
            style: {
              'border-color': '#3aa5dc',
              'border-width': '3px',
              'background-color': '#3aa5dc',
              opacity: 0.8,
              width: '35px',
              height: '35px',
              'font-size': 14,
            },
          },

          {
            selector: ':parent',
            css: {
              'text-valign': 'top',
              'text-halign': 'center',
            },
          },
          {
            selector: 'edge',
            css: {
              // 'curve-style': 'bezier',
              'curve-style': 'unbundled-bezier',
              'target-arrow-shape': 'triangle',
              'line-color': '#999',
              width: '0.5px',
            },
          },
          {
            selector: 'edge.highlight',
            style: {
              'line-color': '#3aa5dc',
              'target-arrow-color': '#3aa5dc',
              opacity: 0.8,
              width: '2px',
              'line-style': 'solid',
              'target-arrow-shape': 'vee',
              'text-outline-color': 'red',
              'text-outline-width': '2px',
            },
          },
          {
            selector: 'edge:selected',
            css: {
              width: '3px',
              'font-size': 13,
            },
          },
        ],

        elements: {
          nodes: this.nodes,
          edges: this.edges,
        },
        layout: {
          zoom: 1,
          // name: 'circle', // circle, grid, circle, concentric, breadthfirst, cose, preset
          // name: 'cola', // cytoscape-cola需要这个
          // animate: true,
          // fit: true,
          // nodeSpacing: 40,
          name: 'dagre', // cytoscape-dagre
          animate: true,
          fit: true,
          transform: function (node, pos) {
            return pos
          },

          // name: 'cise', // cytoscape-cise
          // animate: true,
          // fit: true,
        },
        maxZoom: 3,
        minZoom: 0.2,
      }))
      // cy不可放入data中，要不它不断的变化，页面就卡主了
      this.cy = cy
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

        // evt.cy.elements().forEach((item) => {
        //   // console.log(item)
        //   // 是否为edge
        //   if (item.isEdge()) {
        //     if (item.source() === node) {
        //       item.addClass('highlight') // 把edge高亮
        //       // 把target高亮
        //       item.target().addClass('highlight')
        //     }
        //     if (item.target() === node) {
        //       item.addClass('highlight') // 把edge高亮
        //       // 把source高亮
        //       item.source().addClass('highlight')
        //     }
        //   }
        // })
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

        // evt.cy.elements().forEach((item) => {
        //   // console.log(item)
        //   // 是否为edge
        //   if (item.isEdge()) {
        //     if (item.source() === node) {
        //       item.removeClass('highlight') // 把edge高亮取消
        //       // 把target高亮取消
        //       item.target().removeClass('highlight')
        //     }
        //     if (item.target() === node) {
        //       item.removeClass('highlight') // 把edge高亮取消
        //       // 把source高亮取消
        //       item.source().removeClass('highlight')
        //     }
        //   }
        // })
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
    },
    destroy() {
      // console.log(this.cy);
      if (this.cy) {
        // 销毁图形
        this.cy.destroy()
        this.cy = undefined
      }
    },
  },
}
</script>

<style lang="less" scoped>
#id,
.full {
  height: 100%;
  width: 100%;
  position: relative;

  canvas {
    left: 0 !important;
  }
}
</style>
