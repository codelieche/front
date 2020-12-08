<template>
  <div id="container" class="full"></div>
</template>
<script>
import G6 from '@antv/g6'

// 注册自定义的图形
G6.registerNode('custom-pod', (cfg) => {
  return `
        <group>
             <rect>
                <rect style={{
                width: 150,
                height: 20,
                fill: ${cfg.color},
                radius: [6, 6, 0, 0],
                cursor: 'move'，
                stroke: ${cfg.color}
                }} draggable="true">
                <text style={{ 
                    marginTop: 2, 
                    marginLeft: 75, 
                    textAlign: 'center', 
                    fontWeight: 'bold', 
                    fill: '#fff' }}>{{label}}</text>
                </rect>
                <rect style={{
                    width: 150,
                    height: 55,
                    stroke: ${cfg.color},
                    fill: #ffffff,
                    radius: [0, 0, 6, 6],
                    }}>
                    <text style={{ marginTop: 5, marginLeft: 3, fill: '#333', marginLeft: 4 }}>描述: {{description}}</text>
                    <text style={{ marginTop: 10, marginLeft: 3, fill: '#333', marginLeft: 4 }}>NS: {{meta.namespace}}</text>
                </rect>
            </rect>
        </group>
        `
})

export default {
  name: 'CustomNode001',

  data() {
    return {
      count: 50,
      nodes: [],
      edges: [],
    }
  },

  mounted() {
    this.initG6()
  },

  methods: {
    initG6() {
      this.generateNodes()
      this.generateEdges()

      const container = document.getElementById('container')
      const width = container.scrollWidth
      const height = container.scrollHeight || 500

      // 计算画布大小
      var zoomSize = 1
      var itemSize = 200 * 200 // 每个节点需要的面积
      zoomSize = (width * height) / (itemSize * this.count) // 计算div的面积 与 需要的面积的比
      if(zoomSize > 1){
          zoomSize = 1
      }
      if(zoomSize < 0.1){
          zoomSize = 0.1
      }

      const graph = new G6.Graph({
        container: 'container',
        width: width * ( 1 / zoomSize),
        height: height * ( 1 / zoomSize),
        layout: {
          type: 'grid',
          begin: [0, 0], // 可选，
          preventOverlap: true, // 可选，必须配合 nodeSize
          preventOverlapPdding: 20, // 可选
          nodeSize: 30, // 可选
          condense: false, // 可选
          rows: 5, // 可选
          cols: 5, // 可选
          sortBy: 'degree', // 可选
        },
        // translate the graph to align the canvas's center, support by v3.5.1
        fitCenter: true,
        modes: {
          default: ['drag-node', 'zoom-canvas'],
        },
      })

      const autoPaint = graph.get('autoPaint')
      const zoom = graph.getZoom()
      console.log(autoPaint, zoom)
      graph.zoom(0.3, { x: width / 2, y: height / 2 })

      graph.on('edge:mouseenter', function (evt) {
        const zoom = graph.getZoom()
        console.log("zoom", zoom)
        const edge = evt.item
        const model = edge.getModel()
        model.oriLabel = model.label
        graph.updateItem(edge, {
          // label: 'after been hovered',
          labelCfg: {
            style: {
              fill: 'red',
            },
          },
        })
      })

      graph.on('edge:mouseleave', function (evt) {
        const edge = evt.item
        const model = edge.getModel()
        model.oriLabel = model.label
        graph.updateItem(edge, {
          // label: 'after been hovered',
          labelCfg: {
            style: {
              fill: '#595959',
            },
          },
        })
      })

      graph.data({ nodes: this.nodes, edges: this.edges })
      graph.render()
      //   window.graph = graph
      console.log("zoomSize", zoomSize);
      console.log(width * (0.5 / zoomSize) , height * (0.5 / zoomSize))
      graph.zoomTo(zoomSize)

      if (typeof window !== 'undefined')
        window.onresize = () => {
          if (!graph || graph.get('destroyed')) return
          if (!container || !container.scrollWidth || !container.scrollHeight)
            return
          graph.changeSize(container.scrollWidth, container.scrollHeight)
        }
    },

    generateNodes() {
      for (var i = 0; i < this.count; i++) {
        this.nodes.push({
          description: 'DevOps System',
          label: 'devops-xxxx-' + i,
          color: '#2196f3',
          meta: {
            namespace: 'default',
          },
          id: 'devops-xxxx-' + i,
          type: this.count > 200 ? "circle": 'custom-pod',
          //   type: 'circle',
        })
      }
    },
    generateEdges() {
      for (var i = 0; i < this.count * 2; i++) {
        var s = Math.floor(Math.random() * this.count)
        var t = Math.floor(Math.random() * this.count)
        this.edges.push({
          source: 'devops-xxxx-' + s,
          target: 'devops-xxxx-' + t,
          label: '50ms',
          type: 'cubic-horizontal',
          style: {
            endArrow: true,
          },
        })
      }
    },
  },
}
</script>

<style lang="less" scoped>
</style>