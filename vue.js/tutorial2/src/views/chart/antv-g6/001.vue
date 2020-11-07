<template>
  <div id="container" class="main"></div>
</template>

<script>
import G6 from '@antv/g6'

export default {
  name: 'AntvG6Demo001',
  data() {
    return {
      nodes: [
        {
          id: '0',
          x: 100,
          y: 100,
        },
        {
          id: '1',
          x: 600,
          y: 100,
        },
        {
          id: '2',
          x: 100,
          y: 500,
          type: 'circle',
          style: {
            fill: '#999',
            stroke: 'red',
          },
        },
        {
          id: '3',
          x: 600,
          y: 500,
          type: 'rect',
          style: {
            fill: 'yellow',
            stroke: 'red',
          },
        },
      ],
      edges: [
        {
          id: 'edge0',
          source: '0',
          target: '1',
          label: '标签',
          style: {
            endArrow: {
              path: G6.Arrow.vee(),
            },
          },
        },
        {
          id: 'edge1',
          source: '2',
          target: '3',
          label: '50ms',
          style: {
            endArrow: {
              path: G6.Arrow.triangle(),
            },
          },
        },
        {
          id: 'edge2',
          source: '3',
          target: '2',
          label: '',
          style: {
            endArrow: {
              path: G6.Arrow.triangle(),
            },
          },
        },
      ],
    }
  },
  mounted() {
    this.initG6()
  },
  methods: {
    initG6() {
      // 实例化 Grid 插件
      const grid = new G6.Grid()
    //   const minimap = new G6.Minimap()

      // 获取容器的宽和高
      const container = document.getElementById('container')
      const width = container.scrollWidth
      const height = container.scrollHeight || 500
      this.edges.forEach((edge) => {
        edge.style.stroke = '#555'
        edge.style.endArrow.fill = '#777'
      })

      // 实例化对象
      const graph = new G6.Graph({
        container: 'container',
        width: width,
        height: height,
        // translate the graph to align the canvas's center, support by v3.5.1
        fitCenter: true,
        defaultNode: {
          size: 15,
          style: {
            fill: '#DEE9FF',
            stroke: '#5B8FF9',
          },
        },
        modes: {
          // behaviors
          default: ['drag-node', 'zoom-canvas'],
        },
        plugins: [grid],
      })

      graph.data({ nodes: this.nodes, edges: this.edges })
      graph.render()

      if (typeof window !== 'undefined')
        window.onresize = () => {
          if (!graph || graph.get('destroyed')) return
          if (!container || !container.scrollWidth || !container.scrollHeight)
            return
          graph.changeSize(container.scrollWidth, container.scrollHeight)
        }
    },
  },
}
</script>

<style lang="less" scoped>
.main {
  height: 100%;
  width: 100%;
}
</style>
