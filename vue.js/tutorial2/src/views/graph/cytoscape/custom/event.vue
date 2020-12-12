<template>
  <div class="full">
    <div class="title">{{ title }}  {{ selectedElementID ? "当前选中" + selectedElementID : '' }}</div>
    <div id="cy"></div>
  </div>
</template>
<script>
import cytoscape from 'cytoscape'
export default {
  name: 'CytoscapeDemoCustomColor',
  data() {
    return {
      title: '事件处理',
      selectedElementID: '',
      elements: [
        {
          data: { id: 'a' },
        },
        {
          data: {
            id: 'b',
          },
        },
        {
          data: {
            id: 'c',
          },
        },
        {
          data: {
            id: 'd',
            label: 'background-image: 背景图片',
            backgroundImage: '/img/logo.82b9c7a5.png',
          },
          classes: 'background-image',
        },

        // 变
        {
          data: {
            id: 'a->b',
            source: 'a',
            target: 'b',
          },
        },
        {
          data: {
            id: 'c->d',
            source: 'c',
            target: 'd',
            lineColor: 'pink',
            label: '50ms',
          },
          classes: 'color',
        },
      ],
    }
  },
  mounted() {
    this.buildGraph()
  },
  methods: {
    buildGraph() {
      if (this.cy) {
        this.cy.destroy()
      }
      var style = [
        {
          selector: 'node',
          css: {
            'text-valign': 'bottom',
            'text-halign': 'center',
            label: 'data(id)',
            shape: 'ellipse', // 默认的形状是ellipse, round-rectangle
            width: '35px',
            height: '35px',
            // label: 'data(label)',
            'font-size': 10,
          },
        },
        {
          selector: 'node.highlight',
          css: {
            'background-color': '#3AA5DC',
            'width': '45px',
            'height': '45px',
          },
        },
        // 点击了后，节点selected
        {
          selector: 'node:selected',
          css: {
            'background-color': 'red',
          },
        },
        {
          selector: 'node.background-image',
          style: {
            'background-image': 'data(backgroundImage)',
            width: '45px',
            height: '45px',
            'background-width': '45px',
            'background-height': '45px',
            'background-color': '#fff',
            'border-width': 0.1,
            'border-color': '#999',
          },
        },
        {
          selector: 'node.background-image.highlight',
          style: {
            'background-color': '#fff',
            'border-width': 2,
            'border-color': '#3AA5DC',
          },
        },

        // edge
        {
          selector: 'edge',
          css: {
            width: 1,
            'curve-style': 'unbundled-bezier',
          },
        },
        {
          selector: 'edge.color',
          css: {
            'line-color': 'data(lineColor)',
            label: 'data(label)',
            color: '#999',
            'font-size': 14,
            'font-weight': 'bold',
          },
        },
        {
          selector: 'edge.highlight',
          css: {
            'line-color': '#3AA5DC',
          },
        },
      ]
      var that = this
      var cy = (window.cy = cytoscape({
        container: document.getElementById('cy'),
        boxSelectionEnabled: false,
        elements: this.elements,
        style,
        layout: {
          name: 'grid',
          columns: 4,
        },
        maxZoom: 2,
      }))

      // 添加事件
      cy.on('mouseover', 'node', (evt) => {
        var data = evt.target.data()
        that.title = '鼠标进入:' + data.id
        // 添加类
        evt.target.addClass('highlight')
      })

      cy.on('mouseout', 'node', (evt) => {
        var data = evt.target.data()
        that.title = '鼠标离开:' + data.id
        // 移除类
        evt.target.removeClass('highlight')
      })

      // 边的事件
      cy.on('mouseover', 'edge', (evt) => {
        var data = evt.target.data()
        that.title = '鼠标进入edge:' + data.id
        // 添加类
        evt.target.addClass('highlight')
      })
      // 边的事件
      cy.on('mouseout', 'edge', (evt) => {
        var data = evt.target.data()
        that.title = '鼠标离开edge:' + data.id
        // 添加类
        evt.target.removeClass('highlight')
      })

      // click事件
      cy.on('click', 'node', (evt) => {
        var ele = evt.target
        that.title = '鼠标点击了Node:' + ele.id()
        // console.log(that.selectedElementID, that.selectedElementID == ele.id())
        that.selectedElementID = ele.id()
        // 添加类
        evt.target.addClass('highlight')
      })

      // cy.on('unselect', 'node', (evt) => {
      cy.on('unselect', (evt) => {
        // console.log('unselect event', evt)
        if (that.selectedElementID == evt.target.id()) {
          that.selectedElementID = ''
        }
      })

      this.cy = cy
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