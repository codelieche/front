var styles = [
  {
    selector: 'node',
    css: {
      // content: 'data(id)',
      'text-valign': 'bottom',
      'text-halign': 'center',
      shape: 'round-rectangle', // 默认的形状是ellipse
      width: '35px',
      height: '35px',
      'font-size': 10,
      // 'background-color': '#76a5fc',
      'border-width': 0.5,
      'border-color': ele => {
        var data = ele.data()
        if (data.isGroup) {
          return '#999'
        } else {
          return '#fff'
        }
      },
      'background-width': '30px',
      'background-height': '30px',
        // 'background-color': '#76a5fc',
        // 'background-color': '#fff',
      'background-color': '#f9f9f9',
      //   'background-color': ele => {
      //     var data = ele.data()
      //     switch (data.nodeType) {
      //       case 'app':
      //         if (data.isGroup) {
      //           return '#f9f9f9'
      //         } else {
      //           return '#76a5fc'
      //         }
      //       default:
      //         return '#76a5fc'
      //     }
      //   },
      ghost: 'yes',
      'ghost-offset-x': 1,
      'ghost-offset-y': 1,
      'ghost-opacity': 0.4,
      'background-image': ele => {
        var data = ele.data()
        if (data.isGroup) {
          return 'none'
        } else {
          return `/img/logos/${data.nodeType}.png`
        }
      },
      'background-image-opacity': 1,
      color: '#555',
      // label: 'data(nodeType)'
      'text-outline-color': '#fff',
      'text-outline-width': '1px',
      label: ele => {
        var data = ele.data()
        if (data.label) {
         return data.label
        }else{
          return data.nodeType
        }
      }
    }
  },
  // {
  //   selector: 'node.client',
  //   style: {
  //     'background-image': '/img/logs/chrome.png'
  //   }
  // },
  {
    selector: 'node.highlight,node.success',
    style: {
      'background-color': '#3572E4',
      opacity: 1,
      width: '35px',
      height: '35px'
      //   'font-size': 14,
      // 'background-width': '20px',
      // 'background-height': '20px'
    }
  },
  {
    selector: ':parent',
    css: {
      'text-valign': 'bottom',
      'text-halign': 'center'
    }
  },
  //   有子元素的Node节点，特别注意selector的顺序
  {
    selector: 'node:parent',
    style: {
      'text-valign': 'bottom',
      'text-outline-color': '#fff',
      'text-outline-width': '1px',
      'background-color': '#f9f9f9'
    }
  },
  {
    selector: 'node.warn',
    css: {
      'border-width': 2,
      'border-color': '#f47f49',
      'background-color': '#f47f49',
      'text-outline-color': '#f47f49',
      'text-outline-width': '0.5px'
    }
  },
  {
    selector: 'node.error',
    css: {
      'border-width': 2,
      'border-color': '#fc2a2a',
      'background-color': '#fc2a2a',
      'text-outline-color': '#fc2a2a',
      'text-outline-width': '0.5px'
    }
  },
  {
    selector: 'edge',
    css: {
      // 'curve-style': 'bezier',
      'curve-style': (ele)=>{
        var data = ele.data()
        if(data.curveStyle){
          return data.curveStyle
        }else{
          return 'bezier'
        }
      },
      //   'curve-style': 'unbundled-bezier',
      //   'target-arrow-shape': 'triangle',
      'target-arrow-shape': 'vee',
      // 'line-color': '#999',
      'line-color': ele => {
        var data = ele.data()
        switch (data.edgeType) {
          case 'success':
            return 'green'
          case 'warn':
            return '#f47f49'
          case 'error':
            return '#fc2a2a'
          case 'idle':
            return '#999'
          case 'mtls':
            return '#444'
          default:
            return '#999'
        }
      },
      'target-arrow-color': ele => {
        var data = ele.data()
        switch (data.edgeType) {
          case 'success':
            return 'green'
          case 'warn':
            return '#f47f49'
          case 'error':
            return '#fc2a2a'
          case 'idle':
            return '#999'
          case 'mtls':
            return '#444'
          default:
            return '#999'
        }
      },
      width: '0.5px',
      // label: 'data(label)',
      label: '5ms',
      color: '#999',
      'font-size': 10
    }
  },
  {
    selector: 'edge.highlight,edge.success',
    style: {
      'line-color': '#3aa5dc',
      'target-arrow-color': '#3aa5dc',
      opacity: 0.8,
      width: '1.5px',
      'font-size': 12,
      'line-style': 'solid',
      'target-arrow-shape': 'vee',
      color: '#595959',
      'text-outline-color': '#595959',
      'text-outline-width': '0.1px'
    }
  },
  {
    selector: 'edge:selected',
    css: {
      width: '1.5px',
      'font-size': 12,
      'line-color': '#3aa5dc'
    }
  },
  {
    selector: 'edge.warn',
    css: {
      width: '2px',
      'font-size': 12,
      'color': '#f47f49',
      'line-color': '#f47f49',
      'target-arrow-color': '#f47f49',
      'text-outline-color': '#fff',
      'text-outline-width': '0.5px'
    }
  },
  {
    selector: 'edge.error',
    css: {
      width: '2px',
      'color': '#fc2a2a',
      'font-size': 12,
      'line-color': '#fc2a2a',
      'target-arrow-color': '#fc2a2a',
      'text-outline-color': '#fff',
      'text-outline-width': '0.5px'
    }
  }
]

export default styles
