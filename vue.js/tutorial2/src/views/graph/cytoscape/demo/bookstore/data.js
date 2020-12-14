var data = {
  nodes: [
    {
      data: {
        id: 'ddddd8edb0b617ae',
        nodeType: 'app',
        namespace: 'default',
        app: 'details',
        isGroup: 'app'
      }
    },
    {
      data: {
        id: '1123fffffdfc4e4f505',
        nodeType: 'app',
        namespace: 'default',
        app: 'productpage',
        isGroup: 'app'
      }
    },
    {
      data: {
        id: 'ddxegxgbe3aaf24d8f589feb4b',
        nodeType: 'app',
        namespace: 'default',
        app: 'ratings',
        isGroup: 'app'
      }
    },
    {
      data: {
        id: '12345789519157fb76c41e',
        nodeType: 'app',
        namespace: 'default',
        app: 'reviews',
        isGroup: 'app'
      }
    },
    {
      data: {
        id: '16d04f68ffff0707c2a576d1fc2',
        parent: 'ddddd8edb0b617ae',
        nodeType: 'service',
        namespace: 'default',
        app: 'details',
        service: 'details',
        destServices: [
          {
            namespace: 'default',
            name: 'details'
          }
        ],
        traffic: [
          {
            protocol: 'http',
            rates: {
              httpIn: '0.16',
              httpOut: '0.16'
            }
          }
        ]
      }
    },
    {
      data: {
        id: '721ef0b8cfddddd3213a5d659ae9da',
        parent: 'ddddd8edb0b617ae',
        nodeType: 'app',
        namespace: 'default',
        workload: 'details-v1',
        app: 'details',
        version: 'v1',
        destServices: [
          {
            namespace: 'default',
            name: 'details'
          }
        ],
        traffic: [
          {
            protocol: 'http',
            rates: {
              httpIn: '0.16'
            }
          }
        ]
      }
    },
    {
      data: {
        id: '12345fd356d009efe2a323e12361',
        parent: '1123fffffdfc4e4f505',
        nodeType: 'service',
        namespace: 'default',
        app: 'productpage',
        service: 'productpage',
        destServices: [
          {
            namespace: 'default',
            name: 'productpage'
          }
        ],
        traffic: [
          {
            protocol: 'http',
            rates: {
              httpIn: '0.16',
              httpOut: '0.16'
            }
          }
        ],
        hasVS: true
      }
    },
    {
      data: {
        id: '0123488a37fc905db4f16ae6',
        parent: '1123fffffdfc4e4f505',
        nodeType: 'app',
        namespace: 'default',
        workload: 'productpage-v1',
        app: 'productpage',
        version: 'v1',
        destServices: [
          {
            namespace: 'default',
            name: 'productpage'
          }
        ],
        traffic: [
          {
            protocol: 'http',
            rates: {
              httpIn: '0.16',
              httpOut: '0.31'
            }
          }
        ]
      }
    },
    {
      data: {
        id: '906196769ac4714aae43f4f789a36d9c',
        parent: 'ddxegxgbe3aaf24d8f589feb4b',
        nodeType: 'service',
        namespace: 'default',
        app: 'ratings',
        service: 'ratings',
        destServices: [
          {
            namespace: 'default',
            name: 'ratings'
          }
        ],
        traffic: [
          {
            protocol: 'http',
            rates: {
              httpIn: '0.09',
              httpOut: '0.09'
            }
          }
        ]
      }
    },
    {
      data: {
        id: '4b64bda48e5a3c7e50ab1c63836c9469',
        parent: 'ddxegxgbe3aaf24d8f589feb4b',
        nodeType: 'app',
        namespace: 'default',
        workload: 'ratings-v1',
        app: 'ratings',
        version: 'v1',
        destServices: [
          {
            namespace: 'default',
            name: 'ratings'
          }
        ],
        traffic: [
          {
            protocol: 'http',
            rates: {
              httpIn: '0.09'
            }
          }
        ]
      }
    },
    {
      data: {
        id: '12356773805fedd6beb0597ef',
        parent: '12345789519157fb76c41e',
        nodeType: 'service',
        namespace: 'default',
        app: 'reviews',
        service: 'reviews',
        destServices: [
          {
            namespace: 'default',
            name: 'reviews'
          }
        ],
        traffic: [
          {
            protocol: 'http',
            rates: {
              httpIn: '0.15',
              httpOut: '0.15'
            }
          }
        ]
      }
    },
    {
      data: {
        id: 'aaace6eb1c12512345a803cdb24',
        parent: '12345789519157fb76c41e',
        nodeType: 'app',
        namespace: 'default',
        workload: 'reviews-v1',
        app: 'reviews',
        version: 'v1',
        destServices: [
          {
            namespace: 'default',
            name: 'reviews'
          }
        ],
        traffic: [
          {
            protocol: 'http',
            rates: {
              httpIn: '0.07'
            }
          }
        ]
      }
    },
    {
      data: {
        id: '12350edxxadb63f22fbd8255',
        parent: '12345789519157fb76c41e',
        nodeType: 'app',
        namespace: 'default',
        workload: 'reviews-v2',
        app: 'reviews',
        version: 'v2',
        destServices: [
          {
            namespace: 'default',
            name: 'reviews'
          }
        ],
        traffic: [
          {
            protocol: 'http',
            rates: {
              httpIn: '0.04',
              httpOut: '0.04'
            }
          }
        ]
      }
    },
    {
      data: {
        id: '90f71758090205861365975935d',
        parent: '12345789519157fb76c41e',
        nodeType: 'app',
        namespace: 'default',
        workload: 'reviews-v3',
        app: 'reviews',
        version: 'v3',
        destServices: [
          {
            namespace: 'default',
            name: 'reviews'
          }
        ],
        traffic: [
          {
            protocol: 'http',
            rates: {
              httpIn: '0.04',
              httpOut: '0.04'
            }
          }
        ]
      }
    },
    {
      data: {
        id: 'id-gateway',
        nodeType: 'gateway',
        namespace: 'gateway',
        workload: 'gateway',
        app: 'gateway',
        version: 'latest',
        traffic: [
          {
            protocol: 'http',
            rates: {
              httpOut: '0.16'
            }
          }
        ],
        isInaccessible: true,
        isRoot: true
      }
    }
  ],
  edges: [
    {
      data: {
        id: '531fdd02d44612b9a7a9f393dcbf6940',
        source: '0123488a37fc905db4f16ae6',
        target: '16d04f68ffff0707c2a576d1fc2',
        traffic: {
          protocol: 'http',
          rates: {
            http: '0.16',
            httpPercentReq: '50.2'
          },
          responses: {
            '200': {
              flags: {
                '-': '100.0'
              },
              hosts: {
                'details.default.svc.cluster.local': '100.0'
              }
            }
          }
        }
      }
    },
    {
      data: {
        id: '49e7da37f0733e10454cdc64887377dc',
        source: '0123488a37fc905db4f16ae6',
        target: '12356773805fedd6beb0597ef',
        traffic: {
          protocol: 'http',
          rates: {
            http: '0.15',
            httpPercentReq: '49.8'
          },
          responses: {
            '200': {
              flags: {
                '-': '100.0'
              },
              hosts: {
                'reviews.default.svc.cluster.local': '100.0'
              }
            }
          }
        }
      }
    },
    {
      data: {
        id: 'f774bb2441e6cc6e34630c04c150ca35',
        source: '16d04f68ffff0707c2a576d1fc2',
        target: '721ef0b8cfddddd3213a5d659ae9da',
        traffic: {
          protocol: 'http',
          rates: {
            http: '0.16',
            httpPercentReq: '100.0'
          },
          responses: {
            '200': {
              flags: {
                '-': '100.0'
              },
              hosts: {
                'details.default.svc.cluster.local': '100.0'
              }
            }
          }
        },
        responseTime: '5'
      }
    },
    {
      data: {
        id: '085e267222568260e02b64d1d47b48fb',
        source: '12350edxxadb63f22fbd8255',
        target: '906196769ac4714aae43f4f789a36d9c',
        traffic: {
          protocol: 'http',
          rates: {
            http: '0.04',
            httpPercentReq: '100.0'
          },
          responses: {
            '200': {
              flags: {
                '-': '100.0'
              },
              hosts: {
                'ratings.default.svc.cluster.local': '100.0'
              }
            }
          }
        }
      }
    },
    {
      data: {
        id: 'daad981dc4fa558b8e7dfb4d5b882d22',
        source: '90f71758090205861365975935d',
        target: '906196769ac4714aae43f4f789a36d9c',
        traffic: {
          protocol: 'http',
          rates: {
            http: '0.04',
            httpPercentReq: '100.0'
          },
          responses: {
            '200': {
              flags: {
                '-': '100.0'
              },
              hosts: {
                'ratings.default.svc.cluster.local': '100.0'
              }
            }
          }
        }
      }
    },
    {
      data: {
        id: 'a1dfe2e1b0907e1cb16670f1abe2e41e',
        source: '906196769ac4714aae43f4f789a36d9c',
        target: '4b64bda48e5a3c7e50ab1c63836c9469',
        traffic: {
          protocol: 'http',
          rates: {
            http: '0.09',
            httpPercentReq: '100.0'
          },
          responses: {
            '200': {
              flags: {
                '-': '100.0'
              },
              hosts: {
                'ratings.default.svc.cluster.local': '100.0'
              }
            }
          }
        },
        responseTime: '5'
      }
    },
    {
      data: {
        id: '603b3196d57ed4275cde825c9b550cf8',
        source: '12356773805fedd6beb0597ef',
        target: '12350edxxadb63f22fbd8255',
        traffic: {
          protocol: 'http',
          rates: {
            http: '0.04',
            httpPercentReq: '28.4'
          },
          responses: {
            '200': {
              flags: {
                '-': '100.0'
              },
              hosts: {
                'reviews.default.svc.cluster.local': '100.0'
              }
            }
          }
        },
        responseTime: '24'
      }
    },
    {
      data: {
        id: '66bfd9391cae909e3b9968afb7a7a910',
        source: '12356773805fedd6beb0597ef',
        target: '90f71758090205861365975935d',
        traffic: {
          protocol: 'http',
          rates: {
            http: '0.04',
            httpPercentReq: '28.4'
          },
          responses: {
            '200': {
              flags: {
                '-': '100.0'
              },
              hosts: {
                'reviews.default.svc.cluster.local': '100.0'
              }
            }
          }
        },
        responseTime: '24'
      }
    },
    {
      data: {
        id: '5bfd2136556bf57f55046dee357f11ba',
        source: '12356773805fedd6beb0597ef',
        target: 'aaace6eb1c12512345a803cdb24',
        traffic: {
          protocol: 'http',
          rates: {
            http: '0.07',
            httpPercentReq: '43.2'
          },
          responses: {
            '200': {
              flags: {
                '-': '100.0'
              },
              hosts: {
                'reviews.default.svc.cluster.local': '100.0'
              }
            }
          }
        },
        responseTime: '9'
      }
    },
    {
      data: {
        id: '5491be298ededd6efe4e4152e122d994',
        source: 'id-gateway',
        target: '12345fd356d009efe2a323e12361',
        traffic: {
          protocol: 'http',
          rates: {
            http: '0.16',
            httpPercentReq: '100.0'
          },
          responses: {
            '200': {
              flags: {
                '-': '100.0'
              },
              hosts: {
                'productpage.default.svc.cluster.local': '100.0'
              }
            }
          }
        }
      }
    },
    {
      data: {
        id: '86725a525e9ddca333f585f328c423e9',
        source: '12345fd356d009efe2a323e12361',
        target: '0123488a37fc905db4f16ae6',
        traffic: {
          protocol: 'http',
          rates: {
            http: '0.16',
            httpPercentReq: '100.0'
          },
          responses: {
            '200': {
              flags: {
                '-': '100.0'
              },
              hosts: {
                'productpage.default.svc.cluster.local': '100.0'
              }
            }
          }
        },
        responseTime: '41'
      }
    }
  ]
}
export default data
