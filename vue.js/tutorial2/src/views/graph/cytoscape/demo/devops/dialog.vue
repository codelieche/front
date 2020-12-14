<template>
  <div id="cy-dialog"></div>
</template>

<script>
import Cytoscape from 'cytoscape'
import graphStyles from './style.js'

export default {
  name: 'DialogGraph',
  props: {
    display: Boolean,
    elements: Array,
    getElementNeighbordByID: Function,
  },
  mounted() {
    if (this.display && this.elements.length > 0) {
      this.buildGraph()
    }
  },
  beforeUpdate() {},
  beforeDestroy() {
    this.destroyGraph()
  },
  methods: {
    buildGraph() {
      this.destroyGraph()
      //   布局名字
      var layoutName = this.elements.length > 50 ? 'cola' : 'dagre'
      var cy = (window.cyDialog = Cytoscape({
        container: document.getElementById('cy-dialog'),
        boxSelectionEnabled: false,
        style: graphStyles,
        elements: this.elements,
        layout: {
          //   name: 'dagre',
          //   name: 'circle',
          name: layoutName,
          fit: true,
          rankDir: 'LR'
        },
        minZoom: 0.5,
        maxZoom: 2.5,
      }))
      this.cy = cy
      var that = this
      cy.on('click', 'node', (evt) => {
        var ele = evt.target
        var id = ele.id()
        that.getElementNeighbordByID(id)
      })
      //   console.log(this.elements)
    },
    destroyGraph() {
      if (this.cy) {
        this.cy.destroy()
      }
    },
  },
  watch: {
    elements() {
      if (this.elements.length > 0) {
        this.buildGraph()
      }
    },
  },
}
</script>


<style lang="less" scoped>
#cy-dialog {
  //   background-color: #fff;
  background: transparent;
  height: 60vh;
  z-index: 100;
  min-height: 50vh;
  min-width: 400px;
}
</style>
