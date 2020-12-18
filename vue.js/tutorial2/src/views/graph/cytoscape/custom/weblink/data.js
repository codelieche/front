var elements = {
  nodes: [
    {
      data: {
        id: 'client-01',
        nodeType: 'chrome',
        label: 'chrome'
      },
      classes: 'chrome'
    },
    {
      data: {
        id: 'client-02',
        nodeType: 'firefox'
      },
      classes: 'firefox'
    },
    {
      data: {
        id: 'client-03',
        nodeType: 'android'
      },
      classes: 'android'
    },
    {
      data: {
        id: 'lvs',
        nodeType: 'lvs',
        isGroup: true,
        label: 'Load Balance'
      },
      classes: 'lvs'
    },
    {
      data: {
        id: 'ubuntu-0',
        nodeType: 'linux',
        parent: 'lvs'
      },
      classes: 'ubuntu'
    },
    {
      data: {
        id: 'ubuntu-1',
        nodeType: 'ubuntu',
        parent: 'lvs'
      },
      classes: 'ubuntu'
    },
    {
      data: {
        id: 'ubuntu-2',
        nodeType: 'ubuntu',
        parent: 'lvs'
      },
      classes: 'ubuntu'
    },
    {
      data: {
        id: 'ubuntu-3',
        nodeType: 'ubuntu',
        parent: 'lvs'
      },
      classes: 'ubuntu'
    },

    {
      data: {
        id: 'python-web',
        nodeType: 'python-web',
        isGroup: true
      }
    },
    {
      data: {
        id: 'django-1',
        nodeType: 'django',
        parent: 'python-web'
      },
      classes: 'django'
    },
    {
      data: {
        id: 'spring-boot-1',
        nodeType: 'spring-boot'
      },
      classes: 'spring-boot'
    },
    {
      data: {
        id: 'flask-1',
        nodeType: 'flask',
        parent: 'python-web'
      },
      classes: 'django'
    },
    // {
    //   data: {
    //     id: 'postgresql',
    //     nodeType: 'postgresql',
    //     isGroup: true
    //   },
    //   classes: 'postgresql'
    // },
    {
      data: {
        id: 'postgresql-1',
        nodeType: 'postgresql',
        // parent: 'postgresql'
        label: 'Master'
      },
      classes: 'postgresql'
    },
    {
      data: {
        id: 'postgresql-2',
        nodeType: 'postgresql',
        // parent: 'postgresql'
        label: 'Slave'
      },
      classes: 'postgresql'
    },

    {
      data: {
        id: 'prometheus',
        nodeType: 'prometheus'
      },
      classes: 'prometheus'
    },
    {
      data: {
        id: 'prometheus',
        nodeType: 'prometheus'
      },
      classes: 'prometheus'
    },
    {
      data: {
        id: 'grafana',
        nodeType: 'grafana'
      },
      classes: 'grafana'
    },

    // CI&CD
    {
      data: {
        id: 'desktop-1',
        nodeType: 'desktop'
      },
      classes: 'desktop'
    },
    {
      data: {
        id: 'desktop-2',
        nodeType: 'desktop'
      },
      classes: 'desktop'
    },
    {
      data: {
        id: 'github',
        nodeType: 'github'
      },
      classes: 'github'
    },
    {
      data: {
        id: 'jenkins',
        nodeType: 'jenkins'
      },
      classes: 'jenkins'
    },
    {
      data: {
        id: 'harbor',
        nodeType: 'harbor'
      },
      classes: 'harbor'
    }

    // kubernets
    // {
    //   data: {
    //     id: 'kubernetes',
    //     nodeType: 'kubernetes',
    //     isGroup: true
    //   },
    //   classes: 'kubernetes'
    // },
    // {
    //   data: {
    //     id: 'node-01',
    //     nodeType: 'kubernetes',
    //     parent: 'kubernetes'
    //   },
    //   classes: 'kubernetes'
    // },
    // {
    //   data: {
    //     id: 'node-02',
    //     nodeType: 'kubernetes',
    //     parent: 'kubernetes'
    //   },
    //   classes: 'kubernetes'
    // },
    // {
    //   data: {
    //     id: 'node-03',
    //     nodeType: 'kubernetes',
    //     parent: 'kubernetes'
    //   },
    //   classes: 'kubernetes'
    // },
    // {
    //   data: {
    //     id: 'k8s-prometheus',
    //     nodeType: 'prometheus',
    //     parent: 'kubernetes'
    //   },
    //   classes: 'prometheus'
    // },
    // {
    //   data: {
    //     id: 'k8s-grafana',
    //     nodeType: 'grafana',
    //     parent: 'kubernetes'
    //   },
    //   classes: 'grafana'
    // }
  ],
  edges: [
    {
      data: {
        source: 'client-01',
        target: 'ubuntu-0',
        // curveStyle: 'unbundled-bezier'
      }
    },
    {
      data: {
        source: 'client-03',
        target: 'ubuntu-0',
        // curveStyle: 'unbundled-bezier'
      }
    },
    {
      data: {
        source: 'ubuntu-0',
        target: 'ubuntu-1'
      }
    },
    {
      data: {
        source: 'ubuntu-0',
        target: 'ubuntu-2'
      }
    },
    {
      data: {
        source: 'ubuntu-0',
        target: 'ubuntu-3'
      }
    },
    {
      data: {
        source: 'ubuntu-1',
        target: 'django-1'
      }
    },
    {
      data: {
        source: 'ubuntu-2',
        target: 'flask-1'
      }
    },
    {
      data: {
        source: 'ubuntu-3',
        target: 'spring-boot-1'
      }
    },
    {
      data: {
        source: 'django-1',
        target: 'postgresql-1',
        curveStyle: 'haystack'
      }
    },
    {
      data: {
        source: 'flask-1',
        target: 'postgresql-1',
        curveStyle: 'haystack'
      }
    },
    {
      data: {
        source: 'spring-boot-1',
        target: 'postgresql-2',
        curveStyle: 'taxi'
      }
    },

    {
      data: {
        source: 'postgresql-2',
        target: 'postgresql-1'
      }
    },
    {
      data: {
        source: 'grafana',
        target: 'prometheus'
      }
    },
    {
      data: {
        source: 'client-02',
        target: 'grafana'
      }
    },
    // CI&CD
    {
      data: {
        source: 'desktop-1',
        target: 'github'
      }
    },
    {
      data: {
        source: 'desktop-2',
        target: 'github'
      }
    },
    {
      data: {
        source: 'github',
        target: 'jenkins',
        curveStyle: 'taxi'
      }
    },

    {
      data: {
        source: 'jenkins',
        target: 'harbor',
        curveStyle: 'taxi'
      }
    }

    // kubernetes
    // {
    //   data: {
    //     source: 'k8s-prometheus',
    //     target: 'node-01',
    //     curveStyle: 'unbundled-bezier'
    //   }
    // },
    // {
    //   data: {
    //     source: 'k8s-prometheus',
    //     target: 'node-02',
    //     curveStyle: 'unbundled-bezier'
    //   }
    // },
    // {
    //   data: {
    //     source: 'k8s-prometheus',
    //     target: 'node-03',
    //     curveStyle: 'unbundled-bezier'
    //   }
    // },
    // {
    //   data: {
    //     source: 'k8s-grafana',
    //     target: 'k8s-prometheus',
    //     // curveStyle: 'taxi'
    //   }
    // },
  ]
}

for (var i = 0; i < elements.edges.length; i++) {
  var item = elements.edges[i]
  item.data['id'] = item.data.source + '--' + item.data.target
  elements.edges[i] = item
}

export default elements
