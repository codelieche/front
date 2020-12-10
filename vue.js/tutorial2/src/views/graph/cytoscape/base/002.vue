<template>
  <div id="cy" class="full"></div>
</template>

<script>
import Cytoscape from 'cytoscape'
import canvas from 'cytoscape-canvas'
import cytoscapeCola from 'cytoscape-cola' // 推荐
import dagre from 'cytoscape-dagre'  // 推荐
// import cise from 'cytoscape-cise'
import nodeHtmlLabel from 'cy-node-html-label'
// import GroupCompoundLayout from './GroupCompoundLayout'

Cytoscape.use(canvas)
Cytoscape.use(cytoscapeCola)
Cytoscape.use(dagre)
// Cytoscape.use(cise)
// Cytoscape('layout', 'group-compound-layout', GroupCompoundLayout);

nodeHtmlLabel(Cytoscape)

export default {
  name: 'CytoscapeBaseDemo002',
  mounted() {
    this.buildGraph()
  },
  data() {
    return {
      count: 50,
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
      for (var i = 0; i < this.count * 1.5; i++) {
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
              shape: 'round-rectangle', // 默认的形状是circle，增加了cytoscape-canvas 就支持shape属性了
              width: '25px',
              height: '25px',
              'font-size': 6,
            },
          },
          {
            selector: 'node.hover',
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
            selector: 'edge.hover',
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
              label: 'line',
              'font-size': 3,
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
      }))
      // cy不可放入data中，要不它不断的变化，页面就卡主了
      this.cy = cy
      cy.on('mouseover', 'node', function (evt) {
        var node = evt.target
        node.addClass('hover')
        // 把它临近的节点也高亮
        // var nodeID = node.id()
        evt.cy.elements().forEach((item) => {
          // console.log(item)
          // 是否为edge
          if (item.isEdge()) {
            if (item.source() === node) {
              item.addClass('hover') // 把edge高亮
              // 把target高亮
              item.target().addClass('hover')
            }
            if (item.target() === node) {
              item.addClass('hover') // 把edge高亮
              // 把source高亮
              item.source().addClass('hover')
            }
          }
        })
      })
      cy.on('mouseout', 'node', function (evt) {
        var node = evt.target
        node.removeClass('hover')

        evt.cy.elements().forEach((item) => {
          // console.log(item)
          // 是否为edge
          if (item.isEdge()) {
            if (item.source() === node) {
              item.removeClass('hover') // 把edge高亮取消
              // 把target高亮取消
              item.target().removeClass('hover')
            }
            if (item.target() === node) {
              item.removeClass('hover') // 把edge高亮取消
              // 把source高亮取消
              item.source().removeClass('hover')
            }
          }
        })
      })
      cy.on('mouseover', 'edge', function (evt) {
        var edge = evt.target
        window.ddd = evt
        // edge.activate()
        edge.addClass('hover')
      })
      cy.on('mouseout', 'edge', function (evt) {
        var edge = evt.target
        // window.ddd = evt
        // edge.unactivate()
        edge.removeClass('hover')
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
