const navData = [
  {
    icon: 'el-icon-s-custom',
    key: '/tutorial/slot',
    slug: '/tutorial/slot',
    title: '插槽',
    level: 1,
    children: [
      {
        slug: '001',
        title: '插槽001'
      },
      {
        slug: '002',
        title: '插槽002'
      },
      {
        slug: '003',
        title: '插槽003'
      }
    ].map(item => {
      return {
        icon: 'el-icon-arrow-right',
        key: `/tutorial/slot/${item.slug}`,
        slug: `/tutorial/slot/${item.slug}`,
        title: item.title,
        level: 2
      }
    })
  }
]

export default navData
