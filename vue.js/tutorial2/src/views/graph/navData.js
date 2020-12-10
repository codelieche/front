const navData = [
  {
    icon: 'el-icon-s-custom',
    key: '/graph/cytoscape/',
    // slug: '/graph/cytoscape/',
    title: '基本使用',
    level: 1,
    children: [
      {
        slug: 'base/001',
        title: '示例001'
      },
      {
        slug: 'base/002',
        title: '示例002'
      },
      {
        slug: 'base/003',
        title: '示例003'
      },
      {
        slug: 'base/004',
        title: '箭头类型'
      },
      {
        slug: 'base/005',
        title: '添加classes'
      },
      {
        slug: 'base/006',
        title: '形状shape'
      },
      {
        slug: 'base/curve-style',
        title: '线条类型'
      }
    ].map(item => {
      return {
        icon: 'el-icon-arrow-right',
        key: `/graph/cytoscape/${item.slug}`,
        slug: `/graph/cytoscape/${item.slug}`,
        title: item.title,
        level: 2
      }
    })
  }
]

export default navData
