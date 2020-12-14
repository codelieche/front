var styles = [
  {
    selector: 'node',
    css: {
      // content: 'data(id)',
      'text-valign': 'bottom',
      'text-halign': 'center',
      // shape: 'round-rectangle', // 默认的形状是ellipse
      //   shape: 'ellipse', // 默认的形状是ellipse
      shape: ele => {
        // console.log(ele.data())
        var data = ele.data()
        switch (data.nodeType) {
          case 'app':
            return 'round-rectangle'
          case 'service':
            return 'triangle'
          default:
            return 'ellipse'
        }
      },
      width: '35px',
      height: '35px',
      'font-size': 12,
      // 'background-color': '#76a5fc',
      //   'background-color': '#fff',
      'border-width': 0.5,
      'border-color': ele => {
        var data = ele.data()
        switch (data.nodeType) {
          case 'app':
            if (data.isGroup) {
              return '#999'
            } else {
              return '#fff'
            }
          default:
            return '#fff'
        }
      },
      'background-width': '15px',
      'background-height': '15px',
      //   'background-color': '#76a5fc',
      'background-color': '#9d9d9d',
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
        switch (data.nodeType) {
          case 'app':
            if (data.isGroup) {
              return 'none'
            } else {
              return '/img/pod.png'
            }
          default:
            return 'none'
        }
      },
      color: '#555',
      //   label: 'data(label)',
      //   label: 'data(app)',
      label: ele => {
        var data = ele.data()
        switch (data.nodeType) {
          case 'app':
            if (data.version) {
              return data.version
            } else {
              return data.app
            }
          case 'service':
            return data.service
          default:
            if (data.app) {
              return data.app
            } else {
              return ''
            }
        }
      }
    }
  },
  {
    selector: 'node.highlight',
    style: {
      //   'border-color': '#3aa5dc',
      'background-color': '#3572E4',
      //   'border-width': '3px',
      opacity: 1,
      width: '35px',
      height: '35px',
      //   'font-size': 14,
      'background-width': '20px',
      'background-height': '20px'
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
    selector: 'edge',
    css: {
      'curve-style': 'bezier',
      //   'curve-style': 'unbundled-bezier',
      //   'target-arrow-shape': 'triangle',
      'target-arrow-shape': 'vee',
      'line-color': '#999',
      width: '0.5px',
      // label: 'data(label)',
      label: '5ms',
      color: '#999',
      'font-size': 10
    }
  },
  {
    selector: 'edge.highlight',
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
  }
]

export default styles
