<template>
  <div id="cy" class="full"></div>
</template>
<script>
import cytoscape from 'cytoscape'
export default {
  name: 'CytoscapeDemoCustomColor',
  data() {
    return {
      elements: [
        { data: { id: 'a', color: 'red', label: 'color: 文字颜色' } },
        { data: { id: 'b', label: 'backgroud-color: 填充颜色', backgroundColor: 'red' } },
        { data: { id: 'c', label: 'border-color: 边框颜色', borderColor: 'red' } },
        { data: { id: 'd', label: 'background-image: 背景图片', backgroundImage: '/img/logo.82b9c7a5.png' } },
      ],
    }
  },
  mounted() {
    this.buildGraph()
  },
  methods: {
    buildGraph() {
      if (this.cy) {
        this.cy.destroy()
      }
      var style = [
        {
          selector: 'node',
          css: {
            'text-valign': 'bottom',
            'text-halign': 'center',
            shape: 'ellipse', // 默认的形状是ellipse, round-rectangle
            width: '35px',
            height: '35px',
            // color: 'data(color)',
            color: function(ele){
                if(ele.data().color){
                    return ele.data().color
                }else{
                    return '#666'
                }
            },
            'background-color': function(ele){
                if(ele.data().backgroundColor){
                    return ele.data().backgroundColor
                }else{
                    return '#999'
                }
            },
            'background-image': function(ele){
                if(ele.data().backgroundImage){
                    return ele.data().backgroundImage
                }else{
                    return 'none'
                }
            },
            'border-width': '2px',
            'border-color': function(ele){
                if(ele.data().borderColor){
                    return ele.data().borderColor
                }else{
                    return '#999'
                }
            },
            label: 'data(label)',
            'font-size': 10,
          },
        },
      ]
      var cy = (window.cy = cytoscape({
        container: document.getElementById('cy'),
        boxSelectionEnabled: false,
        elements: this.elements,
        style,
        layout: {
          name: 'grid',
          columns: 4,
        },
        maxZoom: 2,
      }))

      this.cy = cy
    },
  },
}
</script>