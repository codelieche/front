<template>
  <router-view></router-view>
</template>

<script>
import cytoscape from 'cytoscape'
import canvas from 'cytoscape-canvas'
import cytoscapeCola from 'cytoscape-cola' // 推荐
import dagre from 'cytoscape-dagre' // 推荐
// import cise from 'cytoscape-cise'
import nodeHtmlLabel from 'cy-node-html-label'

cytoscape.use(cytoscapeCola)
cytoscape.use(canvas)
cytoscape.use(dagre)
// cytoscape.use(cise)
nodeHtmlLabel(cytoscape)

export default {
  name: 'CytoscapeIndex',
}
</script>