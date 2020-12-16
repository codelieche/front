<template>
  <div class="full">
    <div class="title" @click="buildGraph">
      自定义:weblink
      <el-button @click.prevent.stop="randomError('success')" type="text">随机成功</el-button>
      <el-button @click.prevent.stop="randomError('warn')" type="text">随机警告</el-button>
      <el-button @click.prevent.stop="randomError('error')" type="text">随机错误</el-button>
      </div>
    <div id="cy"></div>
  </div>
</template>

<script>
import cytoscape from 'cytoscape'
// import nodeHtmlLabel from 'cy-node-html-label'

import elements from './data.js'
import graphStyles from './style.js'
import handleHoverEvents from './hoverEvent.js'

// nodeHtmlLabel(Cytoscape)

export default {
  name: 'GraphDemoDevOps',
  components: {},
  data() {
    return {
      count: 20,
      elements: elements,
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

      // 每次build重新生成元素
      //   布局名字
      var layoutName = this.elements.nodes.length > 30 ? 'cola' : 'dagre'

      var cy = (window.cy = cytoscape({
        container: document.getElementById('cy'),
        boxSelectionEnabled: false,
        style: graphStyles,
        elements: this.elements,
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
      }))

      this.cy = cy
      // 事件处理
      handleHoverEvents(cy)
    },
    // 获取元素的邻居节点
    getElementNeighbordByID(id) {
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

    destroyGraph() {
      if (this.cy) {
        this.cy.destroy()
        this.cy = undefined
      }
    },

    randomError(type="error") {
      // 随机设置个error
      if (this.cy) {
        var edges = this.cy.edges()
        var index = Math.floor(Math.random() * edges.length)
        if(type === "success"){
          edges[index].removeClass('warn error')
          edges[index].target().removeClass('warn error')
        }
        edges[index].addClass(type)
        edges[index].target().addClass(type)
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
    font-weight: 500;
    color: #595959;
    border-bottom: 1px solid #eee;
    cursor: pointer;
  }
  #cy {
    flex: 1;
  }
}
</style>