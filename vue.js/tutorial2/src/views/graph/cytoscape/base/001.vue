<template>
  <div id="cy" class="full"></div>
</template>

<script>
import cytoscape from 'cytoscape'

export default {
  name: 'CytoscapeBaseDemo001',
  mounted() {
    this.buildGraph()
  },
  data() {
    return {
      nodes: [
        { data: { id: 'a' } },
        { data: { id: 'b' } },
        { data: { id: 'c', parent: 'b' } },
        { data: { id: 'd', parent: 'b' } },
        { data: { id: 'e' } },
        { data: { id: 'f', parent: 'e' } },
        { data: { id: 'g' } },
      ],
      edges: [
        { data: { id: 'ad', source: 'a', target: 'd' } },
        { data: { id: 'af', source: 'a', target: 'f' } },
        { data: { id: 'cg', source: 'c', target: 'g' } },
      ],
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
              content: 'data(id)',
              'text-valign': 'center',
              'text-halign': 'center',
              shape: 'round-rectangle', // 默认的形状是ellipse
              width: '35px',
              height: '35px',
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
              'width': '1px',
            },
          },
        ],

        elements: {
          nodes: this.nodes,
          edges: this.edges,
        },

        layout: {
          name: 'circle',
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
