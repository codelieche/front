<template>
  <div id="cy" class="full"></div>
</template>

<script>
import cytoscape from 'cytoscape'

export default {
  name: 'CytoscapeBaseDemo006',
  mounted() {
    this.buildGraph()
  },
  data() {
    return {
      // nodes: [
      //   {data: {id: 'a', label: 'a', shape: 'triangle'}},
      //   {data: {id: 'b', label: 'b', shape: 'round-triangle'}},
      //   {data: {id: 'c', label: 'c', shape: 'rectangle'}},
      //   {data: {id: 'd', label: 'd', shape: 'round-rectangle'}},
      //   {data: {id: 'e', label: 'e', shape: 'bottom-round-rectangle'}},
      //   {data: {id: 'f', label: 'f', shape: 'cut-rectangle'}},
      //   {data: {id: 'g', label: 'g', shape: 'barrel'}},
      //   {data: {id: 'h', label: 'h', shape: 'rhomboid'}},
      // ],
      nodes: [
        'ellipse',
        'triangle',
        'round-triangle',
        'rectangle',
        'round-rectangle',
        'bottom-round-rectangle',
        'cut-rectangle',
        'barrel',
        'rhomboid',
        'diamond',
        'round-diamond',
        'pentagon',
        'round-pentagon',
        'hexagon',
        'round-hexagon',
        'concave-hexagon',
        'heptagon',
        'round-heptagon',
        'octagon',
        'round-octagon',
        'star',
        'tag', 'round-tag', 'vee',
      ].map((item, index) => {
        return {
          data: { id: index + 1, label: item, shape: item },
        }
      }),
    }
  },
  beforeDestroy() {
    // console.log("即将销毁");
    // this.cy.destroy();
    this.destroy()
  },
  methods: {
    buildGraph() {
      if (this.cy) {
        this.cy.destroy()
      }

      var cy = (window.cy = cytoscape({
        container: document.getElementById('cy'),
        boxSelectionEnabled: false,
        style: [
          {
            selector: 'node',
            css: {
              //   content: 'data(app)',
              label: 'data(label)',
              'text-valign': 'bottom',
              'text-halign': 'center',
              shape: 'data(shape)',
              // shape: 'round-triangle', // 默认的形状是ellipse
              width: '35px',
              height: '35px',
              //   'background-color': '#fff',
              'border-width': '1px',
              'border-color': '#999',
              'background-color': '#dcf6f6',
              color: '#666',
            },
          },
          {
            selector: 'node.mousehighlight[^isGroup]',
            style: {
              'background-color': 'red',
              'border-color': 'blue',
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
              'curve-style': 'bezier',
              'target-arrow-shape': 'triangle',
              'line-color': '#999',
              width: '1px',
              label: 'data(label)',
            },
          },
        ],

        elements: {
          nodes: this.nodes,
          edges: this.edges,
        },

        layout: {
          name: 'grid', // cose, breadthfirst
          columns: 4,
        },
      }))
      // cy不可放入data中，要不它不断的变化，页面就卡主了
      this.cy = cy
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
