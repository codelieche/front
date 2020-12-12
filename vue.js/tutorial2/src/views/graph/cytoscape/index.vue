<template>
  <router-view></router-view>
</template>

<script>
import Cytoscape from 'cytoscape'
import canvas from 'cytoscape-canvas'
import cytoscapeCola from 'cytoscape-cola' // 推荐
import dagre from 'cytoscape-dagre' // 推荐
// import cise from 'cytoscape-cise'
import nodeHtmlLabel from 'cy-node-html-label'

Cytoscape.use(canvas)
Cytoscape.use(cytoscapeCola)
Cytoscape.use(dagre)
// Cytoscape.use(cise)
nodeHtmlLabel(Cytoscape)

export default {
  name: 'CytoscapeIndex',
}
</script>