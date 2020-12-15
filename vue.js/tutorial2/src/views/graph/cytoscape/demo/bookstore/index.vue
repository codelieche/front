<template>
  <div class="full">
    <div class="title">综合示例:Bookstore</div>
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
        :styles="styles"
      />
    </el-dialog>
  </div>
</template>

<script>
import cytoscape from 'cytoscape'
// import nodeHtmlLabel from 'cy-node-html-label'

import elements from './data.js'
import graphStyles from './style.js'
import handleHoverEvents from '../devops/hoverEvent.js'
// 弹出组件
import DialogGraph from '../devops/dialog'

// nodeHtmlLabel(Cytoscape)

export default {
  name: 'GraphDemoDevOps',
  components: { DialogGraph },
  props: {
    styles: {
      type: Array,
      default() {
        return graphStyles
      },
    },
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
      // console.log(this.nodes)
      var cy = cytoscape({
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
          rankDir: 'LR', // 默认是TB
        },
        minZoom: 0.2,
        maxZoom: 2,
      })

      this.cy = cy
      window.cy = cy

      // nodeHtmlLabel
      // cy.nodeHtmlLabel([
      //   {
      //     query: 'node',
      //     cssClass: 'nodeHtmlLabel',
      //     tpl: function (data) {
      //       if (data.isGroup) {
      //         return '<spn>' + '' + '</span>'
      //       } else {
      //         return (
      //           '<div style="color:red;width:36px;height:36px;background:#76a5fc;border-radius:18px">' +
      //           "<img style='width:10px;padding:13px;' src='/img/pod.png' />" +
      //           '</div>'
      //         )
      //       }
      //     },
      //   },
      // ])

      // 事件处理
      handleHoverEvents(cy)
      // 点击事件
      var that = this
      cy.on('click', 'node', (evt) => {
        var ele = evt.target
        var id = ele.id()
        that.getElementNeighbordByID(id)
      })
      cy.on('click', 'edge', (evt) => {
        var ele = evt.target
        var id = ele.id()
        that.getElementNeighbordByID(id)
      })
    },
    
    // 获取元素的邻居节点
    getElementNeighbordByID(id) {
      var ele = this.cy.$('#' + id)
      var neighborhood = ele.neighborhood()
      var needChangeElementsID = false

      // 判断是否是边
      if (ele.isEdge()) {
        neighborhood = [ele.source(), ele.target()]
      }
      var showElements = [{ data: ele.data(), classes: ele.classes() }]
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
      // console.log("handleDialogGraphClose")
      this.showDialog = false
      this.showElements = []
      this.buildGraph()
      // window.location.reload();
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