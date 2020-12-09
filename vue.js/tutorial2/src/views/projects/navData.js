const navData = [
  {
    icon: 'el-icon-notebook-2',
    key: '/project/todos/',
    // slug: '/graph/cytoscape/',
    title: 'Todos',
    level: 1,
    children: [
      {
        slug: 'list',
        title: '列表'
      },
      {
        slug: 'detail/123',
        title: '详情'
      },
      {
        slug: 'add',
        title: '添加'
      },
      
    ].map(item => {
      return {
        icon: 'el-icon-arrow-right',
        key: `/project/todos/${item.slug}`,
        slug: `/project/todos/${item.slug}`,
        title: item.title,
        level: 2
      }
    })
  },
]

export default navData
