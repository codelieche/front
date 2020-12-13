<template>
  <div class="full">
    <div class="title">综合示例:DevOps</div>
    <div id="cy"></div>
    <el-dialog
      :visible.sync="showDialog"
      width="60%"
      style="background:transparent;"
      :before-close="handleDialogGraphClose"
      :destroy-on-close="true"
    >
      <DialogGraph :display="showDialog" :elements="showElements" :getElementNeighbordByID="getElementNeighbordByID" />
    </el-dialog>
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
// 弹出组件
import DialogGraph from './dialog'

// Cytoscape.use(canvas)
// Cytoscape.use(cytoscapeCola)
// Cytoscape.use(dagre)
// Cytoscape.use(cise)
// nodeHtmlLabel(Cytoscape)

export default {
  name: 'GraphDemoDevOps',
  components: {
    DialogGraph,
  },
  data() {
    return {
      ...elemets,
      haveEleSelected: false,
      showDialog: false, // 是否显示对话框
      showElements: [], // 对话框要展示的元素
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
      // 点击事件
      var that = this
      cy.on('click', 'node', (evt) => {
        var ele = evt.target
        window.abc = ele
        var id = ele.id()
        that.getElementNeighbordByID(id)
      })
    },
    // 获取元素的邻居节点
    getElementNeighbordByID(id){
        var ele = this.cy.$('#' + id)
        var neighborhood = ele.neighborhood()
        var showElements = [{ data: ele.data() }]
        for (var i = 0; i < neighborhood.length; i++) {
          var item = neighborhood[i]
          // console.log(i, item)
          showElements.push({ data: item.data() })
        }
        // 对新的elements进行赋值
        // console.log(showElements)
        this.showElements = showElements
        this.showDialog = true
    },
    handleDialogGraphClose() {
      this.showDialog = false
      this.showElements = []
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