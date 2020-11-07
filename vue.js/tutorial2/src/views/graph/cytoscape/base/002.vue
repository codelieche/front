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
      count: 30,
      nodes: [
        // { data: { id: 'a' } },
      ],
      edges: [
        // { data: { id: 'ad', source: 'a', target: 'd' } },
      ],
    }
  },
  beforeDestroy() {
    // console.log("即将销毁");
    // this.cy.destroy();
    this.destroy()
  },
  methods: {
    generateNodes() {
      for (var i = 0; i < this.count; i++) {
        this.nodes.push({
          data: {
            description: 'DevOps System',
            label: 'devops-xxxx-' + i,
            color: '#2196f3',
            meta: {
              namespace: 'default',
            },
            id: 'devops-xxxx-' + i,
            type: this.count > 200 ? 'circle' : 'custom-pod',
            //   type: 'circle',
          },
        })
      }
    },
    generateEdges() {
      for (var i = 0; i < this.count * 2; i++) {
        var s = Math.floor(Math.random() * this.count)
        var t = Math.floor(Math.random() * this.count)
        if (s != t) {
          this.edges.push({
            data: {
              id: `devops-xxxx-${s}-devops-xxxx-${t}`,
              source: 'devops-xxxx-' + s,
              target: 'devops-xxxx-' + t,
              label: '50ms',
              type: 'cubic-horizontal',
              style: {
                endArrow: true,
              },
            },
          })
        }
      }
    },
    buildGraph() {
      this.generateNodes()
      this.generateEdges()
      if (this.cy) {
        this.cy.destroy()
      }

      var cy = (window.cy = Cytoscape({
        container: document.getElementById('cy'),
        boxSelectionEnabled: false,
        style: [
          {
            selector: 'node',
            css: {
              content: 'data(id)',
              'text-valign': 'center',
              'text-halign': 'center',
              shape: 'round-rectangle', // 默认的形状是circle，增加了cytoscape-canvas 就支持shape属性了
              width: '25px',
              height: '25px',
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
            },
          },
        ],

        elements: {
          nodes: this.nodes,
          edges: this.edges,
        },
        layout: {
          zoom: 1,
          name: 'circle', // circle, grid, circle, concentric, breadthfirst, cose, preset
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
