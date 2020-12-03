const navData = [
  {
    icon: 'el-icon-s-custom',
    key: '/chart/antv/g6',
    slug: '/chart/antv/g6',
    title: 'antv-g6',
    level: 1,
    children: [
      {
        slug: '001',
        title: '示例001'
      },
      {
        slug: '002',
        title: '示例002'
      },
      {
        slug: '003',
        title: '示例003'
      },
      {
        slug: "customNode/001",
        title: "自定义Node 001"
      }
      
    ].map(item => {
      return {
        icon: 'el-icon-arrow-right',
        key: `/chart/antv/g6/${item.slug}`,
        slug: `/chart/antv/g6/${item.slug}`,
        title: item.title,
        level: 2
      }
    })
  },

  // 自定义示例
  // {
  //   slug: '/chart/antv/g6/customNode/',
  //   title: "自定义Node",
  //   children: [
  //     {
  //       slug: '001',
  //       title: '示例001'
  //     },
  //     {
  //       slug: '002',
  //       title: '示例002'
  //     },
  //     {
  //       slug: '003',
  //       title: '示例003'
  //     },
  //   ].map(item => {
  //     return {
  //       icon: 'el-icon-arrow-right',
  //       key: `/chart/antv/g6/customNode/${item.slug}`,
  //       slug: `/chart/antv/g6/customNode/${item.slug}`,
  //       title: item.title,
  //       level: 2
  //     }
  //   })
  // }
]

export default navData
