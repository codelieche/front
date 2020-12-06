var routes = [
    {
        path: "",
        name: "GraphHome",
        component: () => import("./home.vue")
    },
    // {
    //     path: "001",
    //     name: "Slot001Page",
    //     component: () => import("./001.vue")
    // },
]

var subComponents = ['base/001', 'base/002', 'base/003', 'base/004', 'base/005']

subComponents.forEach(item => {
    routes.push({
        path: item,
        component: () => import(`./${item}.vue`)
    })
})

export default routes