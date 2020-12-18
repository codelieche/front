<template>
  <div class="full">
    <div class="title" @click="buildGraph">自定义:nodeHtmlLabel</div>
    <div id="cy"></div>
  </div>
</template>

<script>
import cytoscape from 'cytoscape'
// import nodeHtmlLabel from 'cy-node-html-label'

import generateElements from './data.js'
// import data01 from './data01.js'
import graphStyles from './style.js'
import handleHoverEvents from './hoverEvent.js'

// nodeHtmlLabel(Cytoscape)

export default {
  name: 'GraphDemoDevOps',
  components: {},
  data() {
    return {
      count: 20,
      elements: generateElements(20),
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
      this.elements = generateElements(this.count)
      //   布局名字
      var layoutName = this.elements.nodes.length > 30 ? 'cola' : 'dagre'

      var cy = (window.cy = cytoscape({
        container: document.getElementById('cy'),
        boxSelectionEnabled: false,
        style: graphStyles,
        elements: this.elements,
        // elements: data01,
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

      // nodeHtmlLabel
      cy.nodeHtmlLabel([
        {
          query: 'node',
          cssClass: 'nodeHtmlLabel',
          tpl: function (data) {
            // 请返回span的元素，div的无法设置background，span的ok
            if (data.isGroup) {
              return '<spn class="group">' + '' + '</span>'
            } else {
              return (
                `<span class="shape ${data.nodeType}">` +
                '<span></span>' +
                '</span>'
              )
            }
          },
        },
      ])

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
  },
}
</script>

<style lang="less">
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
    cursor: pointer;
  }
  #cy {
    flex: 1;
  }
  .nodeHtmlLabel {
    width: 35px;
    height: 35px;
    // background-color: #76a5fc;
    background-color: #fff;

    // 非Group的
    span.shape {
      // width: 35px;
      // height: 35px;
      // border: 1px solid #fff;
      // border-radius: 3px;
      display: block;
      span {
        display: inline-block;
      }
      &:hover {
        opacity: 1;
      }
      // css各种形状
      &.triangle-up,
      &.service {
        width: 0;
        height: 0;
        border-left: 17px solid transparent;
        border-right: 17px solid transparent;
        border-bottom: 34px solid #999;
      }

      &.app {
        width: 34px;
        height: 34px;
        background: #76a5fc;
        background-image: url(/img/pod.png);
        background-position: 10px 10px;
        background-size: 14px 14px;
        background-repeat: no-repeat;
        // background-image: url(/img/logos/desktop.png);
        // // background-position: 10px 10px;
        // background-size: 35px 35px;
        // background-repeat: no-repeat;
      }

      &.workload {
        width: 34px;
        height: 34px;
        height: 34px;
        width: 34px;
        background: red;
        // background-image: url(/img/logos/kubernetes.png);
        // // background-position: 10px 10px;
        // background-size: 35px 35px;
        // background-repeat: no-repeat;
      }

      &.operation {
        width: 35px;
        height: 35px;
        background: #989898;
        // background-image: url(/img/logos/mysql.svg);
        // // background-position: 10px 10px;
        // background-size: 35px 35px;
        // background-repeat: no-repeat;
      }
      &.serviceEntry {
        width: 35px;
        height: 35px;
        background: orange;
        // background-image: url(/img/logos/docker.png);
        // // background-position: 10px 10px;
        // background-size: 35px 35px;
        // background-repeat: no-repeat;
      }
    }
  }
}
</style>