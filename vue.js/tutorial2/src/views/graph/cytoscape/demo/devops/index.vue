<template>
  <div class="full">
    <div class="title">综合示例:DevOps</div>
    <div id="cy"></div>
    <el-dialog
      :visible.sync="showDialog"
      width="60%"
      style="background: transparent"
      :before-close="handleDialogGraphClose"
      :destroy-on-close="true"
    >
      <DialogGraph
        :display="showDialog"
        :elements="showElements"
        :getElementNeighbordByID="getElementNeighbordByID"
      />
    </el-dialog>
  </div>
</template>

<script>
import cytoscape from 'cytoscape'
// import canvas from 'cytoscape-canvas'
// import cytoscapeCola from 'cytoscape-cola' // 推荐
// import dagre from 'cytoscape-dagre' // 推荐
// import cise from 'cytoscape-cise'
// import nodeHtmlLabel from 'cy-node-html-label'

import elements from './data.js'
// import elements from '@/tmp/data.js'
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
      ...elements,
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

      //   布局名字
      var layoutName = this.nodes.length > 30 ? 'cola' : 'dagre'

      var cy = (window.cy = cytoscape({
        container: document.getElementById('cy'),
        boxSelectionEnabled: false,
        style: graphStyles,
        elements: {
          nodes: this.nodes,
          edges: this.edges,
        },
        layout: {
          //   name: 'dagre',
          //   name: 'cola', // cytoscape-cola需要这个
          //   name: 'circle',
          name: layoutName,
          fit: true,
          rankDir: 'TB', // 默认是从顶到底部：TB，可以尝试LR（从左至右）
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
      cy.on('click', 'edge', (evt) => {
        var ele = evt.target
        window.abc = ele
        var id = ele.id()
        that.getElementNeighbordByID(id)
      })
    },
    // 获取元素的邻居节点
    getElementNeighbordByID(id) {
      var ele = this.cy.$('#' + id)
      var neighborhood = ele.neighborhood()
      // 判断是否是边
      if (ele.isEdge()) {
        neighborhood = [ele.source(), ele.target()]
      }
      var showElements = [{ data: ele.data(), classes: ele.classes() }]
      var needChangeElementsID = false
      for (var i = 0; i < neighborhood.length; i++) {
        var item = neighborhood[i]
        // console.log(i, item)
        if (!needChangeElementsID && item.data().parent) {
          needChangeElementsID = true
        }
        showElements.push({ data: item.data(), classes: item.classes() })
      }

      // 判断是否需要变更ID
      if (needChangeElementsID) {
        // 因为弹出新的图形之后，图形会变乱，所以把元素的ID变更一下，这样关闭弹出的图形也不会让旧的图形变乱了
        // 这里当量很大的时候，性能是个问题，但是这是修复图形变乱问题的唯一方式
        var showElementsStr = JSON.stringify(showElements)
        showElements.map((item) => {
          showElementsStr = showElementsStr.replaceAll(
            item.id,
            `${item.id}-dialog`
          )
        })
        showElements = JSON.parse(showElementsStr)
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