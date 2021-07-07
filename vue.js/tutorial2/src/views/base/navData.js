const navData = [
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

  {
    icon: 'el-icon-s-promotion',
    key: '/base/table/',
    // slug: '/base/table/',
    title: 'Table',
    level: 1,
    children: [
      { slug: 'table/001', title: '示例001' },
      { slug: 'table/002', title: '示例002' },
      { slug: 'table/003', title: '示例003' },
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

  // 内容布局
  {
    icon: 'el-icon-s-promotion',
    key: '/base/content/',
    // slug: '/base/content/',
    title: 'Content',
    level: 1,
    children: [
      { slug: 'content/001', title: '示例001' },
      { slug: 'content/002', title: '示例002' },
      { slug: 'content/003', title: '示例003' },
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

  // 表单示例
  {
    icon: 'el-icon-s-promotion',
    key: '/base/form/',
    // slug: '/base/input/',
    title: 'Form',
    level: 1,
    children: [
      { slug: 'form/001', title: '示例001' },
      { slug: 'form/002', title: '示例002' },
      { slug: 'form/003', title: '示例003' },
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
