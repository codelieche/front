<template>
  <div class="full">
    <div class="title">综合示例:DevOps</div>
    <div id="cy"></div>
  </div>
</template>

<script>
import Cytoscape from 'cytoscape'
// import canvas from 'cytoscape-canvas'
// import cytoscapeCola from 'cytoscape-cola' // 推荐
// import dagre from 'cytoscape-dagre' // 推荐
// import cise from 'cytoscape-cise'
// import nodeHtmlLabel from 'cy-node-html-label'

import elemets from './data.js'
import graphStyles from './style.js'
// import handleCytoscapeInstanceEvents from './events.js'
import handleHoverEvents from './hoverEvent'

// Cytoscape.use(canvas)
// Cytoscape.use(cytoscapeCola)
// Cytoscape.use(dagre)
// Cytoscape.use(cise)
// nodeHtmlLabel(Cytoscape)

export default {
  name: 'GraphDemoDevOps',
  data() {
    return {
      ...elemets,
      haveEleSelected: false,
    }
  },
  mounted() {
    //   构建图形
    this.buildGraph()
  },
  beforeDestroy() {
    this.destroyGraph()
  },
  methods: {
    buildGraph() {
      // 销毁已经存在的图形
      this.destroyGraph()

      var cy = (window.cy = Cytoscape({
        container: document.getElementById('cy'),
        boxSelectionEnabled: false,
        style: graphStyles,
        elements: {
          nodes: this.nodes,
          edges: this.edges,
        },
        layout: {
            name: 'dagre',
        //   name: 'circle',
          fit: true,
        },
        minZoom: 0.2,
        maxZoom: 3,
      }))

      this.cy = cy
      //   事件处理
      //   handleCytoscapeInstanceEvents(cy)
      handleHoverEvents(cy)
    },
    destroyGraph() {
      if (this.cy) {
        this.cy.destroy()
        this.cy = undefined
      }
    },
  },
}
</script>

<style lang="less" scoped>
.full {
  display: flex;
  flex-direction: column;
  .title {
    height: 35px;
    line-height: 35px;
    font-size: 18px;
    font-weight: bolid;
    color: #595959;
    border-bottom: 1px solid #eee;
  }
  #cy {
    flex: 1;
  }
}
</style>