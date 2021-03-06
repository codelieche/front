const navData = [
  {
    icon: 'el-icon-edit-outline',
    key: '/base/input/',
    // slug: '/base/input/',
    title: 'Input',
    level: 1,
    children: [
      { slug: 'input/001', title: '示例001' },
      { slug: 'input/002', title: '示例002' },
    ].map(item => {
      return {
        icon: 'el-icon-arrow-right',
        key: `/base/${item.slug}`,
        slug: `/base/${item.slug}`,
        title: item.title,
        level: 2
      }
    })
  },
  
  {
    icon: 'el-icon-menu',
    key: '/base/',
    // slug: '/base/',
    title: 'checkbox',
    level: 1,
    children: [
      {
        slug: 'checkbox/001',
        title: '示例001'
      },
      {
        slug: 'checkbox/002',
        title: '示例002'
      },
      {
        slug: 'checkbox/003',
        title: '示例003'
      },
    ].map(item => {
      return {
        icon: 'el-icon-arrow-right',
        key: `/base/${item.slug}`,
        slug: `/base/${item.slug}`,
        title: item.title,
        level: 2
      }
    })
  },

  // hooks
  {
    icon: 'el-icon-setting',
    key: '/base/hooks',
    // slug: '/base/',
    title: 'hooks',
    level: 1,
    children: [
      {
        slug: 'hooks/mousePosition',
        title: '鼠标位置'
      },
    ].map(item => {
      return {
        icon: 'el-icon-arrow-right',
        key: `/base/${item.slug}`,
        slug: `/base/${item.slug}`,
        title: item.title,
        level: 2
      }
    })
  },
  
]

export default navData
