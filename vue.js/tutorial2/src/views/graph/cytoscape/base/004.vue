<template>
  <div id="cy" class="full"></div>
</template>

<script>
import Cytoscape from 'cytoscape'
// import canvas from 'cytoscape-canvas';

// Cytoscape.use(canvas);

export default {
  name: 'CytoscapeBaseDemo001',
  mounted() {
    this.buildGraph()
  },
  data() {
    return {
      elements: [
        { data: { id: 'n0', type: 'triangle' } },
        { data: { id: 'n1' } },
        { data: { id: 'e0', source: 'n0', target: 'n1', arrow: 'triangle' } },

        { data: { id: 'n2', type: 'triangle-tee' } },
        { data: { id: 'n3' } },
        {
          data: { id: 'e1', source: 'n2', target: 'n3', arrow: 'triangle-tee' },
        },

        { data: { id: 'n4', type: 'circle-triangle' } },
        { data: { id: 'n5' } },
        {
          data: {
            id: 'e2',
            source: 'n4',
            target: 'n5',
            arrow: 'circle-triangle',
          },
        },

        { data: { id: 'n6', type: 'triangle-cross' } },
        { data: { id: 'n7' } },
        {
          data: {
            id: 'e3',
            source: 'n6',
            target: 'n7',
            arrow: 'triangle-cross',
          },
        },

        { data: { id: 'n8', type: 'triangle-backcurve' } },
        { data: { id: 'n9' } },
        {
          data: {
            id: 'e4',
            source: 'n8',
            target: 'n9',
            arrow: 'triangle-backcurve',
          },
        },

        { data: { id: 'n10', type: 'vee' } },
        { data: { id: 'n11' } },
        { data: { id: 'e5', source: 'n10', target: 'n11', arrow: 'vee' } },

        { data: { id: 'n12', type: 'tee' } },
        { data: { id: 'n13' } },
        { data: { id: 'e6', source: 'n12', target: 'n13', arrow: 'tee' } },

        { data: { id: 'n14', type: 'square' } },
        { data: { id: 'n15' } },
        { data: { id: 'e7', source: 'n14', target: 'n15', arrow: 'square' } },

        { data: { id: 'n16', type: 'circle' } },
        { data: { id: 'n17' } },
        { data: { id: 'e8', source: 'n16', target: 'n17', arrow: 'circle' } },

        { data: { id: 'n18', type: 'diamond' } },
        { data: { id: 'n19' } },
        { data: { id: 'e9', source: 'n18', target: 'n19', arrow: 'diamond' } },

        { data: { id: 'n20', type: 'none' } },
        { data: { id: 'n21' } },
        { data: { id: 'e10', source: 'n20', target: 'n21', arrow: 'none' } },
      ],
      edges: [],
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

      var cy = (window.cy = Cytoscape({
        container: document.getElementById('cy'),
        boxSelectionEnabled: false,
        style: [
          {
            selector: 'node',
            style: {
              'text-valign': 'center',
              'text-halign': 'left',
              width: 16,
              height: 16,
            },
          },
          {
            selector: 'node[type]',
            style: {
              label: 'data(type)',
            },
          },
          {
            selector: 'edge',
            style: {
              width: 1,
              'curve-style': 'straight',
            },
          },
          {
            selector: 'edge[arrow]',
            style: {
              'target-arrow-shape': 'data(arrow)',
            },
          },
          {
            selector: 'edge.hollow',
            style: {
              'target-arrow-fill': 'hollow',
            },
          },
        ],

        elements: this.elements,

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
