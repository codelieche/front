var styles = [
  {
    selector: 'node',
    css: {
      content: 'data(id)',
      'text-valign': 'bottom',
      'text-halign': 'center',
      shape: 'round-rectangle', // 默认的形状是ellipse
      width: '35px',
      height: '35px',
      'font-size': 12
    }
  },
  {
    selector: 'node.highlight',
    style: {
      'border-color': '#3aa5dc',
      'border-width': '3px',
      'background-color': '#3aa5dc',
      opacity: 0.8,
      width: '45px',
      height: '45px',
      'font-size': 14
    }
  },

  {
    selector: ':parent',
    css: {
      'text-valign': 'top',
      'text-halign': 'center'
    }
  },
  {
    selector: 'edge',
    css: {
      // 'curve-style': 'bezier',
      'curve-style': 'unbundled-bezier',
      'target-arrow-shape': 'triangle',
      'line-color': '#999',
      width: '0.5px'
    }
  },
  {
    selector: 'edge.highlight',
    style: {
      'line-color': '#3aa5dc',
      'target-arrow-color': '#3aa5dc',
      opacity: 0.8,
      width: '2px',
      'line-style': 'solid',
      'target-arrow-shape': 'vee',
      'text-outline-color': 'red',
      'text-outline-width': '2px'
    }
  },
  {
    selector: 'edge:selected',
    css: {
      width: '3px',
      'font-size': 13
    }
  }
]

export default styles
