<template>
  <div id="cy" class="full"></div>
</template>
<script>
import cytoscape from 'cytoscape'
export default {
  name: 'CytoscapeDemoCustomColor',
  data() {
    return {
      elements: [
        {
          data: { id: 'a', color: 'red', label: 'color: 文字颜色' },
          classes: 'color',
        },
        {
          data: {
            id: 'b',
            label: 'backgroud-color: 填充颜色',
            backgroundColor: 'red',
          },
          classes: 'background-color',
        },
        {
          data: {
            id: 'c',
            label: 'border-color: 边框颜色',
            borderColor: 'red',
          },
          classes: 'border-color',
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
            source: 'a',
            target: 'b',
          },
        },
        {
          data: {
            source: 'b',
            target: 'd',
            lineColor: 'pink',
            label: '50ms'
          },
          classes: 'color'
        }
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
            shape: 'ellipse', // 默认的形状是ellipse, round-rectangle
            width: '35px',
            height: '35px',
            label: 'data(label)',
            'font-size': 10,
          },
        },
        {
          selector: 'node.color',
          css: {
            color: 'data(color)',
          },
        },
        {
          selector: 'node.background-color',
          css: {
            'background-color': 'data(backgroundColor)',
          },
        },
        {
          selector: 'node.border-color',
          css: {
            'border-width': 2,
            'border-color': 'data(borderColor)',
            'shape': 'star'
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
            'border-color': '#999'
          },
        },

        // edge
        {
          selector: 'edge',
          css: {
            'width': 1,
            'curve-style': 'unbundled-bezier'
          },
        },
        {
          selector: 'edge.color',
          css: {
            'line-color': 'data(lineColor)',
            label: 'data(label)',
            'color': '#999',
            'font-size': 14,
            'font-weight': 'bold',
          },
        },
      ]
      var cy = (window.cy = cytoscape({
        container: document.getElementById('cy'),
        boxSelectionEnabled: false,
        elements: this.elements,
        style,
        layout: {
          name: 'breadthfirst',
          columns: 4,
        },
        maxZoom: 2,
      }))

      this.cy = cy
    },
  },
}
</script>