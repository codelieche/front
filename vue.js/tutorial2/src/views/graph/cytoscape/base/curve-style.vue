<template>
  <div id="cy" class="full"></div>
</template>

<script>
import Cytoscape from 'cytoscape'
// import canvas from 'cytoscape-canvas';

// Cytoscape.use(canvas);

export default {
  // 取现类型
  name: 'CytoscapeBaseDemoCurveStyle',
  mounted() {
    this.buildGraph()
  },
  data() {
    return {
      elements: [],
    }
  },
  beforeDestroy() {
    // console.log("即将销毁");
    // this.cy.destroy();
    this.destroy()
  },
  methods: {
    generateElements() {
      var edgeCurveStyles = [
        'bezier',
        'unbundled-bezier',
        // 'unbundled-bezier',
        'straight',
        'haystack',
        'segments',
        'taxi',
      ]
      edgeCurveStyles.forEach((item, index) => {
        var id = (index + 1) * 10
        for (var i = 1; i < 4; i++) {
          this.elements.push({
            data: { id: id + i },
          })
        }
        // 2条线
        for (var x = 2; x < 4; x++) {
          this.elements.push({
            data: {
              id: `${id + 1}-${id + x}`,
              source: id + 1,
              target: id + x,
              curveStyle: item,
              label: item,
            },
            classes: item,
          })
        }
      })
    },
    buildGraph() {
      this.generateElements()
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
              //   content: 'data(app)',
              // label: 'data(label)',
              'text-valign': 'bottom',
              'text-halign': 'center',
              // shape: 'round-triangle', // 默认的形状是circle，增加了cytoscape-canvas 就支持shape属性了
              width: '25px',
              height: '25px',
              //   'background-color': '#fff',
              'border-width': '1px',
              'border-color': '#999',
              'background-color': '#dcf6f6',
              color: '#666',
            },
          },
         
          {
            selector: 'edge',
            css: {
              // 'curve-style': 'data(curveStyle)',
              // 'target-arrow-shape': 'triangle', // 箭头类型
              'line-color': '#999',
              width: '1px',
              label: 'data(label)',
              'font-size': '8px',
            },
          },
          {
            selector: 'edge.bezier',
            style: {
              'curve-style': 'bezier',
              'control-point-step-size': 40,
            },
          },
          {
            selector: 'edge.unbundled-bezier',
            style: {
              'curve-style': 'unbundled-bezier',
              'control-point-distances': 120,
              'control-point-weights': 0.1,
            },
          },
          {
            selector: 'edge.multi-unbundled-bezier',
            style: {
              'curve-style': 'unbundled-bezier',
              'control-point-distances': [40, -40],
              'control-point-weights': [0.25, 0.75],
            },
          },
          {
            selector: 'edge.haystack',
            style: {
              'curve-style': 'haystack',
              'haystack-radius': 0.5,
            },
          },
          {
            selector: 'edge.segments',
            style: {
              'curve-style': 'segments',
              'segment-distances': [40, -40],
              'segment-weights': [0.25, 0.75],
            },
          },
          {
            selector: 'edge.taxi',
            style: {
              'curve-style': 'taxi',
              'taxi-direction': 'downward',
              'taxi-turn': 20,
              'taxi-turn-min-distance': 5,
            },
          },
        ],

        elements: this.elements,

        layout: {
          name: 'cose', // cose, breadthfirst
          // columns: 4,
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
