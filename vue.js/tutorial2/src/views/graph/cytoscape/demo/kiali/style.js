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
      // 'border-style': 'dotted',
      // 'border-style': ele => {
      //   return ele.data().isUnused ? 'dotted' : 'solid'
      // },
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
      // 'background-color': ele => {
      //   var data = ele.data()
      //   switch (data.nodeType) {
      //     case 'app':
      //       if (data.isGroup) {
      //         return '#f9f9f9'
      //       } else {
      //         return '#76a5fc'
      //       }
      //     default:
      //       return '#76a5fc'
      //   }
      // },
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
              if (data.workload && !data.parent) {
                return data.workload
              }
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
    selector: 'node.idle',
    style: {
      'background-color': '#9d9d9d'
    }
  },
  {
    selector: 'node.highlight,node.success',
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
      // 'color': 'red'
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
  // node出现警告时
  {
    selector: 'node.warn',
    css: {
      'border-width': 2,
      'border-color': '#f47f49',
      'background-color': '#f47f49',
      'text-outline-color': '#fff',
      color: '#f47f49',
      'text-outline-width': '0.5px'
    }
  },
  // 出错时候的node
  {
    selector: 'node.error',
    css: {
      'border-width': 2,
      'border-color': '#fc2a2a',
      'background-color': '#fc2a2a',
      'text-outline-color': '#fff',
      color: '#fc2a2a',
      'text-outline-width': '0.5px'
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
      // label: '5ms',
      color: '#999',
      'font-size': 10,
      label: ele => {
        var data = ele.data()
        if (data.responseTime) {
          return data.responseTime + 'ms'
        } else {
          return ''
        }
      }
    }
  },
  {
    selector: 'edge.highlight,edge.success',
    style: {
      'line-color': '#3aa5dc',
      'target-arrow-color': '#3aa5dc',
      opacity: 0.8,
      width: '1.5px',
      'font-size': 10,
      'line-style': 'solid',
      'target-arrow-shape': 'vee',
      color: '#3aa5dc',
      'text-outline-color': '#fff',
      'text-outline-width': '0.5px'
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
  // Edge出现警告时
  {
    selector: 'edge.warn',
    css: {
      width: '2px',
      'font-size': 12,
      color: '#f47f49',
      'line-color': '#f47f49',
      'target-arrow-color': '#f47f49',
      'text-outline-color': '#fff',
      'text-outline-width': '0.5px'
    }
  },
  // Edge出现错误时
  {
    selector: 'edge.error',
    css: {
      width: '2px',
      color: '#fc2a2a',
      'font-size': 12,
      'line-color': '#fc2a2a',
      'target-arrow-color': '#fc2a2a',
      'text-outline-color': '#fff',
      'text-outline-width': '0.5px'
    }
  }
]

export default styles
