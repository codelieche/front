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
      elements: {
        nodes: [
          { data: { id: 'a', label: 'a' }, classes: 'el-app' },
          { data: { id: 'b', label: 'b' }, classes: 'el-icon-setting' },
          { data: { id: 'c', label: 'c' }, classes: 'star' },
        ],
        edges: [
          { data: { id: 'ab', source: 'a', target: 'b' } },
          { data: { id: 'ac', source: 'a', target: 'c' } },
        ],
      },
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
              content: 'data(label)',
              width: 16,
              height: 16,
            },
          },
          {
            selector: 'node[label]',
            style: {
              label: 'data(label)',
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
          {
            selector: '.el-app',
            style: {
              'background-color': 'red',
              color: '#fff',
              'font-size': '20px',
              'text-outline-color': '#888',
              'text-outline-width': 3,
              'text-valign': 'bottom',
              'text-halign': 'center',
            },
          },

          // star
          {
            selector: '.star',
            style: {
              // width: 10,
              // height: 10,
              // color: 'red',
              // position: 'relative',
              // 'border-left': '100px solid transparent',
              // 'border-right': '100px solid transparent',
              // 'border-bottom': '70px solid red',
              // transform: 'rotate(35deg)',

              // label
              color: '#fff',
              'font-size': '20px',
              'text-outline-color': '#888',
              'text-outline-width': 3,
              'text-valign': 'bottom',
              'text-halign': 'center',
            },
          },
          // {
          //   selector: '.star:hover',
          //   style: {
          //     color: 'green',
          //   },
          // },
          {
            selector: '.star:before',
            style: {
              content: 'Before',
              width: 10,
              height: 10,
              // position: 'absolute',
              // 'border-bottom': '80px solid red',
              // 'border-left': '30px solid transparent',
              // 'border-right': '30px solid transparent',
              // top: '-50px',
              // left: '-60px',
              // 'transform': 'rotate(-35deg)',
            },
          },
          // {
          //   selector: '.star:after',
          //   style: {
          //     content: '',
          //     width: '0px',
          //     height: '0px',
          //     position: 'absolute',
          //     'border-top': '70px solid red',
          //     'border-left': '100px solid transparent',
          //     'border-right': '100px solid transparent',
          //     left: '-100px',
          //     'transform': 'rotate(110deg)',
          //   },
          // },
        ],

        elements: this.elements,

        layout: {
          name: 'breadthfirst', // cose, breadthfirst
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
