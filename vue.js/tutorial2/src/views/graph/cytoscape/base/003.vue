<template>
  <div id="cy" class="full"></div>
</template>

<script>
import Cytoscape from 'cytoscape'
// import canvas from 'cytoscape-canvas';
import cytoscapeCola from 'cytoscape-cola'
import dagre from 'cytoscape-dagre'

// Cytoscape.use(canvas);
Cytoscape.use(cytoscapeCola)
Cytoscape.use(dagre)

export default {
  name: 'CytoscapeBaseDemo003',
  mounted() {
    this.buildGraph()
  },
  data() {
    return {
      nodes: [
        {
          data: {
            id: '16d04f68bd507ca9b0707c2a576d1fc2',
            nodeType: 'service',
            namespace: 'default',
            app: 'details',
            service: 'details',
            destServices: [
              {
                namespace: 'default',
                name: 'details',
              },
            ],
          },
        },
        {
          data: {
            id: 'c2efd356d9a25fd009efe2a323e12361',
            nodeType: 'service',
            namespace: 'default',
            app: 'productpage',
            service: 'productpage',
            destServices: [
              {
                namespace: 'default',
                name: 'productpage',
              },
            ],
            hasVS: true,
            isRoot: true,
          },
        },
        {
          data: {
            id: '906196769ac4714aae43f4f789a36d9c',
            nodeType: 'service',
            namespace: 'default',
            app: 'ratings',
            service: 'ratings',
            destServices: [
              {
                namespace: 'default',
                name: 'ratings',
              },
            ],
          },
        },
        {
          data: {
            id: 'adbe9380f23fcbefe5fedd6beb0597ef',
            nodeType: 'service',
            namespace: 'default',
            app: 'reviews',
            service: 'reviews',
            destServices: [
              {
                namespace: 'default',
                name: 'reviews',
              },
            ],
          },
        },
      ],
      edges: [
        {
          data: {
            id: 'a29c717f22385df5586c70a4cf45b9ed',
            source: 'adbe9380f23fcbefe5fedd6beb0597ef',
            target: '906196769ac4714aae43f4f789a36d9c',
            traffic: {
              protocol: 'http',
            },
          },
        },
        {
          data: {
            id: 'a40831f944fb62c54af8f66bd97facd0',
            source: 'c2efd356d9a25fd009efe2a323e12361',
            target: '16d04f68bd507ca9b0707c2a576d1fc2',
            traffic: {
              protocol: 'http',
            },
          },
        },
        {
          data: {
            id: '977c0cdc763de124c822fab424b2996f',
            source: 'c2efd356d9a25fd009efe2a323e12361',
            target: 'adbe9380f23fcbefe5fedd6beb0597ef',
            label: '5ms',
            traffic: {
              protocol: 'http',
            },
          },
        },
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

      var cy = (window.cy = Cytoscape({
        container: document.getElementById('cy'),
        boxSelectionEnabled: false,
        style: [
          {
            selector: 'node',
            css: {
              //   content: 'data(app)',
              label: 'data(app)',
              'text-valign': 'bottom',
              'text-halign': 'center',
              shape: 'round-triangle', // 默认的形状是ellipse
              width: '35px',
              height: '35px',
              'font-size': 12,
              //   'background-color': '#fff',
              'border-width': '1px',
              'border-color': '#999',
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
              // label: 'data(label)',
              'font-size': 12,
            },
          },
        ],

        elements: {
          nodes: this.nodes,
          edges: this.edges,
        },
        maxZoom: 2,
        layout: {
          // name: 'cose', // cose, breadthfirst
          // name: 'cola', // cytoscape-cola需要这个
          // animate: true,
          // fit: true,

          name: 'dagre', // cytoscape-dagre
          animate: true,
          fit: true,
          rankDir: 'LR',
          transform: function (node, pos) {
            return pos
          },
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
