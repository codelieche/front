const navData = [
    {
        icon: "user-circle",
        key: "/user",
        title: "用户中心",
        level: 1,
        children: [
          {
            slug: "/user/group",
            icon: "group",
            title: "分组",
            level: 2,
          },
          {
            slug: "/user/list",
            icon: "user-o",
            title: "用户列表",
            level: 2,
          },
          {
            slug: "/user/center",
            icon: "user-circle-o",
            title: "用户中心",
            level: 2,
          },
          {
            slug: "/user/message",
            icon: "envelope-o",
            title: "消息中心",
            level: 2,
          },
          {
            slug: "/user/login",
            icon: "sign-in",
            title: "登陆",
            level: 2,
          },
          {
            slug: "/user/logout",
            icon: "sign-out",
            title: "退出",
            level: 2
          }
        ]
      },
      {
        icon: "cog",
        key: "/test",
        title: "测试页面",
        level: 1,
        children: [
          {
            slug: "/test/test",
            key: "/test/test",
            icon: "angle-right",
            title: "test",
            level: 2
          },
          {
            slug: "/test/page",
            key: "/test/page",
            icon: "angle-right",
            title: "Page",
            level: 2
          },
          {
            slug: "/test/full",
            key: "/test/full",
            icon: "angle-right",
            title: "Full",
            level: 2
          }
        ]
      },
      {
        icon: "link",
        key: "/user-menu",
        title: "用户菜单",
        slug: "/user/menu",
        level: 1,
      },
      {
        icon: "link",
        key: "/link",
        title: "友情链接",
        level: 1,
        children: [
          {
            slug: "http://codelieche.com",
            icon: "angle-right",
            title: "编程列车",
            is_link: true,
            link: "http://www.codelieche.com",
            level: 2
          },
          {
            slug: "http://codelieche.com",
            icon: "angle-right",
            title: "codelieche",
            is_link: true,
            target: "_blank",
            link: "http://codelieche.com",
            level: 2
          }
        ]
      },
      {
        icon: "link",
        key: "/kanban-codelieche",
        title: "看板",
        slug: "http://kanban.codelieche.com",
        is_link: true,
        target: "_blank",
        link: "http://kanban.codelieche.com",
        level: 1,
      },
];

export default navData;